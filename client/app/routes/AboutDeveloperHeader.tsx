import { Link } from "react-router";
import {
  IoArrowBackOutline,
  IoBarChartOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
  IoRocketOutline,
} from "react-icons/io5";

type AboutDeveloperHeaderProps = {
  profile: {
    name: string;
    role: string;
    pitch: string;
    availability: string;
    photoUrl: string;
    initials: string;
  };
};

const AboutDeveloperHeader = ({ profile }: AboutDeveloperHeaderProps) => (
  <header className="relative overflow-hidden bg-slate-950">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-5">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:text-emerald-400"
        >
          <IoArrowBackOutline className="h-4 w-4" />
          Back to Portfolio
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:text-emerald-400"
        >
          <IoBarChartOutline className="h-4 w-4" />
          Live Dashboard
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {profile.availability || "Open to opportunities"}
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 shadow-2xl shadow-emerald-500/20">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-extrabold text-emerald-400">
                  {profile.initials || "ES"}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
                Portfolio
              </p>
              <h1 className="mt-1 text-4xl font-extrabold text-white lg:text-5xl">
                {profile.name || "Eugene Subrado Jr."}
              </h1>
              <p className="mt-2 text-lg font-semibold text-slate-300">
                {profile.role || "Full-Stack Web Developer"}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                {profile.pitch}
              </p>
              <div className="mt-4 flex gap-3">
                <a href="https://github.com/ESubrado" target="_blank" rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400">
                  <IoLogoGithub className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/essubrado" target="_blank" rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400">
                  <IoLogoLinkedin className="h-5 w-5" />
                </a>
                <a href="mailto:eug.subradojr@gmail.com"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400">
                  <IoMailOutline className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 backdrop-blur-sm">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-emerald-500/10">
            <IoRocketOutline className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">
              {profile.role || "Full-Stack Web Developer"}
            </p>
            <p className="mt-0.5 text-sm text-slate-400">
              {profile.availability || "Open to full-time opportunities"}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="relative h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
  </header>
);

export default AboutDeveloperHeader;
