import React, { useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router';
import { IoAddCircleOutline, IoArrowBackOutline, IoPersonCircleOutline } from 'react-icons/io5';
import EventFormModal from '~/components/EventFormModal';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { topBarProps } from '~/models/analytics-model';

const TopBar : React.FC<topBarProps> = ({activateCreate, showCreateBtn, showHomeBtn = true}) => {
   
    const formattedDateTime = moment().format("MMMM DD, YYYY");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className='border-b border-stone-300 bg-white px-4 py-3 shadow-sm'>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <div className='flex items-center gap-3'>
                        <span className='text-xl font-bold text-stone-900 lg:text-2xl'>
                            Real-Time Event Analytics Dashboard
                        </span>
                        <span className='hidden rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 lg:inline-flex items-center gap-1'>
                            <span className='h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block' />
                            Live
                        </span>
                    </div>
                    <p className="mt-0.5 text-xs text-stone-400" suppressHydrationWarning>
                        {formattedDateTime}
                    </p>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        <IoArrowBackOutline className="h-3.5 w-3.5" />
                        Portfolio
                    </Link>
                    {showCreateBtn && (
                        <>
                            <button
                                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
                                onClick={handleOpenModal}
                                disabled={activateCreate}
                            >
                                <IoAddCircleOutline className="h-3.5 w-3.5" />
                                Add New Event
                            </button>
                            <EventFormModal open={isModalOpen} onClose={handleCloseModal}/>
                        </>
                    )}
                    <Link
                        to="/about-the-developer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        <IoPersonCircleOutline className="h-3.5 w-3.5" />
                        About
                    </Link>
                </div>
            </div>        
        </div>
    );
}

export default TopBar;
