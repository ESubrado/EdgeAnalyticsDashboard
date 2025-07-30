import React, { useState } from 'react';
import Paper from '@mui/material/Paper'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { TablePagination } from '@mui/material';
import moment from 'moment';

import type { eventTableProps } from '~/models/analytics-model';

function createData(
    id: string,
    eventType: string,
    userId: string,
    timestamp: Date,  
) {
  return { id, eventType, userId, timestamp };
}

const AnalyticEventTable : React.FC<eventTableProps> = ({loading, eventItems}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const rows : any[] = [];
    //Loop over event items and create object that is compatible to material table
    for(let i=0; i<eventItems.length; i++){
        rows.push(createData(eventItems[i]._id, eventItems[i].eventType, eventItems[i].userId, eventItems[i].timestamp))
    }
    rows.sort((a,b) => (a.timestamp < b.timestamp ? 1 : -1)) // ascending sorting of date

    const handleChangePage = (event : any, newPage : any) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event : any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Reset to first page when rows per page changes
    };

    return (
        <>      
            <div className='p-4 pb-0 border border-stone-300 rounded col-span-4 md:col-span-7'>        
                <div className="flex items justify-between">
                    {   //Loading text shows when no data is passed from the parent component
                        loading ? (<p>Loading....</p>) : ( 
                            <>
                            <TableContainer component={Paper} sx={{maxHeight: '375px', overflowY: 'auto'}}>
                                <Table sx={{ minWidth: 650 }} aria-label="grid Table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Event Type</TableCell>
                                            <TableCell align="right">User</TableCell>
                                            <TableCell align="right">Time Stamp</TableCell>                                        
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
                                                    {row.eventType}
                                                </TableCell>
                                                <TableCell align="right">{row.userId}</TableCell>
                                                <TableCell align="right">{moment(new Date(row.timestamp)).format("MMM-DD-YYYY hh:mm")}</TableCell>                                   
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