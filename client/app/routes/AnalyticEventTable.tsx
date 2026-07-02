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

const darkPaper   = { backgroundColor: '#1e293b', color: '#e2e8f0' };
const headerCell  = { backgroundColor: '#0f172a', color: '#64748b', fontWeight: 600, borderBottom: '1px solid #334155' };
const bodyCell    = { color: '#94a3b8', borderBottom: '1px solid #1e293b' };
const bodyRow     = { '&:hover': { backgroundColor: '#1e293b' }, backgroundColor: '#0f172a' };
const pagination  = { color: '#64748b', backgroundColor: '#0f172a', borderTop: '1px solid #334155',
                       '.MuiTablePagination-selectIcon': { color: '#64748b' },
                       '.MuiTablePagination-actions button': { color: '#64748b' } };

const AnalyticEventTable = () => {
    const {analyticItemsData, loading} = useAppTableContext();
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const  parseString : any  = useParseEnumFromString(EnumEventTypes)
    const rows : any[] = [];   
    
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

    const handleChangePage = (event : any, newPage : any) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event : any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
        <>      
            <div className='px-2 md:p-2 pb-0 border border-slate-700/60 bg-slate-900 rounded-xl col-span-12 lg:col-span-7'>        
                <div className="flex items justify-center py-2">
                    {
                        loading ? (<LoadingIcon/>) : ( 
                            <>
                            <TableContainer component={Paper} sx={{ maxHeight: '375px', overflowY: 'auto', ...darkPaper }}>
                                <Table sx={{ minWidth: 650 }} aria-label="grid Table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={headerCell}>Event Type</TableCell>
                                            <TableCell align="right" sx={headerCell}>User</TableCell>
                                            <TableCell align="right" sx={headerCell}>Time Stamp</TableCell> 
                                            <TableCell align="right" sx={headerCell}>Created At</TableCell>                                        
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow
                                            key={row.id}
                                            sx={{ ...bodyRow, '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" sx={bodyCell}>
                                                    {row.eventTypeName}
                                                </TableCell>
                                                <TableCell align="right" sx={bodyCell}>{row.userId}</TableCell>
                                                <TableCell align="right" sx={bodyCell}>{moment(new Date(row.timestamp)).format("MMM-DD-YYYY hh:mm A")}</TableCell>
                                                <TableCell align="right" sx={bodyCell}>{moment(new Date(row.createdAt)).format("MMM-DD-YYYY hh:mm A")}</TableCell>                                    
                                            </TableRow>
                                        ))
                                    }
                                    </TableBody>                     
                                </Table>
                                <TablePagination
                                    count={rows.length}
                                    component="div"
                                    rowsPerPageOptions={[5, 10, 20]}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    sx={pagination}
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
