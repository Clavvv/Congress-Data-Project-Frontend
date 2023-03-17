import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from "../public/data/logo.jpg"






export default class GeoGraphs extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            data: [],
        }

    }
    async componentDidMount() {
        const res= await fetch("/api/getGeoJsonTest")
        const jsonData= await res.json()
        this.setState({data: jsonData});
    }

    render() {

        const { data } = this.state;

        return (

            <div>
                <h1>Content</h1>
            </div>


        );
    }
}