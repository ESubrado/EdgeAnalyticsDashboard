import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import  ButtonGroup  from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
import { chartdata } from '~/data/DataSamples';


export const AnalyticGraph = () => {
  return (     
    <>
        <div className="p-4 border border-stone-300 col-span-1 lg:col-span-8 rounded">   
            <div className='m-1 flex justify-end'>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button color='success'>Last Hour</Button>
                    <Button color='success'>Last Week</Button>
                    <Button color='success'>Last Month</Button>
                </ButtonGroup>
            </div>         
            <ResponsiveContainer width="100%" height="90%">                
                <LineChart width={500} height={300} data={chartdata}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="amt" stroke="#ffa500" />
                </LineChart>
            </ResponsiveContainer>
                    
        </div>
    </>    
  )
}
