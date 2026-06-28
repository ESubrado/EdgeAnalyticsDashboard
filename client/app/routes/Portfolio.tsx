import { Link } from "react-router";
import {
  IoArrowForwardOutline,
  IoBarChartOutline,
  IoCheckmarkCircleOutline,
  IoCodeSlashOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
  IoOpenOutline,
  IoPersonCircleOutline,
  IoSparklesOutline,
} from "react-icons/io5";

const TECH_STACK = [
  "React 19", "TypeScript", "Node.js", "Express.js",
  "MongoDB", "Socket.io", "Redux Toolkit", "Tailwind CSS",
  "Vite", "Mongoose", "REST APIs", "React Router 7",
  "Material UI", "Recharts", "Git / GitHub",
];

const STATS = [
  { value: "MERN", label: "Full-Stack" },
  { value: "Real-Time", label: "Specialization" },
  { value: "TypeScript", label: "Language" },
  { value: "Open", label: "To Opportunities" },
];

const HIGHLIGHTS = [
  "Real-time apps with Socket.io & MongoDB Change Streams",
  "MERN stack — React, Express, Node.js, MongoDB",
  "TypeScript across the full stack",
  "Responsive UI with Tailwind CSS & Material UI",
  "Redux Toolkit for scalable state management",
  "REST API design and integration",
];

