import { React, useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../components/Navigation";
import sample_image from "../public/data/sample_member_image.jpg";





export default function Member({ props }) {


    const [memberInfo, setMemberInfo] = useState({ party: "Republican", name: "Johnny Crimson", district: "California District -99", biography: "Johnny Crimson was born in San Francisco California in 1921 to a family of onion farmers in the Salinas Valley. Johnny attended Cal State East Bay where he studied Philosophy and Musical Chairs.", 
                                                    votes: "Chart Coming Soon"});

    const [displayOption, setDisplayOption] = useState(0)















    let biography= <p className = 'flex border-black place-self-center justify-center mx-24 my-5' >{ memberInfo.biography }</p >

    let votesDisplay= <p className = 'flex border-black place-self-center justify-center mx-24 my-5'>{ memberInfo.votes }</p>

        





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

                            <h1 autofocus className="mt-8 font-serif indent-24 text-bold text-4xl tracking-wider font-medium place-self-start">
                                {memberInfo.name}
                            </h1>

                            <div className="flex flex-row justify-start pt-1 px-16 mt-5">

                                <button /*onClick= {setDisplayOption(0)} */  className="place-self-center focus:text-slate-950 text-gray-400 focus:underline focus:decoration-sky-600 focus:underline-offset-8 focus:decoration-4 px-3 mx-5">
                                    Biography
                                </button>

                                <button /* onClick= {setDisplayOption(1)} */ className="place-self-center focus:text-slate-950 text-gray-400 focus:underline focus:decoration-sky-600 focus:underline-offset-8 focus:decoration-4 px-3 mx-5">
                                    Votes
                                </button>

                                <button className="place-self-center focus:text-slate-950 text-gray-400 focus:underline focus:decoration-sky-600 focus:underline-offset-8 focus:decoration-4 px-3 mx-5">
                                    Compare Members
                                </button>


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

                    <div className="flex flex-col order-2">

                        {(displayOption === 0 ? biography : "Not Available" )}

                    </div>


                </div>

            </div>


        </div>


    )




}