import React from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register()


export default class Data extends React.Component {

    constructor(props) {
        super(props);

        this.toggleGraph = this.toggleGraph.bind(this)

        this.state = {
            data: null

        }
    }

    toggleGraph(e) {
        e.preventDefault();
        this.fetchDataPreview()
            .then(data => {
                this.setState({ data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    fetchDataPreview = async () => {
        try {
            const res = await fetch('/api/getGeoJsonTest')
            const data = await res.json()
            return data

        } catch (error) {
            console.error('Error', error)
        }
    }






    render() {
        const someData= this.fetchDataPreview()
        const options= null


        const noChart =

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

                        <button className='m-2 p-1 self-center justify-center rounded border-2 border-black bg-white' onClick={(event) => this.toggleGraph(event)}>Show Graph</button>

                        
                    </div>
                </div>
            </div>


        const chart =
            <Bar
                data={this.state.data}
                options={options}>

            </Bar>

        return (

            <div>

                {noChart}
                {chart}
                


            </div>




        )
    }


}