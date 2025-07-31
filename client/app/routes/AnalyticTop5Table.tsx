import React from 'react'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import type { EventCounterProps } from '~/models/analytics-model'
import type { TopEventsItemListProp } from '~/models/analytics-model'

import useParseEnumFromString from '~/hooks/parse-string';
import { EnumEventTypes } from '~/models/analytics-model';

function getTopFive<T>(arr: T[]): T[] { // show only top 5 in array
  return arr.slice(0, 5);
}

const AnalyticTopTable : React.FC<TopEventsItemListProp> = ({loading, topEventsItems}) => {   
  
  const  parseString : any  = useParseEnumFromString(EnumEventTypes);
  let newTopEventItem: EventCounterProps[] = [];

  //Add parsing to indicate real name of event type
  for(var i=0; i<topEventsItems.length; i++){
    newTopEventItem.push(
      {...topEventsItems[i], 
        eventName : parseString(topEventsItems[i].event) || `Other (${topEventsItems[i].event})`
      }
    )
  }
  
  const items = getTopFive(newTopEventItem);
  return (
     <>
        <div className="px-6 py-0 pt-5 border border-stone-300 rounded col-span-2 md:col-span-4">                    
          <div className="flex mb-10 items justify-between">
             <Paper elevation={3} style={{ 
                display: "flex", 
                padding: '2rem', 
                flexDirection: 'column',                
                justifyContent: 'between', 
                width: '100%',
                height: '100%'
                }}>
                <Typography variant="h6" gutterBottom className='py-0'>
                  <span className='text-base flex justify-center font-bold'>Top Event Types</span>
                </Typography>
                <List disablePadding>
                  {items.map((item : EventCounterProps) => (
                    <ListItem key={item.eventName} divider >
                      <ListItemText
                        primary={item.eventName} slotProps={{primary: {component: "label", fontSize: "11pt", display: 'flex', justifyContent: "left"}}}                        
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