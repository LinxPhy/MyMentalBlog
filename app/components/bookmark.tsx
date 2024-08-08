'use client'

import { useState } from "react"
import BookmarkEmpty from '@/app/icons/bookmark_empty.svg'
import BookmarkFull from '@/app/icons/bookmark_full.svg'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import axios from "axios";

export default function Bookmark({data} : any){

    const [bookmark, setBookmark] = useState(data.is_bookmarked === 1 ? true : false)
    const postID = data.postID
    
    const { data: session } = useSession()
    const userID : string = session?.user?.id || ''
    const router = useRouter()

    function handleBookmark(){
        setBookmark(!bookmark)

        if (!session) {
            router.push('/api/auth/signin')
        }

        const callAPI = async() => {

            console.log(postID, userID)

            if (bookmark == true){
                await axios.post(`${process.env.SERVER_URL}/removebookmark`, {
                    postID: postID,
                    userID: userID
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                await axios.post(`${process.env.SERVER_URL}/createbookmark`, {
                    postID: postID,
                    userID: userID
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
            
        }

        callAPI()
    }

    //PUT USERID IN /COMPONENTS/NOTES AND PASS IT DOWN RATHER THAN DOING THIS


    return(
        <li onClick={() => handleBookmark()}>
            {bookmark == true ? 
                <Image src={BookmarkFull} alt=''></Image> : 
                <Image src={BookmarkEmpty} alt=''></Image>
            }
        </li>
    )

}