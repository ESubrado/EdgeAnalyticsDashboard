import { Schema, model } from 'mongoose';

interface IAnalytics {   
    //_id: Number,
    eventType: string;
    userId: string;
    timestamp: Date;
    metadata: Object;
}

const analyticsSchema = new Schema<IAnalytics>({   
    //_id: { type: String},
    eventType: { type: String, required: true },
    userId: { type: String, required: true,},
    timestamp: { type: Date, required: true },
    metadata: { type: Object }
}, { collection: "events" });


export const AnalyticsBase = model<IAnalytics>('Event', analyticsSchema);
