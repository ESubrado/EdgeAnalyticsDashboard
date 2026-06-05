import { useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  IoBriefcaseOutline,
  IoCallOutline,
  IoCodeSlashOutline,
  IoFolderOpenOutline,
  IoGlobeOutline,
  IoLocationOutline,
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
  bullets?: string[];
  href?: string;
};

type PortfolioProject = {
  title: string;
  type: string;
  description: string;
  stack: string[];
  href?: string;
};

const developerProfile = {
  name: "Eugene Jr Subrado",
  role: "Software Development Engineer",
  photoUrl: "",
  initials: "ES",
  pitch:
    "Software development engineer specializing in robust front-end pages, automation platforms, and full-stack web applications.",
  about:
    "A professional software engineer with about ten (10) years of experience in developing quality, robust, and optimized front-end web pages. Knowledgeable in platforms such as JavaScript, jQuery, Flask (Python), Node.js (Express.js), Kendo UI, Bootstrap, Vue.js, and React (Next.js). Developed, contributed, and completed major automation projects for a pharmaceutical company that employs more than 5,000 individuals globally. Dependable, self-starting, and solutions-oriented with a strong commitment to team goals and client satisfaction.",
  availability: "Based in Dumaguete City, Philippines",
};

const contactItems: ContactItem[] = [
  {
    label: "Phone",
    value: "+63 999 735 5553",
    href: "tel:+639997355553",
    icon: IoCallOutline,
  },
  {
    label: "Email",
    value: "eug.subradojr@gmail.com",
    href: "mailto:eug.subradojr@gmail.com",
    icon: IoMailOutline,
  },
  {
    label: "Location",
    value: "Dumaguete City, Philippines",
    href: "https://www.google.com/maps/search/Dumaguete%20City%2C%20Philippines",
    icon: IoLocationOutline,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/esubrado",
    href: "https://www.linkedin.com/in/esubrado/",
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
    headline: "Software development engineer with about 10 years of experience.",
    summary: developerProfile.about,
    icon: IoPersonCircleOutline,
    accent: "bg-orange-500",
    points: [
      "Robust front-end web pages",
      "Automation platforms for global users",
      "Dependable and solutions-oriented delivery",
    ],
  },
  {
    id: "tech-stack",
    navLabel: "Tech",
    eyebrow: "Technology Stack",
    headline: "Front-end, full-stack, CMS, analytics, and delivery tools.",
    summary:
      "Technical skills include React, jQuery, JavaScript, Bootstrap, Tailwind CSS, Node.js, Express.js, NestJS, Python, Flask, TypeScript, Next.js, MongoDB, SharePoint CSOM, SQL databases, API tools, deployment platforms, and Agile delivery workflows.",
    icon: IoCodeSlashOutline,
    accent: "bg-sky-500",
    points: [
      "React v16+ / jQuery / JavaScript",
      "Node.js / Express.js / NestJS",
      "Python 3.0+ / Flask",
    ],
  },
  {
    id: "experience",
    navLabel: "Experience",
    eyebrow: "Experience",
    headline: "Professional experience across engineering, project delivery, support, and audit.",
    summary:
      "Experience includes software engineering at Xtensa Inc. and Quartica, project management at Maks Enterprises, customer retention technical support at Qualfon Philippines, and IT internal audit work at Silliman University.",
    icon: IoBriefcaseOutline,
    accent: "bg-amber-500",
    points: [
      "Project Manager / Scrum Master",
      "Senior Front End Engineer",
      "IT Internal Auditor and support roles",
    ],
  },
  {
    id: "certificates-awards",
    navLabel: "Awards",
    eyebrow: "Certificates and Awards",
    headline: "Cybersecurity, front-end development, REST APIs, and company awards.",
    summary:
      "Certificates include ISC2 Certified in Cybersecurity candidate status, Meta Front-End Professional Certificate, and an ongoing Udemy REST API course. Awards include loyalty, engagement, and team captain recognition from Xtensa Inc.",
    icon: IoRibbonOutline,
    accent: "bg-rose-500",
    points: [
      "ISC2 Certified in Cybersecurity candidate",
      "Meta Front-End Professional Certificate",
      "Xtensa Inc. recognition awards",
    ],
  },
  {
    id: "portfolio-projects",
    navLabel: "Projects",
    eyebrow: "Portfolio Projects",
    headline: "Deployed portfolio work with dashboard and billing automation use cases.",
    summary:
      "Portfolio projects include a real-time event analytics dashboard and Simplify Bill, a billing PDF conversion tool built with a Next.js and Flask technology stack.",
    icon: IoFolderOpenOutline,
    accent: "bg-cyan-600",
    points: [
      "MERN dashboard with Socket.IO",
      "Next.js and Flask billing PDF converter",
      "Hosted project demonstrations",
    ],
  },
];

