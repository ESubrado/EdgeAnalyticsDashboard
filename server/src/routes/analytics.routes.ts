import { Router } from "express";

import {
  createAnalyticItem,
  getAnalyticChartItem,
  getAnalyticItem,
  getTopAnalyticItem, 
} from '../controllers/analytics.controller';

//Main router support for APIs
const router = Router();

router.post('/', createAnalyticItem);
router.get('/', getAnalyticItem);
router.get('/analyticchart/', getAnalyticChartItem);
router.get('/topanalytic/', getTopAnalyticItem)


export default router;