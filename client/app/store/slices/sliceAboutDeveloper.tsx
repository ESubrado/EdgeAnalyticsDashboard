import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import API_BASE_URL from "~/base-client";

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

export type AboutDeveloperDataState = {
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

export type AboutDeveloperState = AboutDeveloperDataState & {
  loading: boolean;
  error: string | null;
  source: "idle" | "mongo" | "blank";
};

export const ABOUT_DEVELOPER_API_NOT_FOUND_MESSAGE = "API not found.";

const createBlankAboutDeveloperData = (): AboutDeveloperDataState => ({
  developerProfile: {
    name: "",
    role: "",
    photoUrl: "",
    initials: "",
    pitch: "",
    about: "",
    availability: "",
  },
  contactItems: [],
  profileSections: [],
  skillRatings: [],
  technologyGroups: [],
  academicItems: [],
  experienceItems: [],
  certificateItems: [],
  awardItems: [],
  portfolioProjects: [],
});

const initialState: AboutDeveloperState = {
  ...createBlankAboutDeveloperData(),
  loading: false,
  error: null,
  source: "idle",
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? value : []);

const getDeveloperProfile = (value: unknown): AboutDeveloperProfile => {
  const profile = isRecord(value) ? value : {};

  return {
    name: typeof profile.name === "string" ? profile.name : "",
    role: typeof profile.role === "string" ? profile.role : "",
    photoUrl: typeof profile.photoUrl === "string" ? profile.photoUrl : "",
    initials: typeof profile.initials === "string" ? profile.initials : "",
    pitch: typeof profile.pitch === "string" ? profile.pitch : "",
    about: typeof profile.about === "string" ? profile.about : "",
    availability:
      typeof profile.availability === "string" ? profile.availability : "",
  };
};

const normalizeAboutDeveloperData = (value: unknown): AboutDeveloperDataState => {
  const data = isRecord(value) ? value : {};

  return {
    developerProfile: getDeveloperProfile(data.developerProfile),
    contactItems: getArray<AboutDeveloperContactItem>(data.contactItems),
    profileSections: getArray<AboutDeveloperProfileSection>(data.profileSections),
    skillRatings: getArray<AboutDeveloperSkillMeter>(data.skillRatings),
    technologyGroups: getArray<AboutDeveloperTechnologyGroup>(data.technologyGroups),
    academicItems: getArray<AboutDeveloperTimelineItem>(data.academicItems),
    experienceItems: getArray<AboutDeveloperTimelineItem>(data.experienceItems),
    certificateItems: getArray<AboutDeveloperTimelineItem>(data.certificateItems),
    awardItems: getArray<AboutDeveloperTimelineItem>(data.awardItems),
    portfolioProjects: getArray<AboutDeveloperPortfolioProject>(data.portfolioProjects),
  };
};

const isBlankAboutDeveloperData = (data: AboutDeveloperDataState) => {
  const hasProfileContent = Object.values(data.developerProfile).some(
    (value) => value.trim().length > 0,
  );
  const hasListContent = [
    data.contactItems,
    data.profileSections,
    data.skillRatings,
    data.technologyGroups,
    data.academicItems,
    data.experienceItems,
    data.certificateItems,
    data.awardItems,
    data.portfolioProjects,
  ].some((items) => items.length > 0);

  return !hasProfileContent && !hasListContent;
};

export const fetchAboutDeveloperData = createAsyncThunk<
  AboutDeveloperDataState,
  void,
  { rejectValue: string }
>(
  "aboutDeveloper/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<unknown>(`${API_BASE_URL}/api/about-developer`);
      const aboutDeveloperData = normalizeAboutDeveloperData(response.data);

      if (isBlankAboutDeveloperData(aboutDeveloperData)) {
        return rejectWithValue(ABOUT_DEVELOPER_API_NOT_FOUND_MESSAGE);
      }

      return aboutDeveloperData;
    } catch {
      return rejectWithValue(ABOUT_DEVELOPER_API_NOT_FOUND_MESSAGE);
    }
  },
);

const aboutDeveloperSlice = createSlice({
  name: "aboutDeveloper",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutDeveloperData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutDeveloperData.fulfilled, (state, action) => {
        state.loading = false;
        state.source = "mongo";
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(fetchAboutDeveloperData.rejected, (state, action) => {
        Object.assign(state, createBlankAboutDeveloperData());
        state.loading = false;
        state.source = "blank";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : ABOUT_DEVELOPER_API_NOT_FOUND_MESSAGE;
      });
  },
});

export default aboutDeveloperSlice.reducer;
