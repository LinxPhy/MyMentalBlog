import '@/app/styles/homepage.css'
import Link from 'next/link'

export default function Navigation() {

    return (
        <header>
            <div className="header-top">
                <div className="title">
                    MyMentalBlog
                </div>
                <div className="user">
                    <button className='buttonStyle1'>Login</button>
                </div>

                <div className="navigation">
                    <nav>
                        <ul>
                            <li><Link href={'/'}></Link>Home</li>
                            <li><Link href={'/bookmarks'}></Link>Bookmarks</li>
                            <li><Link href={'/profile'}></Link>Profile</li>
                            <li><Link href={'/premium'}></Link>Premium</li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="settings">
                <ul>
                    <li><Link href={'/settings'}></Link>Settings</li>
                    <li><Link href={'/privacy'}></Link>Privacy Policy</li>
                    <li><Link href={'/termsandconditions'}></Link>Terms and Conditions</li>
                    <li><Link href={'/contact'}></Link>Contact Us</li>
                </ul>
            </div>
        </header>
    )

}

