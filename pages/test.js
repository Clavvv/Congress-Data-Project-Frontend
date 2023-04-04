import React, { useState, useEffect } from 'react'
import BarChart from './components/BarChart'







export default class TestPage extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
        }

    }

    render() {

        return (

            <div>
                <BarChart />
            </div>



        );
    }
}