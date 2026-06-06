import { useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
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
  IoWarningOutline,
} from "react-icons/io5";

import AboutDeveloperHeader from "./AboutDeveloperHeader";
import {
  ABOUT_DEVELOPER_API_NOT_FOUND_MESSAGE,
  fetchAboutDeveloperData,
} from "~/store/slices/sliceAboutDeveloper";
import { type AppDispatch, type RootState } from "~/store/store";
import type {
  AboutDeveloperDataState,
  AboutDeveloperProfileSection as ProfileSection,
  AboutDeveloperSkillMeter as SkillMeter,
  AboutDeveloperTimelineItem as TimelineItem,
} from "~/store/slices/sliceAboutDeveloper";

const ABOUT_DEVELOPER_TOAST_DURATION_MS = 5000;

const blankProfileSections: ProfileSection[] = [
  "about-me",
  "tech-stack",
  "experience",
  "certificates-awards",
  "portfolio-projects",
].map((id) => ({
  id,
  navLabel: "",
  eyebrow: "",
  headline: "",
  summary: "",
  icon: "IoSparklesOutline",
  accent: "bg-stone-300",
  points: ["", "", ""],
}));

const createBlankTimelineItems = (count: number): TimelineItem[] =>
  Array.from({ length: count }, () => ({
    title: "",
    organization: "",
    period: "",
    description: "",
    bullets: ["", ""],
  }));

const blankAboutDeveloperData: AboutDeveloperDataState = {
  developerProfile: {
    name: "",
    role: "",
    photoUrl: "",
    initials: "",
    pitch: "",
    about: "",
    availability: "",
  },
  contactItems: Array.from({ length: 5 }, () => ({
    label: "",
    value: "",
    href: "",
    icon: "IoSparklesOutline",
  })),
  profileSections: blankProfileSections,
  skillRatings: Array.from({ length: 4 }, () => ({
    label: "",
    value: 0,
  })),
  technologyGroups: Array.from({ length: 4 }, () => ({
    title: "",
    tools: ["", "", "", ""],
  })),
  academicItems: createBlankTimelineItems(1),
  experienceItems: createBlankTimelineItems(3),
  certificateItems: createBlankTimelineItems(2),
  awardItems: createBlankTimelineItems(2),
  portfolioProjects: Array.from({ length: 2 }, () => ({
    title: "",
    type: "",
    description: "",
    stack: ["", "", ""],
    href: "",
  })),
};

const aboutDeveloperIcons: Record<string, IconType> = {
  IoBriefcaseOutline,
  IoCallOutline,
  IoCodeSlashOutline,
  IoFolderOpenOutline,
  IoGlobeOutline,
  IoLocationOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
  IoPersonCircleOutline,
  IoSchoolOutline,
  IoSparklesOutline,
  IoRibbonOutline,
};

const getAboutDeveloperIcon = (iconName: string) =>
  aboutDeveloperIcons[iconName] ?? IoSparklesOutline;

