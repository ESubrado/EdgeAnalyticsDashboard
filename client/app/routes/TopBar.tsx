import React, { useState } from 'react'
import moment from 'moment'
import { IoAddCircleOutline } from 'react-icons/io5';
import EventFormModal from '~/components/EventFormModal';
import type { topBarProps } from '~/models/analytics-model';

const TopBar : React.FC<topBarProps> = ({activateCreate}) => {
   
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
                        <span className='text-2xl lg:text-4xl font-bold text-stone-50'>
                            Real-Time Event Analytics Dashboard
                        </span>
                        <span className='lg:px-2 md:pt-4 text-sm text-stone-50'>by: Eugene Subrado Jr</span>
                    </div>                    
                    <span className="text-sm block text-stone-50">
                        <p>Today is {formattedDateTime}</p>
                    </span>
                </div>               
                <div className='pt-3 flex justify-self-center lg:justify-end'>                    
                    <button className="border border-stone-300 text-sm flex items-center gap-2 bg-stone-100 transition-colors hover:bg-blue-500 px-3 py-1.5 rounded"
                        onClick={handleOpenModal} disabled={activateCreate}
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