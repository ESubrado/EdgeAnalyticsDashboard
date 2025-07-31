import React, { useState } from 'react'
import moment from 'moment'
import { IoAddCircleOutline } from 'react-icons/io5';
import EventFormModal from '~/components/EventFormModal';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const TopBar = () => {

    const formattedDateTime = moment().format("MMMM DD, YYYY");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='border-b px-4 mb-2 mt-0 py-2 border-stone-200'>
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className='text-lg font-bold block'>
                        Welcome To Event Analytics Dashboard!
                        <span className='px-2 text-xs text-stone-500'>by: Eugene Subrado Jr</span>
                    </span>
                    <span className="text-sm block text-stone-500">
                        <p>Today is {formattedDateTime}</p>
                    </span>
                </div>               
                <div>                    
                    <button className=" border border-stone-300 flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-blue-500 px-3 py-1.5 rounded"
                        onClick={handleOpenModal}
                    >
                        <IoAddCircleOutline/>
                        <span>Add New Event </span>
                    </button>                     
                    <EventFormModal open={isModalOpen} onClose={handleCloseModal}/>                                                       
                </div>
            </div>        
        </div>
    )
}

export default TopBar