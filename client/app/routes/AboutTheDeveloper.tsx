import { useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  IoBriefcaseOutline,
  IoCallOutline,
  IoCodeSlashOutline,
  IoFolderOpenOutline,
  IoGlobeOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
  IoOpenOutline,
  IoPersonCircleOutline,
  IoSchoolOutline,
  IoSparklesOutline,
  IoRibbonOutline,
} from "react-icons/io5";

import AboutDeveloperHeader from "./AboutDeveloperHeader";

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
};

type ProfileSection = {
  id: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  summary: string;
  icon: IconType;
  accent: string;
  points: string[];
};

type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
};

type PortfolioProject = {
  title: string;
  type: string;
  description: string;
  stack: string[];
  href?: string;
};

const developerProfile = {
  name: "Eugene Subrado Jr.",
  role: "Full-stack Developer",
  photoUrl: "",
  initials: "ES",
  pitch:
    "I build practical web applications that turn live operational data into interfaces people can scan, trust, and act on quickly.",
  availability: "Open to full-stack, frontend, and dashboard-focused opportunities",
};

const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com",
    icon: IoMailOutline,
  },
  {
    label: "Phone",
    value: "+63 000 000 0000",
    href: "tel:+630000000000",
    icon: IoCallOutline,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/your-profile",
    href: "https://www.linkedin.com/",
    icon: IoLogoLinkedin,
  },
  {
    label: "GitHub",
    value: "github.com/ESubrado",
    href: "https://github.com/ESubrado",
    icon: IoLogoGithub,
  },
];

const profileSections: ProfileSection[] = [
  {
    id: "about-me",
    navLabel: "About",
    eyebrow: "Profile",
    headline: "Developer profile built around real-time, useful software.",
    summary:
      "I enjoy shaping full-stack products where frontend clarity, API behavior, and data flow all work together. My recent work centers on a MERN real-time event analytics dashboard with live updates, charts, tables, and form validation.",
    icon: IoPersonCircleOutline,
    accent: "bg-emerald-500",
    points: [
      "MERN application development",
      "Real-time dashboard interfaces",
      "Readable analytics and workflow-focused UI",
    ],
  },
  {
    id: "tech-stack",
    navLabel: "Tech",
    eyebrow: "Technology Stack",
    headline: "A stack selected for responsive dashboards and maintainable APIs.",
    summary:
      "The current project uses React, React Router, TypeScript, Tailwind CSS, Material UI, Recharts, Node.js, Express, Socket.IO, MongoDB, Docker, and Render deployment.",
    icon: IoCodeSlashOutline,
    accent: "bg-sky-500",
    points: [
      "React UI composition with reusable route components",
      "Express and MongoDB API workflows",
      "Socket.IO updates for real-time data refresh",
    ],
  },
  {
    id: "experience",
    navLabel: "Experience",
    eyebrow: "Experience",
    headline: "Hands-on delivery from data model through deployed interface.",
    summary:
      "My experience covers building dashboard features, wiring REST endpoints, modeling MongoDB data, validating user input, and deploying a working full-stack application.",
    icon: IoBriefcaseOutline,
    accent: "bg-amber-500",
    points: [
      "Dashboard pages with charts, top lists, and event tables",
      "Create-entry workflows with validation and server persistence",
      "Production deployment using Render and Docker-ready project structure",
    ],
  },
  {
    id: "certificates-awards",
    navLabel: "Awards",
    eyebrow: "Certificates and Awards",
    headline: "Credentials, recognition, and milestones in one place.",
    summary:
      "Use this section for certifications, training, awards, recognitions, or professional milestones from your CV or PDF profile.",
    icon: IoRibbonOutline,
    accent: "bg-rose-500",
    points: [
      "Certification name, issuer, and date",
      "Award title, organization, and achievement context",
      "Training or bootcamp completion details",
    ],
  },
  {
    id: "portfolio-projects",
    navLabel: "Projects",
    eyebrow: "Portfolio Projects",
    headline: "Project work that shows how the stack comes together.",
    summary:
      "The portfolio area highlights shipped work, technical decisions, and the problem each project solves. The current dashboard project is included as a real example.",
    icon: IoFolderOpenOutline,
    accent: "bg-cyan-600",
    points: [
      "Live project links and source repositories",
      "Stack tags for quick scanning",
      "Short outcome-focused project summaries",
    ],
  },
];

const technologyGroups = [
  {
    title: "Frontend",
    tools: ["React", "React Router", "TypeScript", "Tailwind CSS", "Material UI", "Recharts"],
  },
  {
    title: "Backend",
    tools: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "Mongoose"],
  },
  {
    title: "Database and Tools",
    tools: ["MongoDB", "GitHub", "Render", "Docker", "Postman", "Vite"],
  },
];

