import { useState } from "react";
import { io } from "socket.io-client";

import { AnalyticGraph } from "./AnalyticGraph";
import AnalyticTopTable from "./AnalyticTop5Table";
import TopBar from "./TopBar";
import AnalyticPieChart from "./AnalyticPieChart";
import AnalyticEventTable from "./AnalyticEventTable";

import { Snackbar } from "@mui/material";
import type { SnackbarCloseReason } from "@mui/material";

import API_BASE_URL from "~/base-client";
import { useNavigate } from "react-router";
import { useAppTableContext } from "~/context/AppContext";
const socket = io(API_BASE_URL); // your backend URL

const Home = () => {

  const {analyticItemsData, loading, loadingError, refreshTables} = useAppTableContext();

  const totalEvents = analyticItemsData.length;
  //const [reloadonIO, setReloadOnIO] = useState(0)
  const [openPrompt, setOpenPrompt] = useState(loadingError);

  const showCreateBtn = false;
  const showReturnButton = true;
  const navigateBackFromAbout = useNavigate();  

  // function to handle closing of the snack bar component. (prompt)
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
      <div className="min-h-screen bg-gray-50 rounded-lg shadow">       
        <TopBar activateCreate={loading} useNav={navigateBackFromAbout} showCreateBtn={showCreateBtn} showReturnBtn={showReturnButton}/>               
            { loading ? (
              <></>
            ) : (
              <>
                 <main className="p-1 mx-auto">        
                    <div className='px-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12'>  
                      {/*refreshDependent enables the graph to reload when new data is available from the socket */}
                      <AnalyticGraph/>           
                      <AnalyticTopTable/>
                    </div> 
                    <div className='px-4 pt-4 grid gap-3 grid-cols-12'> 
                      <AnalyticPieChart/>
                      <AnalyticEventTable/>  
                    </div>                    
                </main>
              </>
            )
          }   
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
