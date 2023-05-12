import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

export default function ScatPlot( props ) {


    const PartyColor= require('public/data/party_code.json')

    const data = {

        datasets: [
            {
                data: props.data.map((x) => ({ x: x.variable_dim1, y: x.variable_dim2, party: PartyColor[x.party].party, name: x.name })),
                borderColor: 'black',
                pointBackgroundColor: props.data.map((x) => PartyColor[x.party].color),
                borderWidth: 1,
                pointRadius: 3,
                pointHoverRadius: 4,

            }
        ]
    }

    const options= {
        interaction: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: `${props.variable} Dimension 1`,
                    font: {
                        size: 18,
                    },
                },
            } ,
            y: {
                title: {
                    display: true,
                    text: `${props.variable} Dimension 2`,
                    font: {
                        size: 18,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: function (tooltipItem) {
                        return 'Representative'
                    },
                    label: function (tooltipItem) {
                        const labelData= tooltipItem.dataset.data[tooltipItem.dataIndex]
                        return `${labelData.name} (${labelData.party}): ${labelData.x}, ${labelData.y}`
                    },
                },
                font: {
                    size: 1,
                },
            },
        },
    }

    return (
        <div className='flex flex-col items-center h-full w-full'>

          <h1 className='font-semibold text-lg m-3 p-2'>{`${props.title}`}</h1>
          <Scatter className='justify-center place-self-center' data={data} options={options}/>

      </div>
    )








}