import { Response, Request  } from 'express';
import { AnalyticsBase } from '../models/analytics';
import { EventCountMap, EventTypes, IAnalytics } from '../interface';
import { TimeCountMap } from '../interface';
import moment from 'moment';

// for GET /api/analytics - to get all events
//To Do: Consider adding server paging for optimization
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

// for GET /api/analytics/topanalytic - to get modified array to display top events
export const getTopAnalyticItem = async (_: Request, res: Response) => {
    try{
        const analyticsData = await AnalyticsBase.find({});
        const eventTypeCount : EventCountMap = {};        

        // Logic to get events names and increment every occurence 
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
      
        //Create separate object to get only event and its count
        const labels = Object.keys(eventTypeCount);
        const topEventTypes = labels.map((event : any, index) => ({
          event,
         // index,
            ...eventTypeCount[event], 
        }));   

        res.json(topEventTypes.sort((a:any,b:any)=> b.count - a.count)); // sort in decreasing order
    } catch(err : any) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};

// for GET /api/analytics/analyticchart - to get modified array for charts
export const getAnalyticChartItem = async (req: Request, res: Response) => {
    try{  

      const unit = req.query.type || "hour";
      const now = new Date();
      let compareTime: Date;      

      //use switch to changa date time range according to hour, day, and month
      switch(unit){
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

      const analyticsData: IAnalytics[] = await AnalyticsBase.find({
        timestamp: {
          $gte: compareTime,
          $lte: now
        }
      });
      
      const initFormat: TimeCountMap = {};      

      //Create an object format to store events on specific dates in string, to be used for charting
      analyticsData.forEach(event => {
        const date = new Date(event.timestamp);  
        const localmoment = moment(date);
        const timeKey = localmoment.utc().format()      
        //const timeKey =`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`    

        if (!initFormat[timeKey]) {
          initFormat[timeKey] = {};
        }

        //restrict event types depending on Event Types Enum
        const eventTypeValues : string[] = Object.values(EventTypes) 
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
      const chartFormat =  labels.map((time : any) => ({ //create a array for time and event 
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

// for POST /api/analytics - create new item
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