const skillRatings = [
  {
    label: "React v16+ / jQuery / JavaScript",
    value: 85,
  },
  {
    label: "Bootstrap / Tailwind / CSS3",
    value: 83,
  },
  {
    label: "Node.js / Express.js / NestJS",
    value: 80,
  },
  {
    label: "Python 3.0+ / Flask",
    value: 75,
  },
];

const technologyGroups = [
  {
    title: "Frontend and UI",
    tools: [
      "React v16+",
      "jQuery",
      "Vanilla JavaScript",
      "TypeScript",
      "React Redux",
      "Vue 3",
      "Next.js",
      "Bootstrap",
      "Tailwind CSS",
      "CSS3",
      "Material UI",
      "Recharts",
      "Kendo UI",
    ],
  },
  {
    title: "Backend and Data",
    tools: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Python 3.0+",
      "Flask",
      "REST APIs",
      "MongoDB",
      "SQLite",
      "PostgreSQL",
      "GraphQL",
      "SharePoint List CSOM",
    ],
  },
  {
    title: "CMS, Tools, and Delivery",
    tools: [
      "WordPress",
      "Elementor",
      "WooCommerce",
      "Fiddler",
      "Postman",
      "Jest",
      "Browser Dev Tools",
      "Azure",
      "Render",
      "SourceTree",
      "GitHub",
      "GitKraken",
      "Canva",
      "Figma",
      "Jira",
    ],
  },
  {
    title: "AI, Analytics, and Process",
    tools: [
      "GPT-4.1",
      "Claude Opus",
      "Cursor",
      "GitHub Copilot",
      "Agile Scrum Methodology",
      "Continuous Improvement and Delivery",
      "Google Analytics",
      "Google Tag Manager",
    ],
  },
];


const academicItems: TimelineItem[] = [
  {
    title: "Bachelor of Science in Computer Engineering",
    organization: "Silliman University, Philippines",
    period: "SY 2002 - 2007",
    description: "Completed the Bachelor of Science in Computer Engineering program.",
  },
];

const experienceItems: TimelineItem[] = [
  {
    title: "Project Manager / Scrum Master",
    organization: "Maks Enterprises",
    period: "Dec 2025 - May 2026",
    description:
      "Contract role focused on software development project delivery.",
    bullets: [
      "Managed software development projects using Jira and Agile methodologies as Scrum Master.",
      "Coordinated developers, QA teams, and stakeholders to deliver CRM and e-commerce enhancements for MAKRO ERP.",
      "Facilitated stakeholder demonstrations and translated business requirements into technical deliverables.",
      "Led feature planning, sprint execution, and release activities for WordPress, WooCommerce, and custom web applications.",
      "Collaborated closely with developers on implementation strategies, issue resolution, and deployment planning.",
    ],
  },
  {
    title: "Software Engineer / Senior Front End Engineer",
    organization: "Xtensa Inc. / Quartica",
    period: "Aug 2015 - Jul 2025",
    description:
      "Developed and maintained web applications and pages for clients in the pharmaceutical and chemical industry.",
    bullets: [
      "Served as Software Engineer from August 2015 to June 2023 and Senior Front End Engineer from July 2023 to July 2025.",
      "Developed and maintained SharePoint-based web applications, including a list aggregator using HTML, CSS, Bootstrap, jQuery, and CSOM.",
      "Modernized legacy client upskilling platforms by upgrading outdated jQuery and Kendo UI implementations.",
      "Built core front-end functionality and API integrations for the SDS module using SPA architecture, React, jQuery, Bootstrap, and Kendo UI.",
      "Supported over 5,000 global users and mentored junior developers on methodologies, tools, optimization, and collaboration practices.",
    ],
  },
  {
    title: "Customer Retention Team",
    organization: "Qualfon Philippines Inc.",
    period: "Oct 2014 - Jul 2015",
    description:
      "Provided customer retention support for mobile devices and telecommunications services.",
    bullets: [
      "Provided technical support and troubleshooting for mobile devices and telecommunications services while maintaining quality standards.",
      "Developed strong communication and problem-resolution skills by translating technical concepts into user-friendly guidance.",
    ],
  },
  {
    title: "IT Internal Auditor",
    organization: "Silliman University",
    period: "Jun 2013 - May 2014",
    description:
      "Performed IT audit work involving infrastructure, backup systems, and database records.",
    bullets: [
      "Analyzed IT infrastructure, backup systems, and database records using SQL to identify risks, validate data accuracy, and recommend process improvements using COBIT as a standard.",
      "Prepared technical documentation and presented findings to stakeholders, strengthening analytical and problem-solving skills.",
    ],
  },
];

