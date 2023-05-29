import React from 'react'


export default class toggleButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: true
        }
    }

    render() {
        return (

        <button className= 'm-2 p-1 self-center justify-center rounded border-2 border-black bg-white'></button>

        )
    }
}