import React, {createContext, useContext, useEffect, useState, useRef} from "react";
import type { FC, ReactNode } from "react";
import type { IAnalytics, EventCounterProps } from "~/models/analytics-model";

import { io } from "socket.io-client"; 
import API_BASE_URL from "~/base-client";

type AppContextType = {
    topEventsData: EventCounterProps[];
    analyticItemsData: IAnalytics[];
    loading: boolean;
    loadingError: boolean;
    socketData: string;
    refreshTables: ()=> void;    
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppTableProvider: React.FC<{children:ReactNode}> = ({children}) => {

    const [topEventsData, setTopEventsData] = useState<EventCounterProps[]>([]);
    const [analyticItemsData, setAnalyticItemsData] = useState<IAnalytics[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);
    const [socketData, setSocketData] = useState("0");
    const socketRef = useRef<ReturnType<typeof io> | null>(null);

    // this function gets data from two APIs using fetch and promises. Will be triggered on page load, 
    // and when socket io receives data from the server
    const fetchData = async () => {    
        try {
            const [tableEventResponse, topEventResponse] = await Promise.all([
                fetch(`${API_BASE_URL}/api/analytics`),
                fetch(`${API_BASE_URL}/api/analytics/topanalytic`),
            ]);

            if (!tableEventResponse.ok || !topEventResponse.ok) {
                throw new Error('One or more network responses were not okay.');
            }

            const tableEventData: IAnalytics[] = await tableEventResponse.json();
            const topEventData: EventCounterProps[] = await topEventResponse.json();

            setAnalyticItemsData(tableEventData);
            setTopEventsData(topEventData);  
            setLoading(false);  
            setLoadingError(false); 

        } catch (error: any) {     
            setLoading(false);  
            setLoadingError(true);
            socketRef.current?.disconnect();
            console.error(error.message);
        }
          
    }   

    useEffect(() => {
        // Initialize socket only on the client (avoids SSR hydration mismatch)
        socketRef.current = io(API_BASE_URL);

        fetchData();  
        
        // Listen for real-time messages
        socketRef.current.on("mongoChange", (data) => {
            fetchData();
            setSocketData(data._id);
        });

        //return function removes event listeners that are being received or emitted from this section.
        return () => {
            socketRef.current?.off("mongoChange");
            socketRef.current?.disconnect();
        };   
    }, []);

    return (
        <AppContext.Provider value={{ topEventsData, analyticItemsData, loading, loadingError, socketData, refreshTables: fetchData }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppTableContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within AppProvider");
    return context;
};
