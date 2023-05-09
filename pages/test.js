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
        
        } else {
    
            setFieldTwo(await fetchData(sliderTwo, selectOptionTwo))
        }


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
                                    <input className='border border-black rounded-sm justify-center place-self-center w-16 h-5 mx-2 px-2 py-3' onChange={e => setSliderOne(e.target.value)} type='number' value={sliderOne} />

                                    <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' onChange={(e) => setSelectOptionOne(e.target.value)} name='variable_selection' id='varselect'>
                                        <option value='nominate'>DW Nominate</option>
                                        <option value='nokken_poole'>Nokken-Poole</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex w-4/5 h-4/5 m-3 justify-center place-self-center bg-white border border-black'>
                                {dataChartOne ? (
                                    <ScatterPlot data={dataChartOne} variable={selectOptionOne} />
                                ) : (
                                    <h1 className='place-self-center'>Loading...</h1>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col h-full w-full'>
                            <div className='flex justify-evenly'>
                                <div className='flex flex-row border border-black rounded-md m-1 p-2'>
                                    <input type="range" min="1" max="118" value={sliderTwo} id="sliderTwo" step='1' onChange={e => setSliderTwo(e.target.value)} />
                                    <input className='border border-black rounded-sm justify-center place-self-center w-16 h-5 mx-2 px-2 py-3' onChange={e => setSliderTwo(e.target.value)} type='number' value={sliderTwo} />

                                    <select className='border border-black rounded-md justify-center place-self-center m-2 p-1' onChange={(e) => setSelectOptionTwo(e.target.value)} name='variable_selection' id='varselect'>
                                        <option value='nominate'>DW Nominate</option>
                                        <option value='nokken_poole'>Nokken-Poole</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex h-4/5 w-4/5 m-3 bg-white justify-center place-self-center border border-black'>

                                {dataChartTwo ? (
                                    <ScatterPlot data={dataChartTwo} variable={selectOptionTwo} />
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
