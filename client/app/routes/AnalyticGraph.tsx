import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import  ButtonGroup  from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
import { chartdata } from '~/data/DataSamples';
import type { topTableProps } from '~/models/analytics-model';


export const AnalyticGraph: React.FC<topTableProps> = ({totalNumEvents}) => {
  return (     
    <>
        <div className="p-4 border border-stone-300 col-span-4 md:col-span-8 rounded">   
            {/* Top section to show total number of events and button group for filter*/}
            <div className='m-1 flex justify-between'> 
                <div className="mb-2">
                    <div className="bg-white shadow p-3 px-4 rounded-b-md transition">                                       
                    <span className='font-semibold text-base'>Total Number of Events: {totalNumEvents || 0}</span>
                    </div>       
                </div>  

                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button color='success'>Last Hour</Button>
                    <Button color='success'>Last Week</Button>
                    <Button color='success'>Last Month</Button>
                </ButtonGroup>
            </div>  
            {/* Main Line chart*/}      
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
