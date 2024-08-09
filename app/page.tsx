'use client'

import Link from "next/link";
import { useState } from "react";
import Notes from "./components/notes";
import SearchBar from "./components/searchbar";

export default function Home() {

  const [selected, setSelected]: any = useState('explore')
  
  return (
      <main className="homepage-container">
        <div className="homepage">

          <SearchBar />

          <section className="main-content">
            <div className="categories">
              <ul>
                <li className={`${selected === 'following' ? 'selected' : ''}`} onClick={() => setSelected('following')}><Link href={'#'}>Following</Link></li>
                <li className={`${selected === 'explore' ? 'selected' : ''}`} onClick={() => setSelected('explore')}><Link href={'#'}>Explore</Link></li>
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

