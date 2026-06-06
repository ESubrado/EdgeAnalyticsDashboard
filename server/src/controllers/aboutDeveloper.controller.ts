import { Response, Request } from 'express';
import { AboutDeveloperBase } from '../models/aboutDeveloper';

const ABOUT_DEVELOPER_SLUG = 'main';

const toAboutDeveloperResponse = (aboutDeveloperData: Record<string, unknown>) => {
    const { _id, __v, slug, createdAt, updatedAt, ...responseData } = aboutDeveloperData;

    return responseData;
};

// for GET /api/about-developer - get the public About Developer profile data
export const getAboutDeveloperData = async (_: Request, res: Response) => {
    try {
        const aboutDeveloperData = await AboutDeveloperBase
            .findOne({ slug: ABOUT_DEVELOPER_SLUG })
            .lean();

        if (!aboutDeveloperData) {
            return res.status(404).json({
                message: 'About developer profile has not been configured.',
            });
        }

        return res.json(toAboutDeveloperResponse(aboutDeveloperData));
    } catch (err: any) {
        return res.status(500).send({
            message: err.message || 'Some error occurred while retrieving the about developer profile.',
        });
    }
};
