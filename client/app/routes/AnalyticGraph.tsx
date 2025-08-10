import React, { useState, useEffect } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import  ButtonGroup  from '@mui/material/ButtonGroup';
import { Button} from '@mui/material';
import type { topTableProps } from '~/models/analytics-model';
import moment from 'moment';

import API_BASE_URL from '~/base-client';


export const AnalyticGraph: React.FC<topTableProps> = ({totalNumEvents, refreshDependent}) => {

    const [chartdata, setChartData] = useState([]);
    const [loadingChart, setLoadingChart] = useState(true);
    const [selectDateType, setSelectDateType] = useState<string>("day");   

    //Get data for charts, separated due to its logic complexity
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/analytics/analyticchart?type=${selectDateType}`)
        .then((res) => res.json())
        .then((data) => {           
            setChartData(data);
            setLoadingChart(false);
        })
        .catch((err) => {      
            setLoadingChart(true);
            console.error("Error getting chart items:", err);
        });   
    }, [selectDateType, refreshDependent]);

    //toggle to change time line
    const handleToggle = (value: string) => {
        setSelectDateType(value);
    };
    
    return (     
        <>
        <div className="p-4 pb-8 border border-stone-300 col-span-12 lg:col-span-8 rounded"> 
                {
                    loadingChart ? (<p>Loading Chart.....</p>) : (
                        <>
                            <div className='m-1 md:flex justify-between'> 
                                <div className="mb-2">
                                    <div className="bg-white shadow text-center p-2 md:p-3 md:px-4 rounded-b-md transition">                                       
                                        <span className='font-semibold text-xl'>Total Number of Events: {totalNumEvents || 0}</span>
                                    </div>       
                                </div> 
                                <div className='text-center'>                                 
                                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                                        <Button 
                                            color='success'
                                            variant={selectDateType === 'hour' ? 'contained' : 'outlined'}
                                            onClick={() => handleToggle('hour')}
                                        >
                                            Last Hour
                                        </Button>
                                        <Button                                         
                                            color='success'
                                            variant={selectDateType === 'day' ? 'contained' : 'outlined'}
                                            onClick={() => handleToggle('day')}
                                        >
                                            Last Day
                                        </Button>
                                        <Button 
                                            color='success'
                                            variant={selectDateType === 'month' ? 'contained' : 'outlined'}
                                            onClick={() => handleToggle('month')}
                                        >
                                            Last Month
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div> 
                            <div style={{ width: '100%', height: 280}} className='p-5 md:py-1'>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartdata} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" padding={{ left: 30, right: 30 }} tickFormatter={(tick) => moment(new Date(tick)).format("MMM-DD-YYYY hh:mm A")} />
                                        <YAxis />
                                        <Tooltip labelFormatter={(value) => moment(value).format("MMM-DD-YYYY hh:mm A")} />
                                        <Legend height={22} />
                                        <Line name="Page View" type="monotone" dataKey="page_view" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line name="Page Download" type="monotone" dataKey="page_download" stroke="#82ca9d" />
                                        <Line name="Page Update" type="monotone" dataKey="page_update" stroke="#ffa500" />
                                        <Line name="Page Reload" type="monotone" dataKey="page_reload" stroke="#c91e08" />
                                        <Line name="Page Saved" type="monotone" dataKey="page_saved" stroke="#535406" />
                                        <Line name="Other Events" type="monotone" dataKey="page_other" stroke="#0088fe" />
                                    </LineChart>
                                </ResponsiveContainer>                              
                            </div>                        
                            
                        </> 
                    )
                }                        
        </div>        
        </>           
  )
}
