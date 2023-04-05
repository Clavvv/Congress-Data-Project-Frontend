import React from "react";
import { UserData } from "../private/TestData";

export default class Please extends React.Component {

    constructor(props) {
        super(props)

        console.log(UserData.map((data) => data.year))

    }

    render() {
        return (
        <div> test </div>
        )

    }
}