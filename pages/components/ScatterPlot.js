import React, { useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'


export default function ScatPlot( props ) {


    const router= useRouter()
    const PartyColor= require('public/data/party_code.json')

    const handlePointClick= (event, elements) => {

        if (elements.length) {

            const clickedElement= elements[0]

            const index= clickedElement.index

            const clickedDataPoint= data.datasets[0].data[index]

            const pointName= clickedDataPoint.name

            const someUrl= `https://letmegooglethat.com/?q=${pointName.replace(' ','+')}`

            router.push(someUrl)



        }

    }


    const data = {

        datasets: [
            {
                data: props.data.map((x) => ({ x: x.variable_dim1, y: x.variable_dim2, party: PartyColor[x.party].party, name: x.name })),
                borderColor: 'black',
                pointBackgroundColor: props.data.map((x) => PartyColor[x.party].color),
                borderWidth: 1,
                pointRadius: 2.3,
                pointHoverRadius: 4,

            }
        ]
    }

    const options= {

        onClick: handlePointClick,

        aspectRatio:1.75,
        interaction: {
            intersect: true
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: `Dimension 1`,
                    font: {
                        size: 18,
                    },
                },
            } ,
            y: {
                title: {
                    display: true,
                    text: `Dimension 2`,
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

          <h1 className='font-semibold text-md m-3 p-2'>{`${props.title}`}</h1>
          <Scatter className='justify-center place-self-center' data={data} options={options}/>

      </div>
    )








}