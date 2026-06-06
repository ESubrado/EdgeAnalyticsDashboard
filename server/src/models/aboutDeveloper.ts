import { Schema, model } from 'mongoose';
import { IAboutDeveloper } from '../interface';

const aboutDeveloperSchema = new Schema<IAboutDeveloper>({
    slug: { type: String, required: true, unique: true, default: 'main' },
    developerProfile: { type: Object, required: true },
    contactItems: { type: [Object], default: [] },
    profileSections: { type: [Object], default: [] },
    skillRatings: { type: [Object], default: [] },
    technologyGroups: { type: [Object], default: [] },
    academicItems: { type: [Object], default: [] },
    experienceItems: { type: [Object], default: [] },
    certificateItems: { type: [Object], default: [] },
    awardItems: { type: [Object], default: [] },
    portfolioProjects: { type: [Object], default: [] },
}, { collection: 'aboutDeveloper', timestamps: true, strict: false });

export const AboutDeveloperBase = model<IAboutDeveloper>('AboutDeveloper', aboutDeveloperSchema);
