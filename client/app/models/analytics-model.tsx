export interface IAnalytics {
    _id: string;
    eventType: string;
    userId: string;
    timestamp: Date;
    metadata: Object;
};

export interface topTableProps {
  totalNumEvents : number
}