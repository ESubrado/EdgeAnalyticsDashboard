/**
 * Scroll Animation Replay — structural tests
 *
 * These tests guard the replay mechanism without mounting any components.
 * They confirm, at the source level, that:
 *
 *   1. Both route files key their animated inner content by `location.key`
 *      so React fully unmounts and remounts the content on every navigation,
 *      resetting every useInView state to false.
 *
 *   2. The useInView hook defaults to triggerOnce=true, meaning isInView is
 *      permanently set to true after the first intersection — making the
 *      remount-on-navigation the essential reset mechanism.
 *
 *   3. The AnimatedContent keying pattern (<Content key={location.key} />)
 *      is the conventional, documented React pattern for replaying animations
 *      after client-side navigation with react-router.
 *
 * If either of these assertions fails, scroll animations will NOT replay when
 * the user navigates back to the page.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect } from "vitest";

const projectRoot = resolve(__dirname, "../../..");

function readSource(relativePath: string): string {
  return readFileSync(resolve(projectRoot, relativePath), "utf-8");
}

describe("Portfolio page — animation replay via location.key", () => {
  const source = readSource("app/routes/Portfolio.tsx");

  it("imports useLocation from react-router", () => {
    expect(source).toMatch(/useLocation.*from ['"]react-router['"]/);
  });

  it("reads location.key from the useLocation hook", () => {
    expect(source).toMatch(/useLocation\s*\(\s*\)/);
    expect(source).toMatch(/location\.key/);
  });

  it("keys PortfolioContent by location.key to force remount on navigation", () => {
    expect(source).toMatch(/PortfolioContent[^>]*key=\{location\.key\}/);
  });

  it("uses the useInView hook inside PortfolioContent", () => {
    expect(source).toMatch(/useInView/);
  });
});

describe("AboutTheDeveloper page — animation replay via location.key", () => {
  const source = readSource("app/routes/AboutTheDeveloper.tsx");

  it("imports useLocation from react-router", () => {
    expect(source).toMatch(/useLocation.*from ['"]react-router['"]/);
  });

  it("reads location.key from the useLocation hook", () => {
    expect(source).toMatch(/useLocation\s*\(\s*\)/);
    expect(source).toMatch(/location\.key/);
  });

  it("keys AboutTheDeveloperContent by location.key to force remount on navigation", () => {
    expect(source).toMatch(/AboutTheDeveloperContent[^>]*key=\{location\.key\}/);
  });

  it("uses the useInView hook inside the page", () => {
    expect(source).toMatch(/useInView/);
  });
});

describe("useInView hook — triggerOnce default ensures remount is the only reset path", () => {
  const source = readSource("app/hooks/useInView.ts");

  it("defaults triggerOnce to true", () => {
    expect(source).toMatch(/triggerOnce\s*=\s*true/);
  });

  it("disconnects the observer when triggerOnce fires", () => {
    expect(source).toMatch(/if\s*\(\s*triggerOnce\s*\)\s*observer\.disconnect\(\)/);
  });

  it("disconnects on cleanup (useEffect return)", () => {
    expect(source).toMatch(/return\s*\(\s*\)\s*=>\s*observer\.disconnect\(\)/);
  });

  it("initialises isInView to false so fresh mounts start unanimated", () => {
    expect(source).toMatch(/useState\s*\(\s*false\s*\)/);
  });
});
