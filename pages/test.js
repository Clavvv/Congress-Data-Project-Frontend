import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from "../public/data/logo.jpg"






export default class GeoGraphs extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            data: [],
            count: 0
        }

        this.handleClick = this.handleClick.bind(this)
        this.resetCounter = this.resetCounter.bind(this)

    }

    handleClick() {
        this.setState({ count: this.state.count + 1})
    }

    resetCounter() {
        this.setState({count: 0})
    }



    render() {

        return (

            <div className= 'justify-center place-items-certer'>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleClick}>Increment</button>
                <button onClick={this.resetCounter}>Reset</button>
            </div>


        );
    }
}