const certificateItems: TimelineItem[] = [
  {
    title: "Certified in Cybersecurity Certification",
    organization: "ISC2",
    period: "August 2024",
    description:
      "Candidate only. ID: 9287lcdd-5549-4495-85d1-ca2f0538854, valid until August 2027.",
  },
  {
    title: "Meta Front-End Professional Certificate",
    organization: "Coursera",
    period: "June 2024",
    description:
      "React and Node.js based professional certificate.",
    href: "https://coursera.org/verify/professional-cert/MTX3V5JYCSBSB",
  },
  {
    title: "Build Professional REST APIs with Python, Flask, Docker, Flask-Smorest, and Flask-SQLAlchemy",
    organization: "Udemy",
    period: "Ongoing",
    description:
      "Ongoing professional development course focused on production-ready Python REST API development.",
  },
];

const awardItems: TimelineItem[] = [
  {
    title: "Five (5) Years, Loyalty Service Award",
    organization: "Xtensa Inc.",
    period: "December 2020",
    description: "Received for five years of service.",
  },
  {
    title: "The Engagement Champion Award",
    organization: "Xtensa Inc.",
    period: "December 2022",
    description:
      "Received for being an active and engaged employee and acting as a role model for others.",
  },
  {
    title: "Team Captain Award",
    organization: "Xtensa Inc.",
    period: "December 15, 2023",
    description:
      "Received for embodying the qualities of Captain America: leadership, integrity, and commitment to work.",
  },
];

const portfolioProjects: PortfolioProject[] = [
  {
    title: "Edge Real-Time Analytics Dashboard",
    type: "Real-time MERN dashboard",
    description:
      "A dashboard that updates in real time when a new event is added to the database. The project is based on a MERN pattern using React v19 with Tailwind CSS, Material UI, and Socket.IO, backed by a Node.js and Express backend.",
    stack: ["React v19", "Tailwind CSS", "Material UI", "Socket.IO", "Node.js", "Express"],
    href: "https://edgeanalytics-client.onrender.com/",
  },
  {
    title: "Simplify Bill",
    type: "Billing PDF conversion tool",
    description:
      "Converts a hundred-page business telephone billing PDF file for Verizon Business into an understandable format with charts and individual person charges. Uses a Next.js frontend and Flask backend. Demonstration needed.",
    stack: ["Next.js", "React", "Flask", "Python", "Charts"],
    href: "https://simpliebilling.onrender.com/",
  },
];

