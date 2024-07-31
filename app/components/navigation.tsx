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
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/bookmarks'}>Bookmarks</Link></li>
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