const Portfolio = () => (
  <div className="min-h-screen bg-slate-950 text-white">

    {/* ── Nav ───────────────────────────────────────────────── */}
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <img
          src="/myProfilePhoto.jpg"
          alt="Eugene Subrado Jr."
          className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-400/60"
        />
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link to="/dashboard" className="transition-colors hover:text-emerald-400">
            Dashboard
          </Link>
          <Link to="/about-the-developer" className="transition-colors hover:text-emerald-400">
            About
          </Link>
          <a
            href="https://github.com/ESubrado"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-emerald-400"
          >
            <IoLogoGithub className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/eugenesubrado"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-emerald-400"
          >
            <IoLogoLinkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>

    {/* ── Hero ──────────────────────────────────────────────── */}
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute left-2/3 top-1/2 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-40">
        <div className="max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Available for full-time opportunities
          </div>

          <div className="flex items-start gap-8">
            <div className="min-w-0 flex-1">
              <h1 className="mt-2 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  Eugene Subrado Jr.
                </span>
              </h1>

              <p className="mt-5 text-2xl font-semibold text-slate-300">
                Full-Stack Web Developer
              </p>
            </div>

            <div className="hidden shrink-0 lg:block">
              <img
                src="/myProfilePhoto.jpg"
                alt="Eugene Subrado Jr."
                className="h-52 w-52 rounded-2xl object-cover ring-2 ring-emerald-400/40 shadow-2xl shadow-emerald-500/20"
              />
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            I build scalable, real-time web applications with the MERN stack.
            Passionate about clean architecture, intuitive UIs, and data-driven
            engineering that makes an impact.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/about-the-developer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-400/30"
            >
              View Portfolio <IoArrowForwardOutline className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-7 py-3.5 text-sm font-bold text-slate-300 transition-all hover:border-emerald-500/50 hover:text-emerald-400"
            >
              <IoBarChartOutline className="h-4 w-4" /> Live Dashboard Demo
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["React", "Node.js", "MongoDB", "TypeScript", "Socket.io"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── Stats bar ─────────────────────────────────────────── */}
    <section className="border-y border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-800 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-8 py-8 text-center">
              <p className="text-3xl font-extrabold text-emerald-400">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Tech Stack ────────────────────────────────────────── */}
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            My Toolkit
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Technologies I Work With
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-emerald-500/50 hover:bg-slate-800 hover:text-emerald-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* ── Featured Project ──────────────────────────────────── */}
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Featured Work
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">Live Projects</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800 p-7 transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-500/10">
                <IoBarChartOutline className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                ● Live
              </span>
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">
              Edge Real-Time Analytics Dashboard
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              A production-grade MERN application featuring live event tracking
              with Socket.io and MongoDB Change Streams, interactive Recharts
              visualizations, and a fully responsive React + Redux frontend.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["React", "Node.js", "MongoDB", "Socket.io", "Redux", "TypeScript"].map((t) => (
                <span key={t} className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-400">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
              >
                View Live Demo <IoArrowForwardOutline className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/ESubrado/EdgeAnalyticsDashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-400 transition-colors hover:border-slate-500 hover:text-slate-300"
              >
                <IoLogoGithub className="h-4 w-4" /> Source Code
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 p-10 text-center transition-colors hover:border-indigo-500/40">
            <IoSparklesOutline className="h-10 w-10 text-slate-600" />
            <p className="mt-4 text-lg font-bold text-slate-400">
              More in the full portfolio
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              See my complete background, work history, certifications, and
              all projects.
            </p>
            <Link
              to="/about-the-developer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-6 py-2.5 text-sm font-semibold text-indigo-400 transition-colors hover:bg-indigo-500/20"
            >
              View Full Portfolio <IoArrowForwardOutline className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── About teaser ──────────────────────────────────────── */}
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="p-10 md:p-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
                About Me
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Passionate Developer Based in the Philippines
              </h2>
              <p className="mt-5 leading-7 text-slate-400">
                I&apos;m a full-stack developer who builds products from concept to
                deployment. I specialize in the MERN stack and love creating
                real-time applications that make complex data meaningful and
                beautiful.
              </p>
              <ul className="mt-6 space-y-3">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <IoCheckmarkCircleOutline className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/about-the-developer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400"
                >
                  Full Portfolio <IoPersonCircleOutline className="h-4 w-4" />
                </Link>
                <a
                  href="https://github.com/ESubrado"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 text-sm font-bold text-slate-400 transition-colors hover:border-slate-500 hover:text-slate-300"
                >
                  <IoLogoGithub className="h-4 w-4" /> GitHub
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center border-t border-slate-700 bg-gradient-to-br from-indigo-950/50 to-slate-900 p-10 md:border-l md:border-t-0">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
                <div className="absolute bottom-8 right-8 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />
              </div>
              <div className="relative text-center">
                <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 text-4xl font-extrabold text-emerald-400 shadow-xl shadow-emerald-500/20">
                  ES
                </div>
                <p className="mt-5 text-xl font-bold text-white">Eugene Subrado Jr.</p>
                <p className="text-sm font-semibold text-emerald-400">Full-Stack Web Developer</p>
                <p className="mt-2 text-xs text-slate-500">📍 Philippines</p>
                <div className="mt-5 flex justify-center gap-3">
                  <a href="https://github.com/ESubrado" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-600 text-slate-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400">
                    <IoLogoGithub className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com/in/eugenesubrado" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-600 text-slate-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400">
                    <IoLogoLinkedin className="h-5 w-5" />
                  </a>
                  <a href="mailto:eusubjr@gmail.com" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-600 text-slate-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400">
                    <IoMailOutline className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA ───────────────────────────────────────────────── */}
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <IoCodeSlashOutline className="mx-auto h-10 w-10 text-emerald-400" />
        <h2 className="mt-4 text-3xl font-bold text-white">
          Let&apos;s Build Something Great Together
        </h2>
        <p className="mt-4 text-slate-400">
          I&apos;m actively looking for full-time opportunities where I can
          contribute, grow, and keep building real-world solutions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:eusubjr@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400"
          >
            <IoMailOutline className="h-4 w-4" /> Get In Touch
          </a>
          <Link
            to="/about-the-developer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-7 py-3.5 text-sm font-bold text-slate-300 transition-all hover:border-emerald-500/50 hover:text-emerald-400"
          >
            <IoOpenOutline className="h-4 w-4" /> View Portfolio
          </Link>
        </div>
      </div>
    </section>

    {/* ── Footer ────────────────────────────────────────────── */}
    <footer className="border-t border-slate-800 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-slate-600">
          © 2026 Eugene Subrado Jr. Built with the MERN Stack.
        </p>
        <div className="flex items-center gap-4 text-slate-500">
          <a href="https://github.com/ESubrado" target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-400">
            <IoLogoGithub className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com/in/eugenesubrado" target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-400">
            <IoLogoLinkedin className="h-5 w-5" />
          </a>
          <a href="mailto:eusubjr@gmail.com" className="transition-colors hover:text-emerald-400">
            <IoMailOutline className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  </div>
);

export default Portfolio;
