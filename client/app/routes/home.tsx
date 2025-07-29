import { useEffect, useState } from "react";
import type { Route } from "./+types/home";

import type { IAnalytics } from "~/models/analytics-model";
import { AnalyticGraph } from "./AnalyticGraph";
//import { Welcome } from "../welcome/welcome";
import AnalyticItemList from "./AnalyticList";
import AnalyticTopTable from "./AnalyticTopTable";
import TopBar from "./TopBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Real Time Analytics Dashboard" },
    { name: "description", content: "Welcome!" },
  ];
}

const Home : React.FC = () => {

  const [analyticItem, setAnalyticItemsMain] = useState<IAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);

   useEffect(() => {
        fetch("http://localhost:3001/api/analytics")
        .then((res) => res.json())
        .then((data) => {
            setAnalyticItemsMain(data);
            setTotalEvents(data.length);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching items:", err);
            setLoading(false);
        });
    }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 rounded-lg shadow">
        {/* <nav className="bg-blue-600 p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">Real Time Dashboard</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/posts" className="hover:underline">Posts</Link>
            </div>          
          </div>
        </nav> */}
        <TopBar/>
        <main className="p-4 mx-auto">        
          <div className='px-4 grid gap-3 grid-cols-1 lg:grid-cols-12'>  
            <AnalyticGraph/>
            <AnalyticTopTable totalNumEvents={totalEvents}/>
          </div> 
          {/* <div className='px-4 pt-4 grid gap-3 grid-cols-12'> 
            <AnalyticTopTable/> 
            <AnalyticGraph/>           
          </div>  */}
          { loading ? ( 
            <p>Loading....</p>
            ) : (
             <AnalyticItemList items={analyticItem}/>
            )
            }      
        </main>
    </div>
    </>
  );
}

export default Home;
