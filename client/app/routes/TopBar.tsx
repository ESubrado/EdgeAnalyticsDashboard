import React, { useState } from 'react'
import moment from 'moment'
import { IoAddCircleOutline, IoInformationCircleOutline, IoBackspaceOutline } from 'react-icons/io5';
import EventFormModal from '~/components/EventFormModal';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { topBarProps } from '~/models/analytics-model';
import { Button, ButtonGroup } from '@mui/material';

const TopBar : React.FC<topBarProps> = (props) => {
   
    //Top bar variables declaration
    const formattedDateTime = moment().format("MMMM DD, YYYY");
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Functions to cater create new entry modal opening and closing.
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='border-b px-4 mb-2 mt-0 py-2 border-stone-300'>
            <div className="p-2 text-center lg:text-left lg:flex lg:items-center lg:justify-between lg:p-0.5">
                <div>
                    <div className='grid lg:flex'>
                        <span className='text-2xl lg:text-4xl font-bold'>
                            Real-Time Event Analytics Dashboard
                        </span>
                        <span className='lg:px-2 md:pt-4 text-sm text-stone-500'>by: Eugene Subrado Jr</span>
                    </div>                    
                    <span className="text-sm block text-stone-500">
                        <p>Today is {formattedDateTime}</p>
                    </span>
                </div>               
                <div className='pt-3 flex justify-self-center lg:justify-end'>
                    {props.showCreateBtn ? (
                        <>
                            <ButtonGroup variant="text" aria-label="Basic button group" sx={{
                                ".MuiButtonGroup-grouped:not(:last-of-type)": {
                                    borderColor: "ButtonText",
                                },
                            }}> 
                                <Button className="flex items-center gap-2 border px-4 py-1.5 rounded" sx={{ textTransform: "none", color: 'ButtonText' }}
                                        onClick={handleOpenModal} disabled={props.activateCreate}
                                    >
                                        <span>Add New Event </span>
                                    </Button>
                                <Button className="flex items-center gap-2 border px-4 py-1.5 rounded" sx={{ textTransform: "none", color: 'ButtonText' }}
                                    onClick={() => props.useNav('/register')} disabled={props.activateCreate}
                                >
                                    <span >Login</span>
                                </Button>
                                <Button className="flex items-center gap-2 border px-4 py-1.5 rounded" sx={{ textTransform: "none", color: 'ButtonText' }}
                                        onClick={() => props.useNav('/about')} disabled={props.activateCreate}
                                    >
                                        <span >About</span>
                                </Button>
                            </ButtonGroup>
                        </>
                    ) : (
                        <>
                            <Button className="flex items-center gap-2 border not-first:px-4 py-1.5 rounded" sx={{ textTransform: "none" }}
                                onClick={() => props.useNav('/')}
                            >
                                <IoBackspaceOutline fontSize={20} />
                                <span>Back</span>
                            </Button> 
                        </>
                    )}  
                    <EventFormModal open={isModalOpen} onClose={handleCloseModal}/>                                                       
                </div>
            </div>        
        </div>        
    )
}

export default TopBar