const AboutTheDeveloper = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSectionId, setActiveSectionId] = useState(profileSections[0].id);
  const [showAsideIdentity, setShowAsideIdentity] = useState(false);

  const activeSection = useMemo(
    () =>
      profileSections.find((section) => section.id === activeSectionId) ??
      profileSections[0],
    [activeSectionId],
  );

  useEffect(() => {
    const updateAsideIdentityVisibility = () => {
      const headerElement = headerRef.current;

      if (!headerElement) {
        return;
      }

      setShowAsideIdentity(headerElement.getBoundingClientRect().bottom <= 0);
    };

    updateAsideIdentityVisibility();
    window.addEventListener("scroll", updateAsideIdentityVisibility, { passive: true });
    window.addEventListener("resize", updateAsideIdentityVisibility);

    return () => {
      window.removeEventListener("scroll", updateAsideIdentityVisibility);
      window.removeEventListener("resize", updateAsideIdentityVisibility);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateActiveSection = () => {
      animationFrameId = null;

      const nextActiveSectionId = getActiveProfileSectionId(sectionRefs.current);

      if (nextActiveSectionId) {
        setActiveSectionId((currentActiveSectionId) =>
          currentActiveSectionId === nextActiveSectionId
            ? currentActiveSectionId
            : nextActiveSectionId,
        );
      }
    };

    const requestActiveSectionUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    requestActiveSectionUpdate();
    window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", requestActiveSectionUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("resize", requestActiveSectionUpdate);
    };
  }, []);

  const handleSectionSelect = (sectionId: string) => {
    setActiveSectionId(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const ActiveIcon = activeSection.icon;
  const activeSummaryPreview = getSummaryPreview(activeSection.summary);

  return (
    <div className="min-h-screen rounded-lg bg-gray-50 shadow">
      <div ref={headerRef}>
        <AboutDeveloperHeader profile={developerProfile} />
      </div>
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-4">
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-3 lg:max-h-[calc(100vh-1.5rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
            <div className="border border-stone-300 bg-white p-4 shadow-sm lg:p-3">
              {showAsideIdentity && (
                <div className="flex items-center gap-3">
                  <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded border border-stone-300 bg-stone-100">
                    {developerProfile.photoUrl ? (
                      <img
                        src={developerProfile.photoUrl}
                        alt={developerProfile.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-stone-700">
                        {developerProfile.initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-bold leading-tight text-stone-900">{developerProfile.name}</p>
                    <p className="text-sm font-medium text-emerald-700">
                      {developerProfile.role}
                    </p>
                  </div>
                </div>
              )}

              <div className={`${showAsideIdentity ? "mt-3" : ""} space-y-2`}>
                {contactItems.map((item) => {
                  const ContactIcon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 border border-stone-200 bg-gray-50 px-2.5 py-1.5 text-sm transition-colors hover:border-emerald-400 hover:bg-emerald-50"
                    >
                      <ContactIcon className="h-4 w-4 shrink-0 text-stone-700" />
                      <span className="min-w-0">
                        <span className="block font-semibold text-stone-900">{item.label}</span>
                        <span className="block break-words text-stone-600">{item.value}</span>
                      </span>
                    </a>
                  );
                })}
              </div>            

              <div className="mt-3 border-t border-stone-200 pt-3">
                <div className="flex items-center gap-2.5">
                  <span className={`h-8 w-1.5 ${activeSection.accent}`} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-stone-500">
                      Now Viewing
                    </p>
                    <p className="text-base font-bold text-stone-900">{activeSection.eyebrow}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded border border-stone-300 bg-stone-100">
                    <ActiveIcon className="h-5 w-5 text-stone-800" />
                  </div>
                  <p className="text-sm leading-5 text-stone-600">{activeSummaryPreview}</p>
                </div>
              </div>
            </div>

            <ProfileSectionNavigation
              activeSectionId={activeSectionId}
              sections={profileSections}
              onSectionSelect={handleSectionSelect}
            />
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
              <div>
                <h3 className="mb-3 text-lg font-bold text-stone-900">Academic History</h3>
                <Timeline items={academicItems} icon={IoSchoolOutline} />
              </div>
            </ProfileScrollSection>

            <ProfileScrollSection
              section={profileSections[1]}
              sectionRefs={sectionRefs}
            >
              <div className="border border-stone-300 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-stone-900">Technical Skill Ratings</h3>
                <SkillMeterList skills={skillRatings} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
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
              <div>
                <h3 className="mb-3 text-lg font-bold text-stone-900">Certificates</h3>
                <Timeline items={certificateItems} icon={IoSchoolOutline} />
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-stone-900">Awards</h3>
                <Timeline items={awardItems} icon={IoRibbonOutline} />
              </div>
            </ProfileScrollSection>

            <ProfileScrollSection
              section={profileSections[4]}
              sectionRefs={sectionRefs}
            >
              <div className="grid gap-4 xl:grid-cols-2">
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

const getSummaryPreview = (summary: string, limit = 80) => {
  if (summary.length <= limit) {
    return summary;
  }

  const clippedSummary = summary.slice(0, limit);
  const lastSpaceIndex = clippedSummary.lastIndexOf(" ");
  const endIndex = lastSpaceIndex > limit * 0.5 ? lastSpaceIndex : limit;

  return `${clippedSummary.slice(0, endIndex).trim()}...`;
};

const getActiveProfileSectionId = (sectionElements: Record<string, HTMLElement | null>) => {
  const activationPoint = window.innerHeight * 0.38;
  let bestVisibleSection: {
    id: string;
    visibleHeight: number;
    centerDistance: number;
  } | null = null;

  for (const section of profileSections) {
    const sectionElement = sectionElements[section.id];

    if (!sectionElement) {
      continue;
    }

    const sectionRect = sectionElement.getBoundingClientRect();

    if (sectionRect.top <= activationPoint && sectionRect.bottom >= activationPoint) {
      return section.id;
    }

    const visibleTop = Math.max(sectionRect.top, 0);
    const visibleBottom = Math.min(sectionRect.bottom, window.innerHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (visibleHeight === 0) {
      continue;
    }

    const sectionCenter = sectionRect.top + sectionRect.height / 2;
    const centerDistance = Math.abs(sectionCenter - activationPoint);

    if (
      !bestVisibleSection ||
      visibleHeight > bestVisibleSection.visibleHeight ||
      (visibleHeight === bestVisibleSection.visibleHeight &&
        centerDistance < bestVisibleSection.centerDistance)
    ) {
      bestVisibleSection = {
        id: section.id,
        visibleHeight,
        centerDistance,
      };
    }
  }

  return bestVisibleSection?.id;
};

type ProfileSectionNavigationProps = {
  sections: ProfileSection[];
  activeSectionId: string;
  onSectionSelect: (sectionId: string) => void;
};

const ProfileSectionNavigation = ({
  sections,
  activeSectionId,
  onSectionSelect,
}: ProfileSectionNavigationProps) => (
  <nav className="mt-2 grid grid-cols-2 gap-1.5 lg:grid-cols-1" aria-label="Profile sections">
    {sections.map((section) => {
      const SectionIcon = section.icon;
      const isActive = section.id === activeSectionId;

      return (
        <button
          key={section.id}
          type="button"
          title={section.eyebrow}
          aria-current={isActive ? "true" : undefined}
          onClick={() => onSectionSelect(section.id)}
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
);

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
          {/* <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {section.points.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${section.accent}`} />
                <span>{point}</span>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
};

type SkillMeter = {
  label: string;
  value: number;
};

type SkillMeterListProps = {
  skills: SkillMeter[];
  compact?: boolean;
};

const SkillMeterList = ({ skills, compact = false }: SkillMeterListProps) => (
  <div className={compact ? "mt-4 space-y-3" : "space-y-4"}>
    {skills.map((skill) => (
      <div key={skill.label}>
        <div className="mb-1 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-stone-800">{skill.label}</span>
          <span className="shrink-0 text-stone-600">{skill.value}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-orange-500"
            style={{ width: `${skill.value}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

type SidebarListProps = {
  title: string;
  items: string[];
};

const SidebarList = ({ title, items }: SidebarListProps) => (
  <div className="mt-5 border-t border-stone-200 pt-5">
    <h3 className="text-lg font-bold text-stone-900">{title}</h3>
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="text-sm leading-6 text-stone-600">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

type LanguageListProps = {
  items: Array<{
    label: string;
    value: string;
  }>;
};

const LanguageList = ({ items }: LanguageListProps) => (
  <div className="mt-5 border-t border-stone-200 pt-5">
    <h3 className="text-lg font-bold text-stone-900">Languages</h3>
    <div className="mt-3 space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex justify-between gap-3 text-sm">
          <span className="font-semibold text-stone-800">{item.label}</span>
          <span className="text-stone-600">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

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
            {item.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-stone-600">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex h-9 items-center gap-2 border border-emerald-600 bg-emerald-50 px-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
              >
                <IoOpenOutline className="h-5 w-5" />
                <span>View Credential</span>
              </a>
            )}
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
