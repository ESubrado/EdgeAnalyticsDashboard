import React from 'react';
import Paper from '@mui/material/Paper'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { TablePagination } from '@mui/material';

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
    
    const rows : any[] = [];
    //Loop over event items and create object that is compatible to material table
    for(let i=0; i<eventItems.length; i++){
        rows.push(createData(eventItems[i]._id, eventItems[i].eventType, eventItems[i].userId, eventItems[i].timestamp))
    }
    rows.sort((a,b) => (a.timestamp < b.timestamp ? 1 : -1)) // ascending sorting of date

    return (
        <>      
            <div className='p-4 pb-0 border border-stone-300 rounded col-span-4 md:col-span-7'>        
                <div className="flex items justify-between">
                    {   //Loading text shows when no data is passed from the parent component
                        loading ? (<p>Loading....</p>) : ( 
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Event Type</TableCell>
                                    <TableCell align="right">User</TableCell>
                                    <TableCell align="right">Time Stamp</TableCell>                                        
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.eventType}
                                    </TableCell>
                                    <TableCell align="right">{row.userId}</TableCell>
                                    <TableCell align="right">{row.timestamp}</TableCell>                                   
                                </TableRow>
                            ))}
                            </TableBody>  {/* To do: Table pagination */}                          
                        </Table>
                        </TableContainer>)
                    }
                </div>           
            </div>            
        </>    
    )
}

export default AnalyticEventTable