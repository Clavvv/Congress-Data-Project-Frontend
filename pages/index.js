import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import logo from "../public/data/logo.jpg"

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="flex flex-col gap-20 h-screen w-screen bg-white place-items-center justify-center">
                <div className="flex flex-col place-items-center justify-evenly">
                    <Image src={logo} className="h-full w-full pt-1 font-sans font-semibold text-5xl " height={45} width={240} alt="Wildtype"/>
                	  <p className="font-sans font-semibold text-2xl">Process Development</p>
		            </div>
                <div className="flex flex-row gap-5 place-items-center justify-evenly">
                    <Link href="/main">
                        <button className="rounded-lg border-2 border-black p-5 w-40 text-3xl
                            focus:outline-none hover:bg-orange-600 hover:text-white hover:border-orange-600 focus:border-white "><p>Main</p></button>
                    </Link>
                    <Link href="/test">
                        <button className="rounded-lg border-2 border-black p-5 w-40 text-3xl 
                            focus:outline-none hover:bg-orange-600 hover:text-white hover:border-orange-600 focus:border-white "><p>test</p></button>
                    </Link>
                    <Link href="/data">
                        <button className="rounded-lg border-2 border-black p-5 w-40 text-3xl 
                            focus:outline-none hover:bg-orange-600 hover:text-white hover:border-orange-600 focus:border-white "><p>Data</p></button>
                    </Link>
                    <Link href="/osmo">
                        <button className="rounded-lg border-2 border-black p-5 w-40 text-3xl 
                            focus:outline-none hover:bg-orange-600 hover:text-white hover:border-orange-600 focus:border-white "><p>Osmo</p></button>
                    </Link>
                    <Link href="/pcv">
                        <button className="rounded-lg border-2 border-black p-5 w-40 text-3xl 
                            focus:outline-none hover:bg-orange-600 hover:text-white hover:border-orange-600 focus:border-white "><p>PCV</p></button>
                    </Link>
                </div>
                    <div className="flex flex-col place-items-center justify-evenly">
		            </div>
            </div>
        )
    }
}