import { useState } from 'react';
import Paper from '@mui/material/Paper'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import moment from 'moment';

import useParseEnumFromString from '~/hooks/parse-string';
import { EnumEventTypes } from '~/models/analytics-model';
import LoadingIcon from '~/components/LoadingIcon';
import { useAppTableContext } from '~/context/AppContext';

//function used to create an object that is acceptable to the table. Store it to row array
function createData(
    id: string,
    eventType: string,
    userId: string,
    timestamp: Date, 
    eventTypeName: string, 
    createdAt?: Date | null
) {
  return { id, eventType, userId, timestamp, eventTypeName, createdAt };
}

const AnalyticEventTable = () => {
    const {analyticItemsData, loading} = useAppTableContext();
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const  parseString : any  = useParseEnumFromString(EnumEventTypes)
    const rows : any[] = [];   
    
    //Loop over event items and create object that is compatible to material table
    for (let i = 0; i < analyticItemsData.length; i++){
        rows.push(createData(
            analyticItemsData[i]._id, 
            analyticItemsData[i].eventType, 
            analyticItemsData[i].userId, 
            analyticItemsData[i].timestamp, 
            parseString(analyticItemsData[i].eventType) || `Other (${analyticItemsData[i].eventType})`,
            analyticItemsData[i].createdAt ? analyticItemsData[i].createdAt : null, 
        ))
    }    

    //table pagination functions
    const handleChangePage = (event : any, newPage : any) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event : any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Reset to first page when rows per page changes
    };

    return (
        <>      
            <div className='px-2 md:p-2 pb-0 bg-stone-100 border border-stone-300 rounded col-span-12 lg:col-span-7'>        
                <div className="flex items justify-center py-2">
                    {   //Loading text shows when no data is passed from the parent component
                        loading ? (<LoadingIcon/>) : ( 
                            <>
                            <TableContainer component={Paper} sx={{maxHeight: '375px', overflowY: 'auto'}}>
                                <Table sx={{ minWidth: 650 }} aria-label="grid Table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Event Type</TableCell>
                                            <TableCell align="right">User</TableCell>
                                            <TableCell align="right">Time Stamp</TableCell> 
                                            <TableCell align="right">Created At</TableCell>                                        
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.eventTypeName}
                                                </TableCell>
                                                <TableCell align="right">{row.userId}</TableCell>
                                                <TableCell align="right">{moment(new Date(row.timestamp)).format("MMM-DD-YYYY hh:mm A")}</TableCell>
                                                <TableCell align="right">{moment(new Date(row.createdAt)).format("MMM-DD-YYYY hh:mm A")}</TableCell>                                    
                                            </TableRow>
                                        ))
                                    }
                                    </TableBody>                     
                                </Table>
                                <TablePagination
                                    count={rows.length}
                                    component="div"
                                    rowsPerPageOptions={[5, 10, 20 ]} // Customize options
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />                               
                            </TableContainer>
                            </>
                        )
                    }
                </div>           
            </div>            
        </>    
    )
}

export default AnalyticEventTable