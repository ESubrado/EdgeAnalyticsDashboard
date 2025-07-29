import { Response, Request  } from 'express';
import { AnalyticsBase } from '../models/Analytics';

export const getAnalyticItem = async (_: Request, res: Response) => {
//   AnalyticsBase.find({}).then(analyticsData=>{
//         res.json(analyticsData);
//   })
//   .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "Some error occurred while retrieving stories."
//         })
//     });

    try{
        const analyticsData = await AnalyticsBase.find({});
        res.json(analyticsData);
    } catch(err : any) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stories."
        });
    }
};


export const createAnalyticItem = async (req: Request, res: Response) => {
  try {
    const analyticData = await AnalyticsBase.create(req.body);
    res.status(201).json(analyticData);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


