"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsBase = void 0;
const mongoose_1 = require("mongoose");
// schema for mongodb data
const analyticsSchema = new mongoose_1.Schema({
    //_id: { type: String},
    eventType: { type: String, required: true },
    userId: { type: String, required: true, },
    timestamp: { type: Date, required: true },
    metadata: { type: Object },
    createdAt: { type: Date }
}, { collection: "events", timestamps: true, strict: false });
exports.AnalyticsBase = (0, mongoose_1.model)('Event', analyticsSchema);
