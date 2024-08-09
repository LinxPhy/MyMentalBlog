'use client'

import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Note from "../components/note"
import SearchBar from "../components/searchbar"


export default function BookMarks() {

    const [posts, setPosts]: any = useState([])
    const { data: session, status } = useSession()
    const userID: string = session?.user?.id || ''

    const getPosts = async () => {

        if (session) {

            await axios.post(`${process.env.SERVER_URL}/getbookmarks`, {
                userID: userID
            }).then(res => {
                setPosts(res.data)
            }).catch(err => {
                console.log(err)
            })

        }
    }

    useEffect(() => {
        getPosts()
    }, [session])

    return (
        <main className="bookmark-container">

            <SearchBar />

            <section className="bookmarks">
                {posts && posts.map((post: any, key: number) => {
                    return (
                        <Note key={key} data={post} />
                    )
                })}
            </section>
        </main>
    )

}

