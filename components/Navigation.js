import {useEffect, useState, React} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import NavItem from './NavItem';
import github_dark from '../public/data/github_dark.png'
import linkedin_white from '../public/data/linkedin_white.png'

export default function NavBar() {

    const [displayType, updateDisplayType]= useState('light')



    return (

        <nav className='flex flex-row bg-slate-800 px-80 py-1 gap-20'>


            <div className='flex justify-start gap-4'>

                <Link className='flex min-h-fit min-w-fit' href='https://github.com/Clavvv/Congress-Data-Project-Frontend' rel="noopener noreferrer" target='_blank'> 
                    <Image src={github_dark} className= 'flex h-10 w-10 place-self-center p-1' />
                </Link>

                <Link className='flex min-h-fit min-w-fit' href='https://www.linkedin.com/in/ryanclavin/' rel="noopener noreferrer" target='_blank'> 
                    <Image src={linkedin_white} className= 'h-10 w-10 p-1.5 place-self-center' />
                </Link>

            </div>

            <div className= 'flex h-full w-full justify-start gap-4'>
            <NavItem link= '/' text='Home' />

            <NavItem link='/compare' text='Data' />

            <NavItem link='/members' text='Members' />

            <NavItem link='/' text='Sources' />

            </div>


        </nav>






    )













}