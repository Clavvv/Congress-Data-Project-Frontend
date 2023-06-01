import { React, useState, useEffect } from "react";
import NavBar from "../components/Navigation";
import axios from "axios";





export default function SearchLandingPage() {





    return (

        <div className= "flex flex-col h-screen w-screen bg-slate-50">

            <NavBar />

            <div className= "flex h-full w-3/5 bg-slate-50 place-self-center justify-center drop-shadow-lg">

                <input className= "h-8 w-32 border text-sm text-gray-500 border-black place-self-center rounded-md px-2 py-1" value="Search" type='text'/>

            </div>


        </div>

    )


}