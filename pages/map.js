import React from 'react'
import L from 'leaflet'
import getMultipolygons from '../utils/getMultipolygons'


export default class Map extends React.Component {

    constructor(prop) {
        super(props)

        this.mapRef= React.createRef()

    }

    componentDidMount() {
        this.map= L.map(this.mapRef.current).setView([this.props.lat, this.props.lng], this.props.zoom)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(this.map)

    getMultipolygons().then((multipolygons) => {
        multipolygons.forEach(({id, cd_id, geojson}))
    })
    }

    render() {
        return (
            <div className='h-64 w-full' ref={this.mapRef}></div>
        )
    }





}