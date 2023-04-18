import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default class ScatterPlot extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const data = {
      datasets: [
        {
          label: 'Political Ideological Tendencies of US Congress Members',
          data: this.props.data.map((x) => ({x: x.nominate_dim1, y: x.nominate_dim2, party: x.party === '100' ? 'Democrat' : 'Republican', name: x.name})),
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
              text: 'Nominate Dimension 1',
              font: {
                size: 18,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: 'Nominate Dimension 2',
              font: {
                size: 18,
              },
            },
          },
        },
        plugins: {
          legend:{
            display: true,
          },
          tooltip: {
            callbacks: {
              title: function(tooltipItem) {
                return 'Representative'
              },
              label: function(tooltipItem) {
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

    return <Scatter data={data} options={options} />;
  }
}