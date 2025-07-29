import React from 'react'
import moment from 'moment'
import { IoAddCircleOutline } from 'react-icons/io5';





const TopBar = () => {

    const formattedDateTime = moment().format("MMMM DD, YYYY");    


    return (
        <div className='border-b px-4 mb-4 mt-0 py-4 border-stone-200'>
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className='text-lg font-bold block'>
                        Welcome User!
                    </span>
                    <span className="text-sm block text-stone-500">
                        <p>{formattedDateTime}</p>
                    </span>
                </div>               
                <div>                    
                    <button className=" border border-stone-300 flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-blue-500 px-3 py-1.5 rounded">
                        <IoAddCircleOutline/>
                        <span>Add New Event </span>
                    </button>                    
                </div>
            </div>        
        </div>
    )
}

export default TopBar