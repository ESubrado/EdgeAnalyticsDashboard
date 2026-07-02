import React from 'react'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import type { EventCounterProps } from '~/models/analytics-model'

import useParseEnumFromString from '~/hooks/parse-string';
import { EnumEventTypes } from '~/models/analytics-model';
import { useAppTableContext } from '~/context/AppContext';

function getTopFive<T>(arr: T[]): T[] {
  return arr.slice(0, 5);
}

const AnalyticTopTable = () => {   

  const {loading, topEventsData} = useAppTableContext()
  
  const  parseString : any  = useParseEnumFromString(EnumEventTypes);
  let newTopEventItem: EventCounterProps[] = [];

  for (var i = 0; i < topEventsData.length; i++){
    newTopEventItem.push(
      {
        ...topEventsData[i], 
        eventName: parseString(topEventsData[i].event) || `Other (${topEventsData[i].event})`
      }
    )
  }
  
  const items = getTopFive(newTopEventItem);
  return (
     <>
      <div className="px-6 py-0 pt-6 border border-slate-700/60 bg-slate-900 rounded-xl col-span-12 lg:col-span-4">                    
          <div className="md:flex mb-10 items justify-between">
             <Paper elevation={0} style={{ 
                display: "flex", 
                padding: '2rem', 
                flexDirection: 'column',                
                justifyContent: 'between', 
                width: '100%',
                height: '100%',
                backgroundColor: '#1e293b',
                color: '#e2e8f0',
                border: '1px solid #334155',
                borderRadius: '12px',
                }}>
                <Typography variant="h6" gutterBottom>
                  <span className='text-base flex justify-center font-bold text-white'>Top Event Types</span>
                </Typography>
                <List disablePadding>
                  {items.map((item : EventCounterProps) => (
                    <ListItem key={item.eventName} divider sx={{ borderColor: '#334155' }}>
                      <ListItemText
                        primary={item.eventName}
                        slotProps={{ primary: { component: "label", fontSize: "11pt", display: 'flex', justifyContent: "left", color: '#94a3b8' } as any }}
                      />
                      <ListItemText
                        primary={item.count}
                        slotProps={{ primary: { component: "label", fontSize: "11pt", display: 'flex', justifyContent: "right", color: '#e2e8f0', fontWeight: 600 } as any }}
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
