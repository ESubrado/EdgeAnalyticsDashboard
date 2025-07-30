import React from "react";
import Card from "~/components/card";
import type { AnalyticsItemListProp } from "~/models/analytics-model";


const AnalyticItemList : React.FC<AnalyticsItemListProp> = ({items}) => {

    //const [analyticItem, setAnalyticItem] = useState<IAnalytics[]>(analyticsData);
    //const [loading, setLoading] = useState(true);

    return (
    <div className="px-4">
      <h2 className="text-2xl font-bold my-4">Posts</h2>     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.slice(0, 9).map(item => (           
          <Card key={item._id} _id={item._id} eventType={item.eventType} userId={item.userId} metadata={item.metadata} timestamp={item.timestamp}/>
        ))}
      </div>
    </div>
  );

}

export default AnalyticItemList;