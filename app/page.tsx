'use client'

import Link from "next/link";
import { useState } from "react";

export default function Home() {


  const [selected, setSelected]: any = useState('explore')

  return (
    <main className="homepage-container">
      <div className="homepage">

        {/* <section className="search-area">
          <input type="search" placeholder="Search"></input>
        </section> */}

        <section className="post-content">
          <div className="post-content-container">
            <div>
              <p>Title</p>
              <input type="text" placeholder="Search"></input>
            </div>
            <div>
              <p>Category</p>
              <select>
                <option value="choice">Choose Category</option>
                <option value="animals">Animals</option>
                <option value="career">Career (Education, Work)</option>
                <option value="connections">Connections (Family, Friends)</option>
                <option value="environmental">Environmental</option>
                <option value="finance">Finance</option>
                <option value="hobbies">Hobbies</option>
                <option value="love">Love</option>
                <option value="politics">Politics</option>
                <option value="society">Society (Incivility, Social Media)</option>
                <option value="technology">Technology</option>
                <option value="wellness">Wellness</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p>Message</p>
              <textarea placeholder="Personal Space"></textarea>
            </div>

          </div>


          <div className="post-content-items">
            <input type="file" id="myFile" name="filename"></input>
            <button className="buttonStyle1">Post</button>
          </div>
        </section>

        <section className="main-content">
          <div className="categories">
            <ul>
              <li className={`${selected === 'following' ? 'selected' : ''}`} onClick={() => setSelected('following')}><Link href={'#'}>Following</Link></li>
              <li className={`${selected === 'explore' ? 'selected' : ''}`} onClick={() => setSelected('explore')}><Link href={'#'}>Explore</Link></li>
              <li className={`${selected === 'profile' ? 'selected' : ''}`} onClick={() => setSelected('profile')}><Link href={'#'}>Profile</Link></li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

