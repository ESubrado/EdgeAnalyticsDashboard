"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalyticItem = exports.getAnalyticChartItem = exports.getTopAnalyticItem = exports.getAnalyticItem = void 0;
const analytics_1 = require("../models/analytics");
const interface_1 = require("../interface");
const moment_1 = __importDefault(require("moment"));
const getAnalyticItem = async (_, res) => {
    try {
        const analyticsData = await analytics_1.AnalyticsBase.find({});
        res.json(analyticsData);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};
exports.getAnalyticItem = getAnalyticItem;
const getTopAnalyticItem = async (_, res) => {
    try {
        const analyticsData = await analytics_1.AnalyticsBase.find({});
        const eventTypeCount = {};
        for (let i = 0; i < analyticsData.length; i++) {
            let event = analyticsData[i].eventType;
            const eventTypeValues = Object.values(interface_1.EventTypes);
            let parsedEventType = "";
            eventTypeValues.includes(event) ?
                parsedEventType = event : parsedEventType = "page_other";
            if (!eventTypeCount[event]) {
                eventTypeCount[parsedEventType] = {};
                eventTypeCount[parsedEventType]["count"] = 0;
            }
            eventTypeCount[parsedEventType]["count"]++;
        }
        const labels = Object.keys(eventTypeCount);
        const topEventTypes = labels.map((event, index) => ({
            event,
            // index,
            ...eventTypeCount[event],
        }));
        res.json(topEventTypes.sort((a, b) => b.count - a.count));
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};
exports.getTopAnalyticItem = getTopAnalyticItem;
const getAnalyticChartItem = async (req, res) => {
    try {
        const analyticsData = await analytics_1.AnalyticsBase.find({});
        const initFormat = {};
        const unit = req.query.type || "hour";
        const now = new Date();
        let compareTime;
        let filteredAnalyticsData = [];
        //filter by hour, day, month
        switch (unit) {
            case 'hour':
                compareTime = new Date(now.getTime() - 60 * 60 * 1000);
                filteredAnalyticsData = analyticsData.filter((event) => new Date(event.timestamp) >= compareTime);
                break;
            case 'day':
                compareTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                filteredAnalyticsData = analyticsData.filter((event) => new Date(event.timestamp) >= compareTime);
                break;
            case 'week':
                compareTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredAnalyticsData = analyticsData.filter((event) => new Date(event.timestamp) >= compareTime);
            case 'month':
                compareTime = new Date(now);
                compareTime.setMonth(compareTime.getMonth() - 1);
                filteredAnalyticsData = analyticsData.filter((event) => new Date(event.timestamp) >= compareTime);
                break;
            default:
                compareTime = new Date(now);
                compareTime.setFullYear(compareTime.getFullYear() - 1); // store data only for 1 year
                filteredAnalyticsData = analyticsData.filter((event) => new Date(event.timestamp) >= compareTime);
        }
        //Create an object format to store events on specific dates in string, to be used for charting
        filteredAnalyticsData.forEach(event => {
            const date = new Date(event.timestamp);
            const localmoment = (0, moment_1.default)(date);
            const timeKey = localmoment.utc().format();
            //const timeKey =`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`    
            if (!initFormat[timeKey]) {
                initFormat[timeKey] = {};
            }
            //restrict event types depending on Event Types Enum
            const eventTypeValues = Object.values(interface_1.EventTypes);
            let parsedEventType = "";
            eventTypeValues.includes(event.eventType) ?
                parsedEventType = event.eventType : parsedEventType = "page_other";
            if (!initFormat[timeKey][parsedEventType]) {
                initFormat[timeKey][parsedEventType] = 0;
            }
            initFormat[timeKey][parsedEventType]++;
        });
        //Convert array consistent to chart requirement
        const labels = Object.keys(initFormat).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        const chartFormat = labels.map((time) => ({
            time,
            ...initFormat[time],
        }));
        res.json(chartFormat);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};
exports.getAnalyticChartItem = getAnalyticChartItem;
const createAnalyticItem = async (req, res) => {
    try {
        const analyticData = await analytics_1.AnalyticsBase.create(req.body);
        if (analyticData.timestamp > new Date()) {
            res.status(400).json({ error: "Future events are not allowed." });
        }
        else {
            res.status(201).json(analyticData);
        }
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
exports.createAnalyticItem = createAnalyticItem;
