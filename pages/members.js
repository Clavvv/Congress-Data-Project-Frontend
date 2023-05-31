import { React, useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../components/Navigation";
import sample_image from "../public/data/sample_member_image.jpg";
import axios from "axios";





export default function Member({ props }) {


    const [memberInfo, setMemberInfo] = useState({ party: "Republican", name: "Johnny Crimson", district: "California District -99", biography: "Johnny Crimson was born in San Francisco California in 1921 to a family of onion farmers in the Salinas Valley. Johnny attended Cal State East Bay where he studied Philosophy and Musical Chairs.", 
                                                    votes: "Chart Coming Soon"});

    const [displayOption, setDisplayOption] = useState(0)



    const fetchBio= async (someState, currMember) => {



        const apiUrl= '/api/memberQuery';

        const params= {

            id: currMember,

        };


        try {
            let response= await axios.get(apiUrl, { params });
            let data= response.data;

            console.log(data)

            return data;
        } catch (error) {
            console.error(error);
        }


    }















    let biography= <p className = 'flex border-black place-self-center justify-center mx-24 my-5' >{ memberInfo.biography }</p>;

    let votesDisplay= <p className = 'flex border-black place-self-center justify-center mx-24 my-5'>{ memberInfo.votes }</p>;

    let errorDisplay= <p className = 'flex border-black place-self-center justify-center mx-24 my-5'> Not Available</p>;

        





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
                                
                                <button onClick= {e => setDisplayOption(0)} className="place-self-center text-slate-950 underline decoration-sky-600 underline-offset-8 decoration-4 px-3 mx-5"> Biography</button> 
                                : 
                                <button onClick= {e => setDisplayOption(0)} className="place-self-center text-gray-400 px-3 mx-5"> Biography</button>}

                                {(displayOption == 1) ?
                                <button onClick= {e => setDisplayOption(1)} className="place-self-center text-slate-950 underline decoration-sky-600 underline-offset-8 decoration-4 px-3 mx-5">Vote</button>
                                :
                                <button onClick= {e => setDisplayOption(1)} className="place-self-center text-gray-400 px-3 mx-5"> Vote</button>}

                                {(displayOption == 2) ?
                                <button onClick= {e => setDisplayOption(2)} className="place-self-center text-slate-950 underline decoration-sky-600 underline-offset-8 decoration-4 px-3 mx-5">Compare Members</button>
                                :
                                <button onClick= {e => setDisplayOption(2)} className="place-self-center text-gray-400 px-3 mx-5"> Compare Members</button>}
                    


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

                        {(displayOption === 0 ? biography : errorDisplay )}

                    </div>


                </div>

            </div>


        </div>


    )




}


export async function getServerSideProps(context) {

    const member_id= (context.query.member_id != undefined) ? context.query.member_id : "Default Value"

    const fetchBio= async (currMember) => {



        const apiUrl= 'http://localhost:3000/api/memberQuery';

        console.log(currMember)

        const params= {

            member_id: currMember,

        };


        try {
            let response= await axios.get(apiUrl, { params });
            let data= response.data;
            return data;
        } catch (error) {
            console.error(error);
        }


    }

    let response= await fetchBio(member_id);

    console.log(response);



    return { props: { data: null } };
}