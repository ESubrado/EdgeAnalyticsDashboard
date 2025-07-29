import React from 'react'
import { listViewData } from '~/data/DataSamples'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'


const AnalyticTopTable = () => {  
  
  const items = listViewData;
  return (
     <>
        <div className="p-4 pb-0 border border-stone-300 rounded col-span-2 md:col-span-4">                    
          <div className="flex mb-8 items justify-between">
             <Paper elevation={3} style={{ 
                display: "flex", 
                padding: '1rem', 
                flexDirection: 'column',                
                justifyContent: 'between', 
                width: '100%',
                height: '100%'
                }}>
                <Typography variant="h6" gutterBottom className='py-0'>
                  <span className='text-base font-bold'>Top 5 Event Types</span>
                </Typography>
                <List disablePadding>
                  {items.map((item) => (
                    <ListItem key={item.id} divider >
                      <ListItemText
                        primary={item.title} slotProps={{primary: {component: "label", fontSize: "10pt"}, secondary: {fontSize: "9pt"}}}
                        secondary={item.description}
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