import { Response, Request  } from 'express';
import { AnalyticsBase } from '../models/Analytics';
import { EventCountMap, EventTypes, IAnalytics } from '../interface';
import { TimeCountMap } from '../interface';
import moment from 'moment';


export const getAnalyticItem = async (_: Request, res: Response) => {
    try{
        const analyticsData = await AnalyticsBase.find({});      
        res.json(analyticsData);
    } catch(err : any) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};

export const getTopAnalyticItem = async (_: Request, res: Response) => {
    try{
        const analyticsData = await AnalyticsBase.find({});
        const eventTypeCount : EventCountMap = {};        

        for(let i = 0; i<analyticsData.length; i++){
          let event : any = analyticsData[i].eventType;
          const eventTypeValues = Object.values(EventTypes);
          let parsedEventType = ""

          eventTypeValues.includes(event) ? 
            parsedEventType = event : parsedEventType = "page_other";         
          
          if(!eventTypeCount[event]){           
            eventTypeCount[parsedEventType] = {}
            eventTypeCount[parsedEventType]["count"] = 0;  
          }
          eventTypeCount[parsedEventType]["count"]++    
        }
      
        const labels = Object.keys(eventTypeCount);
        const topEventTypes = labels.map((event : any) => ({
          event,
            ...eventTypeCount[event], 
        }));   

        res.json(topEventTypes.sort((a:any,b:any)=> b.count - a.count));
    } catch(err : any) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};


export const getAnalyticChartItem = async (req: Request, res: Response) => {
    try{      
      const analyticsData = await AnalyticsBase.find({});  
      const initFormat: TimeCountMap = {};
      const unit = req.query.type || "hour";

      const now = new Date();
      let compareTime: Date;
      let filteredAnalyticsData : any[] = [];      

      //filter by hour, day, month
      switch(unit){
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
        const timeKey =`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`    

        if (!initFormat[timeKey]) {
          initFormat[timeKey] = {};
        }

        //restrict event types depending on Event Types Enum
        const eventTypeValues = Object.values(EventTypes) 
        let parsedEventType = "" 
        eventTypeValues.includes(event.eventType) ? 
          parsedEventType = event.eventType : parsedEventType = "page_other";

        if (!initFormat[timeKey][parsedEventType]) {           
            initFormat[timeKey][parsedEventType] = 0;                    
        }
        initFormat[timeKey][parsedEventType]++;
      });

      //Convert array consistent to chart requirement
      const labels = Object.keys(initFormat).sort((a,b)=> new Date(a).getTime() - new Date(b).getTime());
      const chartFormat =  labels.map((time : any) => ({
         time,
           ...initFormat[time], 
      })); 

      res.json(chartFormat);

    } catch(err : any) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};


export const createAnalyticItem = async (req: Request, res: Response) => {
  try {
    const analyticData = await AnalyticsBase.create(req.body);

    if(analyticData.timestamp > new Date()){
      res.status(400).json({ error: "Future events are not allowed." });
    }else{
      res.status(201).json(analyticData);
    }
  
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


