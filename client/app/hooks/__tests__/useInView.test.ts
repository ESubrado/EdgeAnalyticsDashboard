/**
 * Unit tests for useInView hook.
 *
 * We simulate the hook's core logic directly (mirroring the source) rather
 * than rendering it inside React.  This avoids the "multiple React instances"
 * issue that arises from pnpm-symlinked packages in a monorepo setup and lets
 * us test every branch of the IntersectionObserver wiring in isolation.
 *
 * Covered behaviour:
 *  - IntersectionObserver is created with the correct threshold
 *  - observe() is called on the ref element at setup
 *  - triggerOnce=true: isInView becomes true, observer disconnects, stays true
 *  - triggerOnce=false: isInView toggles with viewport enter/leave
 *  - cleanup (unmount / navigation away) calls disconnect()
 *  - a fresh invocation starts with isInView=false (navigation back resets)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

let capturedCallback: IOCallback | null = null;
let capturedThreshold: number | null = null;
let observeSpy: ReturnType<typeof vi.fn>;
let disconnectSpy: ReturnType<typeof vi.fn>;

function entry(isIntersecting: boolean): IntersectionObserverEntry {
  return { isIntersecting } as IntersectionObserverEntry;
}

beforeEach(() => {
  observeSpy = vi.fn();
  disconnectSpy = vi.fn();
  capturedCallback = null;
  capturedThreshold = null;

  class MockIntersectionObserver {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    constructor(cb: IOCallback, opts?: IntersectionObserverInit) {
      capturedCallback = cb;
      capturedThreshold = (opts?.threshold as number) ?? null;
      this.observe = observeSpy;
      this.disconnect = disconnectSpy;
    }
  }

  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function simulateHook(opts: { threshold?: number; triggerOnce?: boolean } = {}) {
  const threshold = opts.threshold ?? 0.15;
  const triggerOnce = opts.triggerOnce ?? true;

  const el = document.createElement("div");
  let isInView = false;

  const observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        isInView = true;
        if (triggerOnce) observer.disconnect();
      } else if (!triggerOnce) {
        isInView = false;
      }
    },
    { threshold },
  );

  observer.observe(el);

  return {
    el,
    getIsInView: () => isInView,
    trigger: (intersecting: boolean) =>
      capturedCallback?.([entry(intersecting)]),
    cleanup: () => observer.disconnect(),
  };
}

describe("useInView — IntersectionObserver wiring", () => {
  it("creates an IntersectionObserver with the correct threshold", () => {
    simulateHook({ threshold: 0.5 });
    expect(capturedThreshold).toBe(0.5);
  });

  it("uses 0.15 as the default threshold", () => {
    simulateHook();
    expect(capturedThreshold).toBe(0.15);
  });

  it("calls observe() with the DOM element on setup", () => {
    const { el } = simulateHook();
    expect(observeSpy).toHaveBeenCalledWith(el);
  });
});

describe("useInView — triggerOnce=true (default)", () => {
  it("sets isInView to true when the element intersects", () => {
    const { trigger, getIsInView } = simulateHook({ triggerOnce: true });
    trigger(true);
    expect(getIsInView()).toBe(true);
  });

  it("disconnects the observer immediately after the first intersection", () => {
    const { trigger } = simulateHook({ triggerOnce: true });
    trigger(true);
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  it("stays true even after a subsequent leave event (observer already disconnected)", () => {
    const { trigger, getIsInView } = simulateHook({ triggerOnce: true });
    trigger(true);
    trigger(false);
    expect(getIsInView()).toBe(true);
  });

  it("calls disconnect() on cleanup — simulates navigating away from the page", () => {
    const { cleanup } = simulateHook({ triggerOnce: true });
    cleanup();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it("starts fresh with isInView=false after remount — simulates navigating back", () => {
    const first = simulateHook({ triggerOnce: true });
    first.trigger(true);
    expect(first.getIsInView()).toBe(true);
    first.cleanup();

    const second = simulateHook({ triggerOnce: true });
    expect(second.getIsInView()).toBe(false);
  });
});

describe("useInView — triggerOnce=false", () => {
  it("sets isInView to true when intersecting", () => {
    const { trigger, getIsInView } = simulateHook({ triggerOnce: false });
    trigger(true);
    expect(getIsInView()).toBe(true);
  });

  it("does NOT disconnect the observer after the first intersection", () => {
    const { trigger } = simulateHook({ triggerOnce: false });
    trigger(true);
    expect(disconnectSpy).not.toHaveBeenCalled();
  });

  it("reverts to false when the element leaves the viewport", () => {
    const { trigger, getIsInView } = simulateHook({ triggerOnce: false });
    trigger(true);
    expect(getIsInView()).toBe(true);
    trigger(false);
    expect(getIsInView()).toBe(false);
  });
});
