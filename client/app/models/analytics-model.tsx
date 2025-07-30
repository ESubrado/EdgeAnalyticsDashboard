export interface IAnalytics {
    _id: string;
    eventType: string;
    userId: string;
    timestamp: Date;
    metadata: Object;
};

export interface topTableProps {
  totalNumEvents : number;
}

export interface eventTableProps {
  loading: boolean;
  eventItems: IAnalytics[];
}

export interface topEventProps {
  event: string,
  count: number
}

export enum EventTypes {
    View = "page_view",
    Download = "page_download",
    Update = "page_update",   
}


