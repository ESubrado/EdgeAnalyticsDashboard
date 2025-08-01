import { Schema, model } from 'mongoose';
import { IAnalytics } from '../interface';

// schema for mongodb data
const analyticsSchema = new Schema<IAnalytics>({   
    //_id: { type: String},
    eventType: { type: String, required: true },
    userId: { type: String, required: true,},
    timestamp: { type: Date, required: true },
    metadata: { type: Object },
    createdAt: { type: Date}
}, { collection: "events", timestamps: true, strict: false });


export const AnalyticsBase = model<IAnalytics>('Event', analyticsSchema);
