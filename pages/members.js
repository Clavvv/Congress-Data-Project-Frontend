import { React, useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../components/Navigation";
import sample_image from "../public/data/sample_member_image.jpg";
import axios from "axios";
import SearchLandingPage from "../components/memberSearch";
import api_keys from 'private/api_keys.json' assert {type: 'json'};






export default function Member(props) {

    const reformatVotes = (voteObj) => {
        let arr = [];

        for (let i = 0; i < 20; i++) {

            arr.push(voteObj[i.toString()])

        }

        return arr;
    }
    const [memberInfo, setMemberInfo] = useState({
        party: "Republican", name: "Johnny Crimson", district: "California District -99", biography: "Johnny Crimson was born in San Francisco California in 1921 to a family of onion farmers in the Salinas Valley. Johnny attended Cal State East Bay where he studied Philosophy and Musical Chairs.",
        votes: "Chart Coming Soon"
    });

    const [voteData, setVoteData] = useState(reformatVotes(props.vote_data.votes));

    const [displayOption, setDisplayOption] = useState(0);

    const [recentVoteActivity, setRecentVoteActivity] = useState(null);

    let biographyDisplay = <p className='flex border-black place-self-center justify-center mx-24 my-5' >{memberInfo.biography}</p>;

    let votesDisplay =
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
                                    <tr key={vote.date}>
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

    let errorDisplay = <p className='flex border-black place-self-center justify-center mx-24 my-5'> Not Available</p>;

    const defaultPage = props.data;

    if (defaultPage == false) {

        return (<SearchLandingPage />)


    } else {
        return (
            <div className='flex flex-col h-screen w-screen bg-white'>

                <NavBar />

                <div className='flex flex-col h-full w-3/5 drop-shadow-lg bg-slate-50 place-self-center p-1 mb-5'>

                    <div className='flex flex-row'>
                        <div className='flex flex-row h-full w-full'>

                            <div className="flex flex-grow h-64 w-64 ml-5 mt-5 bg-slate-50 drop-shadow-lg justify-center">

                                <Image src={sample_image} className="place-self-center border-black border rounded-full" />

                            </div>
                            <div className="flex flex-col h-1/2 bg-slate-50 pr-5 mt-20 w-full justify-center drop-shadow-lg">

                                <h1 className="mt-8 font-serif indent-24 text-bold text-4xl tracking-wider font-medium place-self-start">
                                    {memberInfo.name}
                                </h1>

                                <div className="flex flex-row justify-start pt-1 px-16 mt-5">

                                    {(displayOption == 0) ?

                                        <button onClick={e => setDisplayOption(0)} className="place-self-center text-slate-950 underline decoration-sky-600 underline-offset-8 decoration-4 px-3 mx-5"> Biography</button>
                                        :
                                        <button onClick={e => setDisplayOption(0)} className="place-self-center text-gray-400 px-3 mx-5"> Biography</button>}

                                    {(displayOption == 1) ?
                                        <button onClick={e => setDisplayOption(1)} className="place-self-center text-slate-950 underline decoration-sky-600 underline-offset-8 decoration-4 px-3 mx-5">Vote</button>
                                        :
                                        <button onClick={e => setDisplayOption(1)} className="place-self-center text-gray-400 px-3 mx-5"> Votes</button>}

                                    {(displayOption == 2) ?
                                        <button onClick={e => setDisplayOption(2)} className="place-self-center text-slate-950 underline decoration-sky-600 underline-offset-8 decoration-4 px-3 mx-5">Compare Members</button>
                                        :
                                        <button onClick={e => setDisplayOption(2)} className="place-self-center text-gray-400 px-3 mx-5"> Compare Members</button>}



                                </div>


                            </div>
                        </div>


                    </div>


                    <div className="flex flex-row justify-start gap-10 mx-2">

                        <div className="flex flex-col order-1 mx-5 my-5 gap-2">

                            <h2 className="text-xl font-semibold">
                                Contact
                            </h2>

                            <div className="flex flex-col gap-1">

                                <h3>
                                    Twitter
                                </h3>
                                <p className="text-sm text-gray-500">
                                    @Handle
                                </p>

                            </div>

                            <div className="flex flex-col gap-1">

                                <h3>
                                    Phone
                                </h3>

                                <p className="text-sm text-gray-500">
                                    +1 (999) 999-9999
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">

                                <h3 className="">
                                    Email
                                </h3>

                                <p className="text-sm text-gray-500">
                                    some_email@email.gov
                                </p>

                            </div>


                        </div>

                        <div className="flex flex-col overscroll-contain order-2">

                            {(displayOption == 0 ? biographyDisplay : displayOption == 1 ? votesDisplay : errorDisplay)}

                        </div>


                    </div>

                </div>


            </div>

        )
    }




}


export async function getServerSideProps(context) {

    const member_id = (context.query.member_id != undefined) ? context.query.member_id : false;

    if (!member_id) {

        return { props: { data: false } };

    } else {

        const API_URL = `https://api.propublica.org/congress/v1/members/${member_id}/votes.json`;

        const api_config = {
            headers: { "X-API-Key": api_keys.key }
        };

        let response = await (await axios.get(API_URL, api_config)).data.results

        return { props: { vote_data: response[0] } };

    }
}