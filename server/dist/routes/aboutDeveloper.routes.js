"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aboutDeveloper_controller_1 = require("../controllers/aboutDeveloper.controller");
const router = (0, express_1.Router)();
router.get('/', aboutDeveloper_controller_1.getAboutDeveloperData);
exports.default = router;
