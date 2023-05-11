import React from 'react'
import { Scatter } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

export default function ScatPlot( raw_data, variable, title ) {


    console.log()



    const PartyColor = {
        "100": {
            "party": "Democratic Party",
            "color": '#3b63c7'

        },
        "200": {
            "party": "Republican Party",
            "color": "#be3434"

        },
        "1": {
            "party": "Federalist Party",
            "color": "#e6194b"
        },
        "13": {
            "party": "Democratic-Republican Party",
            "color": "#3cb44b"
        },
        "22": {
            "party": "Adams Party",
            "color": "#ffe119"
        },
        "26": {
            "party": "Anti Masonic Party",
            "color": "#0082c8"
        },
        "29": {
            "party": "Whig Party",
            "color": "#f58231"
        },
        "37": {
            "party": "Constitutional Unionist Party",
            "color": "#911eb4"
        },
        "44": {
            "party": "Nullifier Party",
            "color": "#46f0f0"
        },
        "46": {
            "party": "States Rights Party",
            "color": "#f032e6"
        },
        "108": {
            "party": "Anti-Lecompton Democrats",
            "color": "#d2f53c"
        },
        "112": {
            "party": "Conservative Party",
            "color": "#fabebe"
        },
        "114": {
            "party": "Readjuster Party",
            "color": "#008080"
        },
        "117": {
            "party": "Readjuster Democrats",
            "color": "#e6beff"
        },
        "203": {
            "party": "Unconditional Unionist Party",
            "color": "#aa6e28"
        },
        "206": {
            "party": "Unionist Party",
            "color": "#fffac8"
        },
        "208": {
            "party": "Liberal Republican Party",
            "color": "#800000"
        },
        "213": {
            "party": "Progressive Republican Party",
            "color": "#aaffc3"
        },
        "300": {
            "party": "Free Soil Party",
            "color": "#808000"
        },
        "310": {
            "party": "American Party",
            "color": "#ffd8b1"
        },
        "326": {
            "party": "National Greenbacker Party",
            "color": "#000075"
        },
        "340": {
            "party": "Populist PARTY",
            "color": "#a9a9a9"
        },
        "347": {
            "party": "Prohibitionist Party",
            "color": "#ffffff"
        },
        "354": {
            "party": "Silver Republican Party",
            "color": "#000000"
        },
        "355": {
            "party": "Union Labor Party",
            "color": "#f58231"
        },
        "356": {
            "party": "Union Labor Party",
            "color": "#f58231"
        },
        "370": {
            "party": "Progressive Party",
            "color": "#e6194b"
        },
        "380": {
            "party": "Socialist Party",
            "color": "#3cb44b"
        },
        "402": {
            "party": "Liberal Party",
            "color": "#ffe119"
        },
        "403": {
            "party": "Law and Order Party",
            "color": "#0082c8"
        },
        "522": {
            "party": "American Labor Party",
            "color": "#f032e6"
        },

    }

    


    const data = {

        datasets: [
            {
                data: raw_data.data.map((x) => ({ x: x.variable_dim1, y: x.variable_dim2, party: PartyColor[x.party].party })),
                borderColor: 'black',
                pointBackGroundColor: raw_data.data.map((x) => PartyColor[x.party].color),
                borderWidth: 1,
                pointRadius: 2,
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
                    text: `${variable} Dimension 1`,
                    font: {
                        size: 18,
                    },
                },
            } ,
            y: {
                title: {
                    display: true,
                    text: `${variable} Dimension 2`,
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

          <h1 className='font-semibold text-lg m-3 p-2'>{`${title}`}</h1>
          <Scatter className='justify-center place-self-center' data={data} options={options}/>

      </div>
    )








}