const experienceItems: TimelineItem[] = [
  {
    title: "Full-stack Developer",
    organization: "Edge Real-Time Analytics Dashboard",
    period: "2026",
    description:
      "Built a MERN dashboard that visualizes event activity using charts, top event lists, a live event table, validated create forms, and Socket.IO refresh behavior.",
  },
  {
    title: "Frontend Dashboard Development",
    organization: "React, Tailwind CSS, Material UI, Recharts",
    period: "Project work",
    description:
      "Created responsive dashboard layouts for analytics data with chart filtering, dense tables, reusable components, and clear empty/loading/error states.",
  },
  {
    title: "Backend API and Data Modeling",
    organization: "Node.js, Express.js, MongoDB",
    period: "Project work",
    description:
      "Implemented API routes for analytics entries, top events, chart-ready data, and new event creation using MongoDB-backed persistence.",
  },
];

const certificateItems: TimelineItem[] = [
  {
    title: "Certificate Title",
    organization: "Issuing Organization",
    period: "Year",
    description:
      "Add the certificate focus, covered skills, credential ID, or verification link from the profile PDF.",
  },
  {
    title: "Award or Recognition Title",
    organization: "Awarding Organization",
    period: "Year",
    description:
      "Add the achievement context, category, ranking, or reason this recognition matters.",
  },
  {
    title: "Training or Professional Milestone",
    organization: "Program Provider",
    period: "Year",
    description:
      "Add completion details for workshops, bootcamps, seminars, or professional development.",
  },
];

const portfolioProjects: PortfolioProject[] = [
  {
    title: "Edge Real-Time Analytics Dashboard",
    type: "Full-stack dashboard",
    description:
      "A deployed MERN application with real-time event updates, chart filtering, event creation, top-event summaries, and MongoDB-backed analytics APIs.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Socket.IO"],
    href: "https://edgeanalytics-client.onrender.com/",
  },
  {
    title: "Portfolio Project Title",
    type: "Project category",
    description:
      "Add a short project summary from the PDF: the problem, your role, the result, and the technologies used.",
    stack: ["React", "API", "Database"],
  },
  {
    title: "Capstone or Professional Project",
    type: "Featured work",
    description:
      "Use this card for a second major project, client deliverable, school project, or open-source contribution.",
    stack: ["Frontend", "Backend", "Deployment"],
  },
];

