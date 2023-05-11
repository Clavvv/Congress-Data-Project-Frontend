import React from 'react'
import { useState, useEffect } from 'react'
import ScatterPlot from './components/MemberScatterPlot'
import ScatPlot from './components/TestScatterPlot'
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
import _ from 'lodash'

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

    const [dataChartOne, setFieldOne] = useState();

    const [dataChartTwo, setFieldTwo] = useState();

    const [selectOptionTwo, setSelectOptionTwo] = useState('nominate')

    const [selectOptionOne, setSelectOptionOne] = useState('nominate')

    const [chartOneDate, setChartOneDate]= useState({ start: 1789, end : 1791 })

    const [chartTwoDate, setChartTwoDate]= useState({ start: 2023, end : 2025 })



    useEffect(()=> {

        updateChartData(1)

    }, [sliderOne, selectOptionOne])

    useEffect(()=> {

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

        let [chartOne, chartTwo] = await Promise.all([fetchData(sliderOne, selectOptionOne), fetchData(sliderTwo, selectOptionTwo)])


        if (chartID === 1) {
            setFieldOne(await fetchData(sliderOne, selectOptionOne))
            setChartOneDate(convertToYear(sliderOne))

        } else {
    
            setFieldTwo(await fetchData(sliderTwo, selectOptionTwo))
            setChartTwoDate(convertToYear(sliderTwo))
        }


    }

    const validateNum= (num, callback) => {

        let value= parseInt(num)

        const max= 118
        const min= 1

        if (value > max) {

            callback(max)
            return

        } else if (value < min){

            callback(min)
            return

        } else {

            callback(num)
        }

    }

    const convertToYear= (congressNum) => {

        const congressTermLen= 2
        const startYear= 1789
        const startMonth= 3
        const startDay= 4

        let start= new Date(startYear + (congressNum-1) * congressTermLen, startMonth-1, startDay)
        let end = new Date(start.getFullYear() + congressTermLen, startMonth, startDay -1)

        return { start, end }

    }


    return (
        <>

            <div className='flex flex-col h-screen w-screen'>
                <h2 className='flex m-4 p-2 h-6 w-full justify-center font-semibold'>Congressional Data Dashboard</h2>
                <div className='flex flex-col h-full w-full bg-white'>
                    <div className='flex flex-row h-2/3 w-full bg-white justify-evenly p-1 mt-10'>
                        <div className='flex flex-col h-full w-full'>
                            <div className='flex justify-evenly'>
                                <div className='flex flex-row border border-black rounded-md m-1 p-2'>
                                    <input type="range" min="1" max="118" value={sliderOne} id="sliderOne" onChange={e => setSliderOne(e.target.value)}/>
                                    <input className='border border-black rounded-sm justify-center place-self-center w-16 h-5 mx-2 px-2 py-3' onChange={e => validateNum(e.target.value, setSliderOne)} type='number' value={sliderOne} />

                                    <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' onChange={(e) => setSelectOptionOne(e.target.value)} name='variable_selection' id='varselect'>
                                        <option value='nominate'>DW Nominate</option>
                                        <option value='nokken_poole'>Nokken-Poole</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex w-4/5 h-4/5 m-3 justify-center place-self-center bg-white border border-black'>
                                {dataChartOne ? (
                                    <ScatPlot className='place-self-center' data={dataChartOne} variable={selectOptionOne} title={`${sliderOne} Congress Members ${selectOptionOne} Scores (${chartOneDate.start.getFullYear().toString()} - ${chartOneDate.end.getFullYear().toString()})`}/>
                                ) : (
                                    <h1 className='place-self-center'>Loading...</h1>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col h-full w-full'>
                            <div className='flex justify-evenly'>
                                <div className='flex flex-row border border-black rounded-md m-1 p-2'>
                                    <input type="range" min="1" max="118" value={sliderTwo} id="sliderTwo" step='1' onChange={e => setSliderTwo(e.target.value)} />
                                    <input className='border border-black rounded-sm justify-center place-self-center w-16 h-5 mx-2 px-2 py-3' onChange={e => validateNum(e.target.value, setSliderTwo)} type='number' value={sliderTwo} min="1" max="118" />

                                    <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' onChange={(e) => setSelectOptionTwo(e.target.value)} name='variable_selection' id='varselect'>
                                        <option value='nominate'>DW Nominate</option>
                                        <option value='nokken_poole'>Nokken-Poole</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex h-4/5 w-4/5 m-3 bg-white justify-center place-self-center border border-black'>

                                {dataChartTwo ? (
                                    <ScatterPlot data={dataChartTwo} variable={selectOptionTwo} title={`${sliderTwo} Congress Members ${selectOptionTwo} Scores (${chartTwoDate.start.getFullYear().toString()} - ${chartTwoDate.end.getFullYear().toString()})`} />
                                ) : (
                                    <h1 className='place-self-center'>Loading...</h1>

                                )}

                            </div>
                        </div>
                    </div>

                    <h1 className='font-semibold m-4'>Understanding The Data</h1>
                </div>
            </div>
        </>
    )
}
