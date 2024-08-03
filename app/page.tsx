'use client'

import Link from "next/link";
import { useState } from "react";
import Notes from "./components/notes";

export default function Home() {


  const [selected, setSelected]: any = useState('explore')

  return (
    <main className="homepage-container">
      <div className="homepage">

        {/* <section className="search-area">
          <input type="search" placeholder="Search"></input>
        </section> */}

        <section className="main-content">
          <div className="categories">
            <ul>
              <li className={`${selected === 'following' ? 'selected' : ''}`} onClick={() => setSelected('following')}><Link href={'#'}>Following</Link></li>
              <li className={`${selected === 'explore' ? 'selected' : ''}`} onClick={() => setSelected('explore')}><Link href={'#'}>Explore</Link></li>
              <li className={`${selected === 'profile' ? 'selected' : ''}`} onClick={() => setSelected('profile')}><Link href={'#'}>Profile</Link></li>
            </ul>
          </div>
        </section>

        <section className="post-area">
          <Notes data={selected} />
        </section>
      </div>
    </main>
  );
}

