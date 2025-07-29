import { Router } from "express";

import {
  createAnalyticItem,
  getAnalyticItem,
  //getAnalyticItemById,
  //updateAnalyticItem,
  //deleteAnalyticItem
} from '../controllers/analytics.controller';

const router = Router();

router.post('/', createAnalyticItem);
router.get('/', getAnalyticItem);
//router.get('/:id', getAnalyticItemById);
//router.put('/:id', updateAnalyticItem);
//router.delete('/:id', deleteAnalyticItem);

export default router;