'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import Note from "./note"

export default function Notes({props} : any){

    const [posts, setPosts] : any = useState([])

    const getPosts = async () => {

        await axios.post(`${process.env.SERVER_URL}/getposts`).then(res => {
            setPosts(res.data)
        }).catch(err => {
            console.log(err)
        })

    }

    useEffect(() => {
        getPosts()
    }, [])

    return(
        <div className="post-area-container">
            {posts && posts.map((post : any, key : number) => {
                return(
                    <Note key={key} data={post} />
                )
            })}
        </div>
    )

}