const AboutTheDeveloper = () => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSectionId, setActiveSectionId] = useState(profileSections[0].id);

  const activeSection = useMemo(
    () =>
      profileSections.find((section) => section.id === activeSectionId) ??
      profileSections[0],
    [activeSectionId],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSectionId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-34% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    profileSections.forEach((section) => {
      const sectionElement = sectionRefs.current[section.id];

      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSectionSelect = (sectionId: string) => {
    setActiveSectionId(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const ActiveIcon = activeSection.icon;

  return (
    <div className="min-h-screen rounded-lg bg-gray-50 shadow">
      <AboutDeveloperHeader profile={developerProfile} />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-4">
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-4 lg:self-start">
            <div className="border border-stone-300 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded border border-stone-300 bg-stone-100">
                  {developerProfile.photoUrl ? (
                    <img
                      src={developerProfile.photoUrl}
                      alt={developerProfile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-stone-700">
                      {developerProfile.initials}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xl font-bold text-stone-900">{developerProfile.name}</p>
                  <p className="text-sm font-medium text-emerald-700">
                    {developerProfile.role}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {contactItems.map((item) => {
                  const ContactIcon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 border border-stone-200 bg-gray-50 px-3 py-2 text-sm transition-colors hover:border-emerald-400 hover:bg-emerald-50"
                    >
                      <ContactIcon className="h-5 w-5 shrink-0 text-stone-700" />
                      <span className="min-w-0">
                        <span className="block font-semibold text-stone-900">{item.label}</span>
                        <span className="block break-words text-stone-600">{item.value}</span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-5 border-t border-stone-200 pt-5">
                <div className="flex items-center gap-3">
                  <span className={`h-10 w-1.5 ${activeSection.accent}`} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-stone-500">
                      Now Viewing
                    </p>
                    <p className="text-lg font-bold text-stone-900">{activeSection.eyebrow}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded border border-stone-300 bg-stone-100">
                    <ActiveIcon className="h-6 w-6 text-stone-800" />
                  </div>
                  <p className="text-sm leading-6 text-stone-600">{activeSection.summary}</p>
                </div>
              </div>
            </div>

            <nav className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1" aria-label="Profile sections">
              {profileSections.map((section) => {
                const SectionIcon = section.icon;
                const isActive = section.id === activeSectionId;

                return (
                  <button
                    key={section.id}
                    type="button"
                    title={section.eyebrow}
                    onClick={() => handleSectionSelect(section.id)}
                    className={`flex h-11 items-center gap-2 border px-3 text-left text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : "border-stone-300 bg-white text-stone-700 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    <SectionIcon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{section.navLabel}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="space-y-6">
            <ProfileScrollSection
              section={profileSections[0]}
              sectionRefs={sectionRefs}
            >
              <div className="grid gap-4 md:grid-cols-3">
                {profileSections[0].points.map((point) => (
                  <div key={point} className="border border-stone-300 bg-white p-4 shadow-sm">
                    <IoSparklesOutline className="h-6 w-6 text-emerald-700" />
                    <p className="mt-3 text-sm font-semibold leading-6 text-stone-800">{point}</p>
                  </div>
                ))}
              </div>
              <div className="border border-stone-300 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-stone-900">Profile Snapshot</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  This first section is arranged for a professional profile photo, headline,
                  direct contact methods, and a quick summary of developer focus. It is ready for
                  the exact biography and contact details from the PDF.
                </p>
              </div>
            </ProfileScrollSection>

            <ProfileScrollSection
              section={profileSections[1]}
              sectionRefs={sectionRefs}
            >
              <div className="grid gap-4 md:grid-cols-3">
                {technologyGroups.map((group) => (
                  <div key={group.title} className="border border-stone-300 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-stone-900">{group.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.tools.map((tool) => (
                        <span
                          key={tool}
                          className="border border-stone-300 bg-stone-100 px-2.5 py-1 text-sm font-medium text-stone-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ProfileScrollSection>

            <ProfileScrollSection
              section={profileSections[2]}
              sectionRefs={sectionRefs}
            >
              <Timeline items={experienceItems} icon={IoBriefcaseOutline} />
            </ProfileScrollSection>

            <ProfileScrollSection
              section={profileSections[3]}
              sectionRefs={sectionRefs}
            >
              <Timeline items={certificateItems} icon={IoSchoolOutline} />
            </ProfileScrollSection>

            <ProfileScrollSection
              section={profileSections[4]}
              sectionRefs={sectionRefs}
            >
              <div className="grid gap-4 xl:grid-cols-3">
                {portfolioProjects.map((project) => (
                  <article
                    key={project.title}
                    className="flex min-h-[260px] flex-col border border-stone-300 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-cyan-700">{project.type}</p>
                        <h3 className="mt-1 text-xl font-bold text-stone-900">{project.title}</h3>
                      </div>
                      <IoGlobeOutline className="h-6 w-6 shrink-0 text-stone-700" />
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-6 text-stone-600">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tool) => (
                        <span
                          key={tool}
                          className="border border-stone-300 bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex h-10 items-center justify-center gap-2 border border-cyan-600 bg-cyan-50 px-3 text-sm font-semibold text-cyan-800 transition-colors hover:bg-cyan-100"
                      >
                        <IoOpenOutline className="h-5 w-5" />
                        <span>View Project</span>
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </ProfileScrollSection>
          </div>
        </div>
      </main>
    </div>
  );
};

type ProfileScrollSectionProps = {
  section: ProfileSection;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  children: React.ReactNode;
};

const ProfileScrollSection = ({
  section,
  sectionRefs,
  children,
}: ProfileScrollSectionProps) => {
  const SectionIcon = section.icon;

  return (
    <section
      id={section.id}
      ref={(sectionElement) => {
        sectionRefs.current[section.id] = sectionElement;
      }}
      className="scroll-mt-5 border border-stone-300 bg-gray-50 p-5 shadow-sm md:p-6"
    >
      <div className="mb-5 grid gap-4 border-b border-stone-300 pb-5 md:grid-cols-[auto_minmax(0,1fr)]">
        <div className="grid h-12 w-12 place-items-center rounded border border-stone-300 bg-white">
          <SectionIcon className="h-7 w-7 text-stone-800" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-stone-500">
            {section.eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-stone-900">{section.headline}</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">{section.summary}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {section.points.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${section.accent}`} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};

type TimelineProps = {
  items: TimelineItem[];
  icon: IconType;
};

const Timeline = ({ items, icon: Icon }: TimelineProps) => (
  <div className="space-y-4">
    {items.map((item) => (
      <article key={`${item.title}-${item.period}`} className="border border-stone-300 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start">
          <div className="grid h-11 w-11 place-items-center rounded border border-stone-300 bg-stone-100">
            <Icon className="h-6 w-6 text-stone-800" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">{item.title}</h3>
            <p className="mt-1 text-sm font-semibold text-emerald-700">{item.organization}</p>
            <p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p>
          </div>
          <span className="w-fit border border-stone-300 bg-stone-100 px-2.5 py-1 text-sm font-semibold text-stone-700">
            {item.period}
          </span>
        </div>
      </article>
    ))}
  </div>
);

export default AboutTheDeveloper;
