import React from 'react'
import { resolve } from 'path'
import { Bar } from 'react-chartjs-2'
import BarChart from './components/BarChart'
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

        const labels= this.props.data.map((data)=> data.month)

        const data= {
            labels,
            datasets: [
                {
                    label: 'Congressional Votes by Month Since 2014',
                    data: this.props.data.map((data)=> data.count),
                    backgroundColor: 'rgba(255, 99, 132, 0.5',
                    borderColor: 'black',
                    borderWidth: 2,
                },
            ],

        }
        this.state= {
            data: data,
        }
    }

    render() {

        return (


            <div className='flex h-screen w-screen'>
                <div className='h-full w-full'>
                    <div className='flex flex-col h-full col-span-6 justify-center bg-white'>
                        <div className='justify-center place-items-center'>
                            <BarChart chartData={this.state.data}/>
                        </div>


                    </div>
                </div>
            </div>





        )
    }


}

export async function getServerSideProps() {

    const { Pool } = require('pg');
    const config = require('private/config.json')

    const pool = new Pool({
        user: config.user,
        password: config.password,
        host: config.host,
        database: config.database,
        port: config.port,
        idleTimeoutMillis: 30000,
        connectiontimeoutMillis: 2000,
        max: 10
    })

    const results= await pool
        .query("SELECT TO_CHAR(DATE_TRUNC('month', house_roll_call.date), 'MM') as month, count(*) as count from house_roll_call group by month;")


    results.rows.forEach(function(obj) {
        obj.month= parseInt(obj.month)
    })

    const monthName= ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October",
                    "November", "December"]

    results.rows.sort((a, b) => a.month - b.month)

    const formatData= results.rows.map(x => {
        return { month: monthName[x.month - 1], count: x.count }
    })

    return {props: { data: formatData }}
}