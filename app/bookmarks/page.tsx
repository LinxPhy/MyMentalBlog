'use client'

import axios from "axios"
import { useEffect, useState } from "react"


export default function BookMarks(){

    const [posts, setPosts]:  any = useState([])

    const getPosts = async () => {

        await axios('/getbookmarks').then(res => {
            setPosts(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return(
       <div className="bookmarks">
            
       </div>
    )

}

