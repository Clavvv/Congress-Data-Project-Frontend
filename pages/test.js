import React from 'react'
import DistrictMap from './components/Map'


export default class TestPage extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
        }

    }


    render() {

        return (

            <div>
                <districtMap geoData= {this.props.geoData}/>
            </div>



        );
    }
}

export async function getServerSideprops() {
    const response= await fetch('/api/getMultipolygons')
    const data= await response.json()
    return { props: { geoData: data } }

}