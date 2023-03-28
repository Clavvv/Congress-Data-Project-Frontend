import React from 'react'
import testChart from 'components/testChart.js'
import {Bar} from 'react-chartjs-2'



export default function MyApp() {

    const fetchDataPreview = async () => {
        try {
            const res = await fetch('/api/getGeoJsonTest')
            const data = await res.json()
            return data

        } catch (error) {
            console.error('Error', error)
        }
    }

    const chartConfig= {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    const data= fetchDataPreview();
        




    return (

        <div className='flex h-screen w-screen'>
            <div className='h-full w-full'>
                <div className='flex flex-col h-full col-span-6 justify-center bg-red-300'>
                    <table className='mx-auto border border-slate-500 border-collapse'>
                        <thead className='border border-separate border-slate-500'>
                            <tr>
                                <th className='border border-separate border-slate-500 p-2'>Company</th>
                                <th className='border border-collapse border-slate-500 p-2'>Contact</th>
                                <th className='border border-collapse border-slate-500 p-2'>Country</th>
                            </tr>
                        </thead>
                        <tbody className='border border-separate border-slate-500'>
                            <tr>
                                <td className='border border-collapse border-slate-500 p-2'>Company A</td>
                                <td className='border border-collapse border-slate-500 p-2'>Maria A</td>
                                <td className='border border-collapse border-slate-500 p-2'>Germany</td>
                            </tr>
                            <tr>
                                <td className='border border-collapse border-slate-500 p-2'>Company B</td>
                                <td className='border border-collapse border-slate-500 p-2'>Francisco Chang</td>
                                <td className='border border-collapse border-slate-500 p-2'>Mexico</td>
                            </tr>
                        </tbody>
                    </table>

                    <button className='m-2 p-1 self-center justify-center rounded border-2 border-black bg-white'>Show Graph</button>

                </div>
            </div>
        </div>

    );
}