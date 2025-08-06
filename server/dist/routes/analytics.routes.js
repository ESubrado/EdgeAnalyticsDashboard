"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
//Main router support for APIs
const router = (0, express_1.Router)();
router.post('/', analytics_controller_1.createAnalyticItem);
router.get('/', analytics_controller_1.getAnalyticItem);
router.get('/analyticchart/', analytics_controller_1.getAnalyticChartItem);
router.get('/topanalytic/', analytics_controller_1.getTopAnalyticItem);
exports.default = router;
