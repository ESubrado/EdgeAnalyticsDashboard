import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector, type UseSelector } from 'react-redux';
import { fetchGraphData } from '~/store/slices/sliceGraph';
import { type RootState, type AppDispatch } from '~/store/store';


import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import  ButtonGroup  from '@mui/material/ButtonGroup';
import { Button} from '@mui/material';
import type { topTableProps } from '~/models/analytics-model';
import moment from 'moment';

export const AnalyticGraph: React.FC<topTableProps> = ({totalNumEvents, refreshDependent}) => {

    //const [chartdata, setChartData] = useState([]);
    //const [loadingChart, setLoadingChart] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const { chartdata, loadingChart, error } = useSelector((state: RootState) => state.data)
    const [selectDateType, setSelectDateType] = useState<string>("day");   


    //Get data for charts, separated due to its logic complexity
    // useEffect(() => {
    //     fetch(`${API_BASE_URL}/api/analytics/analyticchart?type=${selectDateType}`)
    //     .then((res) => res.json())
    //     .then((data) => {           
    //         setChartData(data);
    //         setLoadingChart(false);
    //     })
    //     .catch((err) => {      
    //         setLoadingChart(true);
    //         console.error("Error getting chart items:", err);
    //     });   
    // }, [selectDateType, refreshDependent]);

    useEffect(()=> {
        dispatch(fetchGraphData({ type: selectDateType }));
    }, [dispatch, selectDateType, refreshDependent])

    //toggle to change time line
    const handleToggle = (value: string) => {
        setSelectDateType(value);
    };
    
    return (     
        <>
            <div className="p-4 pb-8 border bg-stone-100 border-stone-300 col-span-12 lg:col-span-8 rounded "> 
                {
                    loadingChart ? (
                    <>
                        <div style={{ height: 348 }}>
                            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                                <div role="status">
                                        <svg aria-hidden="true" className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>                        
                   </>
                ) : (
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
