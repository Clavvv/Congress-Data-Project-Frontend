import { React, useState, useEffect } from "react";


export default function VoteTable(props) {

    const voteData= props.data;

    return (

        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className='shadow overflow-auto border-b border-gray-200 sm:rounded-lg mr-24 ml-5 mb-5'>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 ">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Position
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Result
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vote Chart
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {voteData.map(vote => (
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>{vote.date}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-ellipsis">
                                            {vote.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-clip">
                                            {vote.position}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-clip">
                                            {vote.result}
                                        </td>
                                        <td className= "px-6 py-4 text-sm text-clip whitespace-nowrap">
                                            ...
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>



    )



}