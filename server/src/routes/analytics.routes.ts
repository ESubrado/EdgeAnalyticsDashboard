import { Router } from "express";

import {
  createAnalyticItem,
  getAnalyticChartItem,
  getAnalyticItem,
  getTopAnalyticItem,
  //getAnalyticItemById,
  //updateAnalyticItem,
  //deleteAnalyticItem
} from '../controllers/analytics.controller';

const router = Router();

router.post('/', createAnalyticItem);
router.get('/', getAnalyticItem);
router.get('/analyticchart/', getAnalyticChartItem);
router.get('/topanalytic/', getTopAnalyticItem)
//router.get('/:id', getAnalyticItemById);
//router.put('/:id', updateAnalyticItem);
//router.delete('/:id', deleteAnalyticItem);

export default router;