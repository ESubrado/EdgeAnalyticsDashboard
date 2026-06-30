"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutDeveloperBase = void 0;
const mongoose_1 = require("mongoose");
const aboutDeveloperSchema = new mongoose_1.Schema({
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
exports.AboutDeveloperBase = (0, mongoose_1.model)('AboutDeveloper', aboutDeveloperSchema);
