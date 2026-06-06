import { Router } from 'express';

import { getAboutDeveloperData } from '../controllers/aboutDeveloper.controller';

const router = Router();

router.get('/', getAboutDeveloperData);

export default router;
