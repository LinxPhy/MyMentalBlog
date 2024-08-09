'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Note from "./note"

export default function Notes({ data }: any) {

    const [posts, setPosts]: any = useState([])
    const [selection, setSelection] = useState(data)

    const getPosts = async () => {

        let url_ext = ''

        if (selection == 'explore') {
            url_ext = '/getposts'

            await axios.post(`${process.env.SERVER_URL}${url_ext}`).then(res => {
                setPosts(res.data)
            }).catch(err => {
                console.log(err)
            })
        } else {
            url_ext = ''
            setPosts([])
        }
    }

    useEffect(() => {
        setSelection(data)
    }, [data])

    useEffect(() => {
        getPosts()
    }, [selection])

    const skeletonArray = new Array(9).fill(0)

    return (
        <div className="post-area-container">

            {posts.length === 0 ? (
                <div>Loading...</div>
                // <ResponsiveMasonry
                //     columnsCountBreakPoints={{ 150: 1, 1000: 2, 1500: 3 }}
                // >
                //     <Masonry columnsCount={3}>

                //     </Masonry>
                // </ResponsiveMasonry>
            ) : (
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 150: 1, 1000: 2, 1500: 3 }}
                >
                    <Masonry columnsCount={3}>

                        {posts && posts.map((post: any, key: number) => {
                            return (
                                <Note key={key} data={post} />
                            )
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            )}


        </div>
    )

}