const AboutTheDeveloper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const aboutDeveloperState = useSelector((state: RootState) => state.aboutDeveloper);
  const {
    developerProfile,
    contactItems,
    profileSections,
    skillRatings,
    technologyGroups,
    academicItems,
    experienceItems,
    certificateItems,
    awardItems,
    portfolioProjects,
  } =
    aboutDeveloperState.source === "blank"
      ? blankAboutDeveloperData
      : aboutDeveloperState;
  const { loading, error, source } = aboutDeveloperState;
  const isBlankLayout = source === "blank";
  const [showApiToast, setShowApiToast] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const firstProfileSectionId = profileSections[0]?.id ?? "";
  const [activeSectionId, setActiveSectionId] = useState(firstProfileSectionId);
  const [showAsideIdentity, setShowAsideIdentity] = useState(false);

  const activeSection = useMemo(
    () =>
      profileSections.find((section) => section.id === activeSectionId) ??
      profileSections[0],
    [activeSectionId, profileSections],
  );

  useEffect(() => {
    dispatch(fetchAboutDeveloperData());
  }, [dispatch]);

  useEffect(() => {
    const hasActiveSection = profileSections.some(
      (section) => section.id === activeSectionId,
    );

    if (firstProfileSectionId && !hasActiveSection) {
      setActiveSectionId(firstProfileSectionId);
    }
  }, [activeSectionId, firstProfileSectionId, profileSections]);

  useEffect(() => {
    if (!isBlankLayout) {
      setShowApiToast(false);
      return;
    }

    setShowApiToast(true);

    const toastTimerId = window.setTimeout(() => {
      setShowApiToast(false);
    }, ABOUT_DEVELOPER_TOAST_DURATION_MS);

    return () => {
      window.clearTimeout(toastTimerId);
    };
  }, [error, isBlankLayout]);

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

      const nextActiveSectionId = getActiveProfileSectionId(
        sectionRefs.current,
        profileSections,
      );

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
  }, [profileSections]);

  const handleSectionSelect = (sectionId: string) => {
    setActiveSectionId(sectionId);

    if (sectionId === firstProfileSectionId) {
      headerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [aboutSection, techSection, experienceSection, awardsSection, projectsSection] =
    profileSections;

  if (
    !activeSection ||
    !aboutSection ||
    !techSection ||
    !experienceSection ||
    !awardsSection ||
    !projectsSection
  ) {
    if (loading || source === "idle") {
      return <BlankAboutDeveloperPage />;
    }

    return <BlankAboutDeveloperPage />;
  }

  const ActiveIcon = getAboutDeveloperIcon(activeSection.icon);
  const activeSummaryPreview = getSummaryPreview(activeSection.summary);

  return (
    <div className="min-h-screen rounded-lg bg-gray-50 shadow">
      {showApiToast && (
        <AboutDeveloperApiToast
          message={error ?? ABOUT_DEVELOPER_API_NOT_FOUND_MESSAGE}
        />
      )}
      <div ref={headerRef}>
        <AboutDeveloperHeader profile={developerProfile} />
      </div>
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-4">
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
            <div className="border border-stone-300 bg-white p-4 shadow-sm lg:p-3">
              <div
                aria-hidden={!showAsideIdentity}
                className={`overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${
                  showAsideIdentity
                    ? "max-h-32 translate-y-0 opacity-100"
                    : "max-h-0 translate-y-3 opacity-0"
                }`}
              >
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
              </div>

              <div className={`${showAsideIdentity ? "mt-3" : ""} space-y-2`}>
                {contactItems.map((item, contactIndex) => {
                  const ContactIcon = getAboutDeveloperIcon(item.icon);

                  return (
                    <a
                      key={`${item.label}-${item.value}-${contactIndex}`}
                      href={item.href || undefined}
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
              section={aboutSection}
              sectionRefs={sectionRefs}
            >
              <div className="grid gap-4 md:grid-cols-3">
                {aboutSection.points.map((point, pointIndex) => (
                  <div key={`${point}-${pointIndex}`} className="border border-stone-300 bg-white p-4 shadow-sm">
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
              section={techSection}
              sectionRefs={sectionRefs}
            >
              <div className="border border-stone-300 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-stone-900">Technical Skill Ratings</h3>
                <SkillMeterList skills={skillRatings} hideValues={isBlankLayout} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {technologyGroups.map((group, groupIndex) => (
                  <div key={`${group.title}-${groupIndex}`} className="border border-stone-300 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-stone-900">{group.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.tools.map((tool, toolIndex) => (
                        <span
                          key={`${tool}-${toolIndex}`}
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
              section={experienceSection}
              sectionRefs={sectionRefs}
            >
              <Timeline items={experienceItems} icon={IoBriefcaseOutline} />
            </ProfileScrollSection>

            <ProfileScrollSection
              section={awardsSection}
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
              section={projectsSection}
              sectionRefs={sectionRefs}
            >
              <div className="grid gap-4 xl:grid-cols-2">
                {portfolioProjects.map((project, projectIndex) => (
                  <article
                    key={`${project.title}-${projectIndex}`}
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
                      {project.stack.map((tool, toolIndex) => (
                        <span
                          key={`${tool}-${toolIndex}`}
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

const BlankAboutDeveloperPage = () => (
  <div className="min-h-screen rounded-lg bg-gray-50 shadow" />
);

type AboutDeveloperApiToastProps = {
  message: string;
};

const AboutDeveloperApiToast = ({ message }: AboutDeveloperApiToastProps) => (
  <div className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] justify-end sm:right-6 sm:top-6 sm:w-auto">
    <div
      role="alert"
      aria-live="assertive"
      className="flex h-12 w-full max-w-sm items-center gap-2 border border-red-800 bg-red-600 px-4 text-sm font-semibold text-white shadow-xl sm:w-auto"
    >
      <IoWarningOutline className="h-5 w-5 shrink-0 text-white" />
      <span className="min-w-0 truncate">
        {message || ABOUT_DEVELOPER_API_NOT_FOUND_MESSAGE}
      </span>
    </div>
  </div>
);

const getSummaryPreview = (summary: string, limit = 150) => {
  if (summary.length <= limit) {
    return summary;
  }

  const clippedSummary = summary.slice(0, limit);
  const lastSpaceIndex = clippedSummary.lastIndexOf(" ");
  const endIndex = lastSpaceIndex > limit * 0.5 ? lastSpaceIndex : limit;

  return `${clippedSummary.slice(0, endIndex).trim()}...`;
};

const getActiveProfileSectionId = (
  sectionElements: Record<string, HTMLElement | null>,
  sections: ProfileSection[],
) => {
  const activationPoint = window.innerHeight * 0.38;
  let bestVisibleSection: {
    id: string;
    visibleHeight: number;
    centerDistance: number;
  } | null = null;

  for (const section of sections) {
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
      const SectionIcon = getAboutDeveloperIcon(section.icon);
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
  const SectionIcon = getAboutDeveloperIcon(section.icon);

  return (
    <section
      id={section.id}
      ref={(sectionElement) => {
        sectionRefs.current[section.id] = sectionElement;
      }}
      className="scroll-mt-4 border border-stone-300 bg-gray-50 p-5 shadow-sm md:p-6"
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

type SkillMeterListProps = {
  skills: SkillMeter[];
  compact?: boolean;
  hideValues?: boolean;
};

const SkillMeterList = ({
  skills,
  compact = false,
  hideValues = false,
}: SkillMeterListProps) => (
  <div className={compact ? "mt-4 space-y-3" : "space-y-4"}>
    {skills.map((skill, skillIndex) => (
      <div key={`${skill.label}-${skillIndex}`}>
        <div className="mb-1 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-stone-800">{skill.label}</span>
          <span className="shrink-0 text-stone-600">
            {hideValues ? "" : `${skill.value}%`}
          </span>
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
    {items.map((item, itemIndex) => (
      <article key={`${item.title}-${item.period}-${itemIndex}`} className="border border-stone-300 bg-white p-5 shadow-sm">
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
                {item.bullets.map((bullet, bulletIndex) => (
                  <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
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
