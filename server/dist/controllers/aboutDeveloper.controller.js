"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutDeveloperData = void 0;
const aboutDeveloper_1 = require("../models/aboutDeveloper");
const ABOUT_DEVELOPER_SLUG = 'main';
const toAboutDeveloperResponse = (aboutDeveloperData) => {
    const { _id, __v, slug, createdAt, updatedAt, ...responseData } = aboutDeveloperData;
    return responseData;
};
// for GET /api/about-developer - get the public About Developer profile data
const getAboutDeveloperData = async (_, res) => {
    try {
        const aboutDeveloperData = await aboutDeveloper_1.AboutDeveloperBase
            .findOne({ slug: ABOUT_DEVELOPER_SLUG })
            .lean();
        if (!aboutDeveloperData) {
            return res.status(404).json({
                message: 'About developer profile has not been configured.',
            });
        }
        return res.json(toAboutDeveloperResponse(aboutDeveloperData));
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || 'Some error occurred while retrieving the about developer profile.',
        });
    }
};
exports.getAboutDeveloperData = getAboutDeveloperData;
