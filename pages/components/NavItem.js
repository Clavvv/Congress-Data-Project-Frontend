import React from "react"
import Link from "next/link"



export default function NavItem( props ) {

    return (


        <Link className= 'p-1' href= {props.link}>

                <button className='px-2 py-1 rounded-sm border border-slate-50 text-white text-md hover:bg-slate-50 hover:text-slate-950'>

                    <p>{props.text}</p>

                </button>


        </Link>

        




    )
}