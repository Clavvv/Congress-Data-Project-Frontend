import React from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'

export default class DistrictMap extends React.Component {
    constructor(props) {
        super(props)

        const { geoData }= this.props

        this.state= {
            geoDistrict: geoData,

        }
        this.onDistrictHover= this.onDistrictHover.bind(this)
    }

    onDistrictHover(e) {
        const layer= e.target
        layer.bindTooltip(`District_id: ${layer.feature.properies.p_id}`).openTooltip()
    }

    render() {

        const { geoDistrict }= this.state
        return (
            <MapContainer center={[39.5, -98.5]} zoom={4}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {geoDistrict && (
                    <GeoJSON 
                        data={this.state.geoDistrict}
                        style= {{ fillColor: '#fff', color: '#000' }}
                        onEachFeature= {(feature, layer) => {
                            layer.on('mouseover', this.onDistrictHover)
                        }}/>
                )}
            </MapContainer>
        )
    }
}
