import React from 'react'

export default function hrTable({theadData, tbodyData}) {
    return (
        <table>
            <thead>
                <tr>
                    {theadData.map(headign => {
                        return <th key={heading}>{heading}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}></tr>
                })}
            </tbody>

        </table>
    )
}