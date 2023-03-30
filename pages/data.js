import React from 'react'
import { resolve } from 'path'
import { Bar } from 'react-chartjs-2'
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


export default class Data extends React.Component {

    constructor(props) {
        super(props);

        this.toggleGraph = this.toggleGraph.bind(this)

        this.state = {
            data: this.props.data

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


        var dataset= {
            label: 'Alex Rodriguez hits the baseball this many times',
            data: this.state.data

        }

        var options= {
            responsive: true

            }

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
                data={dataset}
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

export async function getServerSideProps() {

    const { Pool } = require('pg');
    const config = require('private/config.json')

    const pool = new Pool({
        user: config.database_configuration.user,
        password: config.database_configuration.password,
        host: config.database_configuration.host,
        database: config.database_configuration.database,
        port: config.database_configuration.port,
        idleTimeoutMillis: 30000,
        connectiontimeoutMillis: 2000,
        max: 10
    })

    const results= await pool
        .query('SELECT * FROM alexrodhomerun;')


    for (let i= 0; i < results.rows.length; i++) {
        results.rows[i]['homeruns']= Number(results.rows[i]['homeruns'])
    }

    return {props: { data: results.rows }}
    
        /*.then((result) => {
            const results = result.rows.map(row => {
                return {props: {
                    "home_runs": row.HR,
                    "year": row.Year
                } };
            });*/
            /*const json = JSON.stringify(results);
            return {props: { json } }
        })
        .catch((err) => {
            console.error('Error executing query...', err.stack);
            return {props: { 'False': 0 } }
        });*/
}

