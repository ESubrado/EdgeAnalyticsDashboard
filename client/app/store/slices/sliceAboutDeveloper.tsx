import { createSlice } from "@reduxjs/toolkit";

import aboutDeveloperData from "~/context/AboutDeveloperData.json";

export type AboutDeveloperProfile = {
  name: string;
  role: string;
  photoUrl: string;
  initials: string;
  pitch: string;
  about: string;
  availability: string;
};

export type AboutDeveloperContactItem = {
  label: string;
  value: string;
  href: string;
  icon: string;
};

export type AboutDeveloperProfileSection = {
  id: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  summary: string;
  icon: string;
  accent: string;
  points: string[];
};

export type AboutDeveloperSkillMeter = {
  label: string;
  value: number;
};

export type AboutDeveloperTechnologyGroup = {
  title: string;
  tools: string[];
};

export type AboutDeveloperTimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
  bullets?: string[];
  href?: string;
};

export type AboutDeveloperPortfolioProject = {
  title: string;
  type: string;
  description: string;
  stack: string[];
  href?: string;
};

export type AboutDeveloperState = {
  developerProfile: AboutDeveloperProfile;
  contactItems: AboutDeveloperContactItem[];
  profileSections: AboutDeveloperProfileSection[];
  skillRatings: AboutDeveloperSkillMeter[];
  technologyGroups: AboutDeveloperTechnologyGroup[];
  academicItems: AboutDeveloperTimelineItem[];
  experienceItems: AboutDeveloperTimelineItem[];
  certificateItems: AboutDeveloperTimelineItem[];
  awardItems: AboutDeveloperTimelineItem[];
  portfolioProjects: AboutDeveloperPortfolioProject[];
};

const initialState: AboutDeveloperState = aboutDeveloperData;

const aboutDeveloperSlice = createSlice({
  name: "aboutDeveloper",
  initialState,
  reducers: {},
});

export default aboutDeveloperSlice.reducer;
