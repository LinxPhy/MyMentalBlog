"use client"

import '@/app/styles/homepage.css'
import Link from 'next/link'


import AuthButton from './authButton'

export default function Navigation() {

   

    return (
        <header>
            <div className="header-top">
                <div className="title">
                    MyMentalBlog
                </div>
                <div className="user">
                    <AuthButton />
                </div>

                <div className="navigation">
                    <nav>
                        <ul>
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/bookmarks'}>Bookmarks</Link></li>
                            <li><Link href={'/create'}>Create</Link></li>
                            <li><Link href={'/profile'}>Profile</Link></li>
                            <li><Link href={'/premium'}>Premium</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="settings">
                <ul>
                    <li><Link href={'/settings'}>Settings</Link></li>
                    <li><Link href={'/privacy'}>Privacy Policy</Link></li>
                    <li><Link href={'/termsandconditions'}>Terms and Conditions</Link></li>
                    <li><Link href={'/contact'}>Contact Us</Link></li>
                </ul>
            </div>
        </header>
    )

}

