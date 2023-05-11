import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default class ScatterPlot extends React.Component {

  constructor(props) {
    super(props)

    this.state= {
      title: '',
      variable: this.props.variable

    }


  }

  render() {


    const data = {
      datasets: [
        {
          label: null,
          data: this.props.data.map((x) => ({ x: x.variable_dim1, y: x.variable_dim2, party: x.party === '100' ? 'Democrat' : 'Republican', name: x.name })),
          borderColor: 'black',
          pointBackgroundColor: this.props.data.map((x) => x.party === '200' ? 'red' : 'blue'),
          borderWidth: 1,
          pointRadius: 2,
          pointHoverRadius: 4,
        },
      ],
    };

    const options = {
      interation: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        x: {
          title: {
            display: true,
            text: `${this.props.variable} Dimension 1`,
            font: {
              size: 18,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: `${this.props.variable} Dimension 2`,
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
              const labelData = tooltipItem.dataset.data[tooltipItem.dataIndex]
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

          <h1 className='font-semibold text-lg m-3 p-2'>{`${this.props.title}`}</h1>
          <Scatter className='justify-center place-self-center' data={data} options={options} />

      </div>



    )
  }
}