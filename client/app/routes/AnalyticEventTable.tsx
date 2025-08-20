import React, { useState } from 'react';
import Paper from '@mui/material/Paper'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import moment from 'moment';

import type { eventTableProps } from '~/models/analytics-model';
import useParseEnumFromString from '~/hooks/parse-string';
import { EnumEventTypes } from '~/models/analytics-model';

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

const AnalyticEventTable : React.FC<eventTableProps> = ({loading, eventItems}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const  parseString : any  = useParseEnumFromString(EnumEventTypes)

    const rows : any[] = [];
    
    //Loop over event items and create object that is compatible to material table
    for(let i=0; i<eventItems.length; i++){
        rows.push(createData(
            eventItems[i]._id, 
            eventItems[i].eventType, 
            eventItems[i].userId, 
            eventItems[i].timestamp, 
            parseString(eventItems[i].eventType) || `Other (${eventItems[i].eventType})`,
            eventItems[i].createdAt ? eventItems[i].createdAt : null, 
        ))
    }

    // ascending sorting of date
    //rows.sort((a,b) => (a.createdAt < b.createdAt ? 1 : -1)) 

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
                        loading ? (
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