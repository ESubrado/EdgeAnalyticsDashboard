import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { AnalyticGraph } from "./AnalyticGraph";
import AnalyticTopTable from "./AnalyticTop5Table";
import TopBar from "./TopBar";
import AnalyticPieChart from "./AnalyticPieChart";
import AnalyticEventTable from "./AnalyticEventTable";

import type { IAnalytics, PieChartItemListProp } from "~/models/analytics-model";
import type { EventCounterProps } from "~/models/analytics-model";
import { Snackbar } from "@mui/material";
import type { SnackbarCloseReason } from "@mui/material";

import API_BASE_URL from "~/base-client";
const socket = io("http://localhost:3001/"); // your backend URL

const Home : React.FC = () => {

  const [analyticItem, setAnalyticItemsMain] = useState<IAnalytics[]>([]);
  const [topEventsdata, setTopEvents] = useState<EventCounterProps[]>([]);
  const [pieEventTypeCount, setPieEventTypeCount] = useState<EventCounterProps[]>([])

  const [loading, setLoading] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);
  const [reloadonIO, setReloadOnIO] = useState(0)
  const [openPrompt, setOpenPrompt] = useState(false);

   useEffect(() => {  
    const fetchData = async () => {
        try {           
            const [tableEventResponse, topEventResponse] = await Promise.all([
                fetch(`${API_BASE_URL}/analytics`),
                fetch(`${API_BASE_URL}/analytics/topanalytic`),
            ]);

            if (!tableEventResponse.ok || !topEventResponse.ok) {
                throw new Error('One or more network responses were not okay.');
            }

            const tableEventData: IAnalytics[] = await tableEventResponse.json();
            const topEventData: EventCounterProps[] = await topEventResponse.json();   
           
            setAnalyticItemsMain(tableEventData);
            setTotalEvents(tableEventData.length);
            setTopEvents(topEventData);
            setPieEventTypeCount(topEventData)    
            setLoading(false);        
            
        } catch (error: any) {           
            setOpenPrompt(true); 
            setLoading(true);  
            socket.disconnect(); 
            console.error(error.message);        
        } 
    } 
    fetchData();

    // Listen for real-time messages
    socket.on("mongoChange", (data) => {
        console.log('Received data:', data);
        setReloadOnIO(data._id);
    });

    return () => {
      socket.off("mongoChange");
    };
  }, [reloadonIO]);

  const handleClose = (
          event: React.SyntheticEvent | Event,
          reason?: SnackbarCloseReason,
      ) => {
          if (reason === 'clickaway') {
              return;
          }
          setOpenPrompt(false);
      };

  return (
    <>
      <div className="min-h-screen bg-gray-100 rounded-lg shadow">       
        <TopBar activateCreate={loading}/>
        <main className="p-1 mx-auto">        
          <div className='px-4 grid gap-3 grid-cols-1 lg:grid-cols-12'>  
            <AnalyticGraph totalNumEvents={totalEvents} refreshDependent={reloadonIO}/>
            <AnalyticTopTable loading={loading} topEventsItems={topEventsdata}/>
          </div> 
          <div className='px-4 pt-4 grid gap-3 grid-cols-12'> 
            <AnalyticPieChart eventsListCount={pieEventTypeCount}/>
            <AnalyticEventTable loading={loading} eventItems={analyticItem}/>  
          </div> 
          {/* { loading ? ( 
            <p>Loading....</p>
            ) : (
             <AnalyticItemList items={analyticItem}/>
            )
          }    
          */}
        </main>
        <Snackbar
            open={openPrompt}
            autoHideDuration={6000}           
            message="Unable to fetch data. Please contact administrator" 
            onClose={handleClose}            
        />       
    </div>
    </>
  );
}

export default Home;
