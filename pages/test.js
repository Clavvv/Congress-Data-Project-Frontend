import React from 'react'
import { useState, useEffect } from 'react'
import ScatterPlot from './components/MemberScatterPlot'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)


export default function ChartMock() {

    const [status, setStatus] = useState('default');

    const [sliderOne, setSliderOne] = useState('1');

    const [sliderTwo, setSliderTwo] = useState('118');

    const [dataChartOne, setFieldOne] = useState();

    const [dataChartTwo, setFieldTwo] = useState(null);

    function handleCompare() {
    }

    const fetchData = async (e) => {

        const apiUrl = '/api/query';

        const params = {
            congress: sliderOne,
            variable: null
        };

        try {

            const response = await axios.get(apiUrl, { params })
            const data = response.data.json()

            console.log(data)

        } catch (error) {
            console.error(error)
        }


    }


    return (
        <>

            <div className='flex flex-col h-screen w-screen'>
                <h2 className='flex m-4 p-2 h-6 w-full justify-center font-semibold'>Compare Congress Throughout History</h2>
                <div className='flex flex-col h-full w-full bg-red-100'>
                    <div className='flex flex-row h-2/3 w-full bg-gray-200 justify-evenly p-1 mt-10'>
                        <div className='flex flex-col h-full w-full'>
                            <div className='flex justify-evenly'>
                                <div className='flex flex-row border border-black rounded-md m-1 p-2'>
                                    <input type="range" min="1" max="118" value={sliderOne} id="sliderOne" onChange={e => setSliderOne(e.target.value)} />
                                    <input className='border border-black rounded-sm justify-center place-self-center w-16 h-5 mx-2 px-2 py-3' onChange={e => setSliderOne(e.target.value)} type='number' value={sliderOne} />
                                </div>
                            </div>
                            <div className='flex w-4/5 h-4/5 m-3 justify-center place-self-center bg-gray-100 border border-black'>
                                <h1 className='place-self-center'>Graph 1</h1>
                            </div>
                        </div>
                        <div className='flex flex-col h-full w-full'>
                            <div className='flex justify-evenly'>
                                <div className='flex flex-row border border-black rounded-md m-1 p-2'>
                                    <input type="range" min="1" max="118" value={sliderTwo} id="sliderTwo" step='1' onChange={e => setSliderTwo(e.target.value)} />
                                    <input className='border border-black rounded-sm justify-center place-self-center w-16 h-5 mx-2 px-2 py-3' onChange={e => setSliderTwo(e.target.value)} type='number' value={sliderTwo} />
                                </div>
                            </div>
                            <div className='flex h-4/5 w-4/5 m-3 bg-blue-100 justify-center place-self-center border border-black'>

                                <h1 className='place-self-center'>Graph 2</h1>

                                {/*{this.state.data ? (
                                    <ScatterPlot data={this.state.data} chartTitle="Congress 118 Member DW_Nominate Scores" />
                                ) : (
                                    <p>Loading...</p>
                                )}*/}

                            </div>
                        </div>
                    </div>
                    <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' name='variable_selection' id='varselect'>
                        <option value='nominate'>DW Nominate</option>
                        <option value='nokken_poole'>Nokken-Poole</option>
                    </select>
                    <button className='border justify-center place-self-center border-black rounded-md w-32' onClick={fetchData}> Compare </button>
                </div>
            </div>
        </>
    )
}
