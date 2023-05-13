import React from 'react'
import { useState, useEffect } from 'react'
import ScatPlot from './components/ScatterPlot'
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


export default function ChartMock({ props }) {

    const [sliderOne, setSliderOne] = useState('118');

    const [sliderTwo, setSliderTwo] = useState('118');

    const [dataChartOne, setFieldOne] = useState(null);

    const [dataChartTwo, setFieldTwo] = useState(null);

    const [selectOptionTwo, setSelectOptionTwo] = useState('nominate')

    const [selectOptionOne, setSelectOptionOne] = useState('nominate')

    const [chartOneDate, setChartOneDate] = useState({ start: 1789, end: 1791 })

    const [chartTwoDate, setChartTwoDate] = useState({ start: 2023, end: 2025 })



    useEffect(() => {



        updateChartData(1)


    }, [sliderOne, selectOptionOne])

    useEffect(() => {
        
        updateChartData(2)


    }, [sliderTwo, selectOptionTwo])


    const fetchData = async (congArg, varArg) => {

        const apiUrl = '/api/query';

        const params = {
            congress: congArg,
            variable: varArg,
        };

        try {

            let response = await axios.get(apiUrl, { params })
            let data = response.data

            return data;

        } catch (error) {
            console.error(error)
        }


    }

    const updateChartData = async (chartID) => {

        if (chartID === 1) {
            setFieldOne(await fetchData(sliderOne, selectOptionOne))
            setChartOneDate(convertToYear(sliderOne))

        } else {

            setFieldTwo(await fetchData(sliderTwo, selectOptionTwo))
            setChartTwoDate(convertToYear(sliderTwo))
        }


    }

    const validateNum = (num, callback) => {

        let value = parseInt(num)

        const max = 118
        const min = 1

        if (value > max) {

            callback(max)
            return

        } else if (value < min) {

            callback(min)
            return

        } else {

            callback(num)
        }

    }

    const convertToYear = (congressNum) => {

        const congressTermLen = 2
        const startYear = 1789
        const startMonth = 3
        const startDay = 4

        let start = new Date(startYear + (congressNum - 1) * congressTermLen, startMonth - 1, startDay)
        let end = new Date(start.getFullYear() + congressTermLen, startMonth, startDay - 1)

        return { start, end }

    }

    const nominate_redirect= 
    <a 
        href= 'https://en.wikipedia.org/wiki/NOMINATE_(scaling_method)' 
        className='hover:underline hover:decoration-sky-600 hover:decoration-2 hover:underline-offset-4'>
        NOMINATE
    </a>
    
    const nokken_redirect= 
    <a 
        href= "https://onlinelibrary.wiley.com/doi/abs/10.3162/036298004X201294" 
        className='hover:underline hover:decoration-sky-600 hover:decoration-2 hover:underline-offset-4'>
        Nokken-Poole
     </a>

    return (
        <>

            <div className='flex flex-col h-screen w-screen bg-slate-100'>
                <h2 className='flex h-10 w-full justify-center font-semibold bg-slate-200'>Navigation Bar</h2>
                <div className='flex flex-col place-self-center h-full w-3/4 bg-white drop-shadow-lg mb-4'>
                    <div className='flex flex-row h-full w-full bg-white justify-center place-self-center p-1 mt-10 mb-5'>
                        <div className='flex flex-col h-full w-full items-end'>
                            <div className='flex justify-evenly'>
                                <div className='flex flex-row border border-black rounded-md mr-3 p-2'>
                                    <input type="range" min="1" max="118" value={sliderOne} id="sliderOne" onChange={e => setSliderOne(e.target.value)} />
                                    <input className='border border-black rounded-sm justify-center place-self-center w-16 h-5 mx-2 px-2 py-3' onChange={e => validateNum(e.target.value, setSliderOne)} type='number' value={sliderOne} />

                                    <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' onChange={(e) => setSelectOptionOne(e.target.value)} name='variable_selection' id='varselect'>
                                        <option value='nominate'>DW Nominate</option>
                                        <option value='nokken_poole'>Nokken-Poole</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex w-4/5 h-96 m-3 justify-end bg-white border border-black'>
                                {dataChartOne ? (
                                    <ScatPlot data={dataChartOne} variable={selectOptionOne} title={`${sliderOne} Congress Members ${selectOptionOne} Scores (${chartOneDate.start.getFullYear().toString()} - ${chartOneDate.end.getFullYear().toString()})`} />
                                ) : (
                                    <h1 className='place-self-center'>Loading...</h1>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col h-full w-full items-start'>
                            <div className='flex justify-evenly'>
                                <div className='flex flex-row border justify-start border-black rounded-md ml-3 p-2'>
                                    <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' onChange={(e) => setSelectOptionTwo(e.target.value)} name='variable_selection' id='varselect'>
                                        <option value='nominate'>DW Nominate</option>
                                        <option value='nokken_poole'>Nokken-Poole</option>
                                    </select>
                                    <input type="range" min="1" max="118" value={sliderTwo} id="sliderTwo" step='1' onChange={e => setSliderTwo(e.target.value)} />
                                    <input className='border border-black rounded-sm justify-center place-self-center w-16 h-5 mx-2 px-2 py-3' onChange={e => validateNum(e.target.value, setSliderTwo)} type='number' value={sliderTwo} min="1" max="118" />

                                </div>
                            </div>
                            <div className='flex h-96 w-4/5 m-3 bg-white justify-start border border-black'>

                                {dataChartTwo ? (
                                    <ScatPlot data={dataChartTwo} variable={selectOptionTwo} title={`${sliderTwo} Congress Members ${selectOptionTwo} Scores (${chartTwoDate.start.getFullYear().toString()} - ${chartTwoDate.end.getFullYear().toString()})`} />
                                ) : (
                                    <h1 className='place-self-center'>Loading...</h1>

                                )}

                            </div>
                        </div>
                    </div>
                    <div className='order-2 h-full w-2/3 place-self-center'>
                        <h1 className='text-xl font-semibold text-start mx-6 mb-2 underline decoration-slate-950'> Understanding the Data</h1>
                        <p className='text-justify tracking-wide mx-5 px-1 text-slate-950 leading-relaxed'>
                            The {nominate_redirect} ideology measurement and the {nokken_redirect} model provide two primary estimates for assessing a legislator's 
                            ideology. {nominate_redirect} assumes a static ideological position over a legislator's career, while {nokken_redirect}
                            treats each congressional session as separate, capturing evolving ideologies. Both methods are widely used in 
                            political science research and offer valuable insights into legislators' beliefs.</p>
                    </div>

                </div>
            </div>
        </>
    )
}
