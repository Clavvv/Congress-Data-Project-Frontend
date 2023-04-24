import React from 'react'
import { useState } from 'react'
import ScatterPlot from './components/MemberScatterPlot';

export default function ChartMock() {

    const [field_one, setFieldOne] = useState('');

    const [field_two, setFieldTwo] = useState('');

    const [status, setStatus] = useState('default');


    return (
        <>

            <div className='flex flex-col h-screen w-screen'>

                <h2 className='flex m-1 p-4 h-6 w-full justify-center font-semibold'>Compare Congress Throughout History</h2>

                <div className='flex grid h-full w-full bg-red-100 justify-items-evenly m-4'>

                        <div className='flex w-1/2 h-3/5 m-3 justify-center place-self-center bg-gray-100 border border-black'>
                            <h1 className='place-self-center'>Graph 2</h1>
                        </div>

                        <div className='flex h-3/5 w-1/2 m-3 bg-blue-100 justify-center place-self-center border border-black'>
                            <h1 className='place-self-center'>Graph 1</h1>
                        </div>
                    </div>

                <button className='border justify-center place-self-center border-black rounded-md w-32'> Compare </button>




            </div>



        </>
    )


}
