import React from 'react'
import type { topTableProps } from '~/models/analytics-model'
import { listViewData } from '~/data/DataSamples'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'


const AnalyticTopTable : React.FC<topTableProps>  = ({totalNumEvents}) => {

  const handleClick = (item: any) => {
    alert(`You clicked on ${item.title}`);
  };

  const items = listViewData;

  return (
     <>
        <div className="p-4 border border-stone-300 rounded col-span-4">
          <div className="flex justify-center mb-2">
            <div className="border border-stone-300 p-3 px-4 rounded-full ">                                       
              <span className='font-semibold text-xl'>Total Number of Events: {totalNumEvents}</span>
            </div>       
          </div>
            
          <div className="flex mb-8 items justify-center">             
            <div className=''>
             <Paper elevation={3} style={{ padding: '1rem', width: 550, maxWidth: 600, margin: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Top 5 Event Types
                </Typography>
                <List>
                  {items.map((item) => (
                    <ListItem key={item.id} onClick={() => handleClick?.(item)} divider >
                      <ListItemText
                        primary={item.title}
                        secondary={item.description}
                      />
                    </ListItem>
                  ))}
                </List>
             </Paper>
            </div>
          </div>
        </div>
    </>
  )
}

export default AnalyticTopTable