import React from 'react'
import { useState } from 'react'
import ScatterPlot from './components/MemberScatterPlot';

export default function ChartMock() {

    const [field_one, setFieldOne] = useState(null);

    const [field_two, setFieldTwo] = useState(null);

    const [status, setStatus] = useState('default');




    return (
        <>

            <div className='flex flex-col h-screen w-screen'>

                <h2 className='flex m-4 p-2 h-6 w-full justify-center font-semibold'>Compare Congress Throughout History</h2>

                <div className='flex flex-col h-full w-full bg-red-100'>

                    <div className='flex flex-row h-2/3 w-full bg-gray-200 justify-evenly p-1'>

                        <div className='flex flex-col h-full w-full'>


                            <div className='flex justify-evenly'>
                                <input type="range" min="1780" max="2023" value="50" id="myRange" />

                                <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' name='cum' id='cum2'>
                                    <option value='Option 1'>Option 1</option>
                                    <option value='Option 2'>Option 2</option>
                                    <option value='Option 3'>Option 3</option>
                                    <option value='Option 4'>Option 4</option>
                                </select>
                            </div>

                            <div className='flex w-4/5 h-4/5 m-3 justify-center place-self-center bg-gray-100 border border-black'>
                                <h1 className='place-self-center'>Graph 1</h1>
                            </div>
                        </div>

                        <div className='flex flex-col h-full w-full'>
                        <div className='flex justify-evenly'>
                            <input type="range" min="1780" max="2023" value="50" id="myRange" />

                            <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' name='cum' id='cum2'>
                                <option value='Option 1'>Option 1</option>
                                <option value='Option 2'>Option 2</option>
                                <option value='Option 3'>Option 3</option>
                                <option value='Option 4'>Option 4</option>
                            </select>
                        </div>

                        <div className='flex h-4/5 w-4/5 m-3 bg-blue-100 justify-center place-self-center border border-black'>
                            <h1 className='place-self-center'>Graph 2</h1>

                        </div>
                    </div>

                </div>
                <button className='border justify-center place-self-center border-black rounded-md w-32'> Compare </button>
            </div>








        </div>



        </>
    )


}
