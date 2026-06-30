import React, {createContext, useContext, useEffect, useState, useRef} from "react";
import type { FC, ReactNode } from "react";
import type { IAnalytics, EventCounterProps } from "~/models/analytics-model";

import { io } from "socket.io-client"; 
import API_BASE_URL from "~/base-client";

const ANALYTICS_CACHE_KEY = "edgeanalytics.analytics-cache";

type AppContextType = {
    topEventsData: EventCounterProps[];
    analyticItemsData: IAnalytics[];
    loading: boolean;
    loadingError: boolean;
    socketData: string;
    refreshTables: ()=> void;    
}

type AnalyticsCache = {
    topEventsData: EventCounterProps[];
    analyticItemsData: IAnalytics[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const readAnalyticsCache = (): AnalyticsCache | null => {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const cachedData = window.localStorage.getItem(ANALYTICS_CACHE_KEY);
        return cachedData ? JSON.parse(cachedData) : null;
    } catch {
        return null;
    }
}

const writeAnalyticsCache = (cache: AnalyticsCache) => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(ANALYTICS_CACHE_KEY, JSON.stringify(cache));
    } catch {
        // Ignore storage quota/privacy-mode failures; live API data still works.
    }
}

export const AppTableProvider: React.FC<{children:ReactNode}> = ({children}) => {

    const [cachedAnalyticsData] = useState<AnalyticsCache | null>(() => readAnalyticsCache());
    const [topEventsData, setTopEventsData] = useState<EventCounterProps[]>(cachedAnalyticsData?.topEventsData ?? []);
    const [analyticItemsData, setAnalyticItemsData] = useState<IAnalytics[]>(cachedAnalyticsData?.analyticItemsData ?? []);
    const [loading, setLoading] = useState(!cachedAnalyticsData);
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
            writeAnalyticsCache({
                analyticItemsData: tableEventData,
                topEventsData: topEventData,
            });
            setLoading(false);  
            setLoadingError(false); 

        } catch (error: any) {     
            const fallbackData = readAnalyticsCache();

            if (fallbackData) {
                setAnalyticItemsData(fallbackData.analyticItemsData);
                setTopEventsData(fallbackData.topEventsData);
                setLoading(false);
                setLoadingError(false);
                return;
            }

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
