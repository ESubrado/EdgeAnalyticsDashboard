export interface IAnalytics {   
    //_id: Number,
    eventType: string;
    userId: string;
    timestamp: Date;
    metadata: Object;
    createdAt: Date;
}

export interface IAnalyticsChart {

}

export enum EventTypes {
    View = "page_view",
    Download = "page_download",
    Update = "page_update",
    Reload = "page_reload",
    Saved = "page_saved"   
}


export type TimeCountMap = {
  [time: string]: {
    [eventType: string]: number;
  };
};

export type EventCountMap = {     
  [eventType: string]: {
    [count: string]: number; 
    //[index: number] : number;  
  };
};



    


