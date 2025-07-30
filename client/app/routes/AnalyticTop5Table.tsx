import React, {useEffect, useState} from 'react'
import { listViewData } from '~/data/DataSamples'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'

import API_BASE_URL from '~/base-client'
import type { topEventProps } from '~/models/analytics-model'


const AnalyticTopTable = () => {  

  const [topEventsdata, setTopEvents] = useState<topEventProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch(`${API_BASE_URL}/api/analytics/topanalytic`)
      .then((res) => res.json())
      .then((data) => {                    
          setTopEvents(data);
          setLoading(false);
      })
      .catch((err) => {
          console.error("Error getting chart items:", err);
          setLoading(false);
      });   
  }, []);
  
  const items = listViewData;
  return (
     <>
        <div className="px-6 py-0 pt-8 border border-stone-300 rounded col-span-2 md:col-span-4">                    
          <div className="flex mb-12 items justify-between">
             <Paper elevation={3} style={{ 
                display: "flex", 
                padding: '3rem', 
                flexDirection: 'column',                
                justifyContent: 'between', 
                width: '100%',
                height: '100%'
                }}>
                <Typography variant="h6" gutterBottom className='py-0'>
                  <span className='text-base flex justify-center font-bold'>Top 5 Event Types</span>
                </Typography>
                <List disablePadding>
                  {topEventsdata.map((item : topEventProps) => (
                    <ListItem key={item.event} divider >
                      <ListItemText
                        primary={item.event} slotProps={{primary: {component: "label", fontSize: "11pt", display: 'flex', justifyContent: "left"}}}                        
                      />
                      <ListItemText
                        primary={item.count} slotProps={{primary: {component: "label", fontSize: "11pt", display: 'flex', justifyContent: "right"}}}                       
                      />
                    </ListItem>
                  ))}
                </List>
             </Paper>
            </div>
         
        </div>
    </>
  )
}

export default AnalyticTopTable