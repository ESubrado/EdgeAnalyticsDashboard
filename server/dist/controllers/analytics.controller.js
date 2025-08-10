"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalyticItem = exports.getAnalyticChartItem = exports.getTopAnalyticItem = exports.getAnalyticItem = void 0;
const analytics_1 = require("../models/analytics");
const interface_1 = require("../interface");
const moment_1 = __importDefault(require("moment"));
// for GET /api/analytics - to get all events
//To Do: Consider adding server paging for optimization
const getAnalyticItem = async (_, res) => {
    try {
        const analyticsData = await analytics_1.AnalyticsBase.find({}).sort({ createdAt: 'desc' });
        res.json(analyticsData);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};
exports.getAnalyticItem = getAnalyticItem;
// for GET /api/analytics/topanalytic - to get modified array to display top events
const getTopAnalyticItem = async (_, res) => {
    try {
        const analyticsData = await analytics_1.AnalyticsBase.find({});
        const eventTypeCount = {};
        // Logic to get events names and increment every occurence 
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
        //Create separate object to get only event and its count
        const labels = Object.keys(eventTypeCount);
        const topEventTypes = labels.map((event, index) => ({
            event,
            // index,
            ...eventTypeCount[event],
        }));
        res.json(topEventTypes.sort((a, b) => b.count - a.count)); // sort in decreasing order
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};
exports.getTopAnalyticItem = getTopAnalyticItem;
//Get events in date range
async function findEventsInDateRange(startDate, endDate) {
    try {
        const events = await analytics_1.AnalyticsBase.find({
            timestamp: {
                $gte: startDate,
                $lte: endDate,
            },
        }).exec();
        return events;
    }
    catch (error) {
        console.error('Error finding events:', error);
        throw error;
    }
}
// for GET /api/analytics/analyticchart - to get modified array for charts
const getAnalyticChartItem = async (req, res) => {
    const unit = req.query.type || "hour";
    const now = new Date();
    let compareTime;
    //use switch to changa date time range according to hour, day, and month
    switch (unit) {
        case 'hour':
            compareTime = new Date(now.getTime() - 60 * 60 * 1000);
            break;
        case 'day':
            compareTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            break;
        // case 'week':
        //   compareTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);       
        case 'month':
            compareTime = new Date(now);
            compareTime.setMonth(compareTime.getMonth() - 1);
            break;
        default:
            compareTime = new Date(now);
            compareTime.setFullYear(compareTime.getFullYear() - 1); // store data only for 1 year        
    }
    //call function to get range of events based on timestamp
    findEventsInDateRange(compareTime, now)
        .then(analyticsData => {
        const initFormat = {};
        //Create an object format to store events on specific dates in string, to be used for charting
        analyticsData.forEach(event => {
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
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving events."
        });
    });
};
exports.getAnalyticChartItem = getAnalyticChartItem;
// for POST /api/analytics - create new item
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
