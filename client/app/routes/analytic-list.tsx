import { useEffect, useState } from "react";
import type { IAnalytics } from "~/models/analytics-model";
import Card from "~/components/card";

export default function AnalyticItemList() {

    const [analyticItem, setAnalyticItem] = useState<IAnalytics[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("http://localhost:3001/api/analytics")
        .then((res) => res.json())
        .then((data) => {
            setAnalyticItem(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching items:", err);
            setLoading(false);
        });
    }, []);


    return (
    <div>
      <h2 className="text-2xl font-bold my-4">Posts</h2>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analyticItem.slice(0, 9).map(item => (           
            <Card key={item._id} _id={item._id} eventType={item.eventType} userId={item.userId} metadata={item.metadata} timestamp={item.timestamp}/>
          ))}
        </div>
      )}
    </div>
  );

}