import React, { useState, useEffect } from 'react'
import BarChart from './components/BarChart'
import {UserData} from 'private/TestData.js'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)



const labels= [1999, 2000, 2001, 2002, 2003]

const data= {
    labels,
    datasets: [
        {label: 'users',
        data: UserData.map((data)=> data.users),
        backgroundColor: 'rgba(255, 99, 132, 0.5',
        borderColor: 'black',
        borderWidth: 2,
        },
    ],
}







export default class TestPage extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
        }

    }


    render() {

        return (

            <div>
                <BarChart chartData={data}/>
            </div>



        );
    }
}