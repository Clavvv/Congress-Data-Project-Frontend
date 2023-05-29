import React from "react"
import Link from "next/link"



export default function NavItem( props ) {

    return (


        <Link className= 'p-1' href= {props.link}>

                <button className='content-center py-1 px-1 text-slate-50 text-md hover:underline hover:decoration-sky-500 hover:decoration-2 hover:underline-offset-8 focus:border-slate-900 focus:outline-none'>

                    <p className="place-self-center">
                        {props.text}
                    </p>

                </button>


        </Link>

        




    )
}