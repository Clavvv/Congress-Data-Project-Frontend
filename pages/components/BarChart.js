import React from 'react'
import { Bar } from 'react-chartjs-2'

export default class BarChart extends React.Component {

    constructor(props) {
        super(props)

        this.state= {

        }

    }

    render() {
        return (
            <Bar data={this.props.chartData} options= {}/>
        )
    }

}