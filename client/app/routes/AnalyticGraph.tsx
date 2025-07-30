import React, { useState, useEffect } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import  ButtonGroup  from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
import { chartdata } from '~/data/DataSamples';
import type { topTableProps } from '~/models/analytics-model';
import moment from 'moment';

import API_BASE_URL from '~/base-client';


export const AnalyticGraph: React.FC<topTableProps> = ({totalNumEvents}) => {

    const [chartdata, setChartData] = useState([]);
    const [loadingChart, setLoadingChart] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/analytics/analyticchart?type=month`)
        .then((res) => res.json())
        .then((data) => {           
            setChartData(data);
            setLoadingChart(false);
        })
        .catch((err) => {
            console.error("Error getting chart items:", err);
            setLoadingChart(false);
        });   
    }, []);
    

    return (     
        <>
        <div className="p-4 pb-5 border border-stone-300 col-span-4 md:col-span-8 rounded"> 
                {
                    loadingChart ? (<p>Loading Chart.....</p>) : (
                        <>
                            <div className='m-1 flex justify-between'> 
                                <div className="mb-2">
                                    <div className="bg-white shadow p-3 px-4 rounded-b-md transition">                                       
                                        <span className='font-semibold text-xl'>Total Number of Events: {totalNumEvents || 0}</span>
                                    </div>       
                                </div> 
                                <div>
                                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                                        <Button color='success'>Last Hour</Button>
                                        <Button color='success'>Last Day</Button>
                                        <Button color='success'>Last Month</Button>
                                    </ButtonGroup>
                                </div> 
                                
                            </div>                         
                            <ResponsiveContainer width="100%" height="80%">                
                                <LineChart width={500} height={400} data={chartdata}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" padding={{ left: 30, right: 30 }} tickFormatter={(tick)=> moment(new Date(tick)).format("MMM-DD-YYYY hh:mm")} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend height={22}/>
                                    <Line name="Page View" type="monotone" dataKey="page_view" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line name="Page Download" type="monotone" dataKey="page_download" stroke="#82ca9d" />
                                    <Line name="Page Update" type="monotone" dataKey="page_update" stroke="#ffa500" />
                                    <Line name="Other Events" type="monotone" dataKey="page_other" stroke="#0088fe" />
                                </LineChart>
                            </ResponsiveContainer>  
                        </> 
                    )
                }                        
        </div>
        </>           
  )
}
