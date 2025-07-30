import { useEffect, useState } from "react";

import { AnalyticGraph } from "./AnalyticGraph";
import AnalyticTopTable from "./AnalyticTop5Table";
import TopBar from "./TopBar";
import AnalyticPieChart from "./AnalyticPieChart";
import AnalyticEventTable from "./AnalyticEventTable";

import type { IAnalytics, PieChartItemListProp } from "~/models/analytics-model";
import type { EventCounterProps } from "~/models/analytics-model";
import API_BASE_URL from "~/base-client";


const Home : React.FC = () => {

  const [analyticItem, setAnalyticItemsMain] = useState<IAnalytics[]>([]);
  const [topEventsdata, setTopEvents] = useState<EventCounterProps[]>([]);
  const [pieEventTypeCount, setPieEventTypeCount] = useState<EventCounterProps[]>([])

  const [loading, setLoading] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);

   useEffect(() => {  
    const fetchData = async () => {
        try {
            setLoading(true);
            const [tableEventResponse, topEventResponse] = await Promise.all([
                fetch(`${API_BASE_URL}/api/analytics`),
                fetch(`${API_BASE_URL}/api/analytics/topanalytic`),
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
            
        } catch (error: any) {
            console.error(error.message);            
        } finally {
            setLoading(false)
        }
    }    
    
    fetchData();
    }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 rounded-lg shadow">       
        <TopBar/>
        <main className="p-1 mx-auto">        
          <div className='px-4 grid gap-3 grid-cols-1 lg:grid-cols-12'>  
            <AnalyticGraph totalNumEvents={totalEvents}/>
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
          }       */}
        </main>
    </div>
    </>
  );
}

export default Home;
