export interface IAnalytics {
    _id: string;
    eventType: string;
    userId: string;
    timestamp: Date;
    metadata: Object;
};