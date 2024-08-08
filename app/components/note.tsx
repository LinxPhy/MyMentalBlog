'use client'

import HeartEmpty from '@/app/icons/heart_empty.svg'
import HeartFull from '@/app/icons/heart_full.svg'
import BookmarkEmpty from '@/app/icons/bookmark_empty.svg'
import BookmarkFull from '@/app/icons/bookmark_full.svg'
import Comment from '@/app/icons/message.svg'
import Share from '@/app/icons/share.svg'
import Image from 'next/image';

import Bookmark from './bookmark'

export default function Note({ data }: any) {

    const { postID, slug, username, icon, title, category, message, image, location, mood, feel, created_at, is_bookmarked } = data
    
    

    function getMood(val : any){
        
        return mood_tracker[val.mood] || ''
    }

    function copyToClipboard({postID, slug} : any){

        const baseUrl = window.location.origin;
        const url = baseUrl + '/' + 'post' + '/' + postID + '/' + slug

        navigator.clipboard.writeText(url).then(() => {
        }).catch(err => {
            console.log("Error copying", err)
        })
    }

    

    return (
        <div className="Note">

            <div className="note-header">
                <div className="note-header-content">
                    <Image src={icon} width={40} height={40} alt=''></Image>
                    <div className="note-title">
                        <p className="note-title-value">{username}</p>
                        <div className="note-info">
                            <span className="note-info-datetime">{timeAgo(created_at)}</span>
                            <span className="note-info-mood">&#x2022;{category}</span>
                        </div>
                    </div>
                </div>

                {image && (
                    <div className="note-image">
                        <img className="note_image" src={image}></img>
                    </div>
                )}

                <div className="note-title-area">
                    <h5>{title}</h5>
                </div>
            </div>

            <div className="note-message">
                <p>{message}</p>
            </div>

            <div className='note-extra'>
                <span>{feel}</span>
                <span>{getMood({mood})}</span>
            </div>

            <div className="note-items">
                <div>
                    <ul>
                        <li><Image src={HeartEmpty} alt=''></Image></li>
                        <li><Image src={Comment} alt=''></Image></li>
                        
                    </ul>
                </div>

                <div>
                    <ul>
                        <Bookmark data={{postID, is_bookmarked}} />
                        <li onClick={() => copyToClipboard({postID, slug})}><Image src={Share} alt=''></Image></li>
                    </ul>
                </div>
            </div>
        </div>
    )

}


function timeAgo(createdTime: string) {
    const createdDate: any = new Date(createdTime);
    const currentDate: any = new Date();
    const timeDiff: number = currentDate - createdDate;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) {
        return "Just created";
    } else if (minutes < 60) {
        return `${minutes} mns ago`;
    } else if (hours < 2) {
        return "< 1 hr ago";
    } else if (hours < 24) {
        return `${hours} hrs ago`;
    } else if (days < 2) {
        return "Yesterday";
    } else if (days < 7) {
        return `${days} days ago`;
    } else {
        return `${weeks} weeks ago`;
    }
}

const mood_tracker : any = {
    angry: '😡',
    nothing: '😶',
    anxious: '😰',
    confused: '🤨',
    curious: '🤔',
    demon: '😈',
    disgusted: '🤢',
    excited: '🤩',
    exhausted: '😩',
    happy: '😃',
    heart_crack: '💔',
    horrified: '😱',
    illness: '🤒',
    in_love: '🥰',
    lonely: '😞',
    money: '🤑',
    poop: '💩',
    sad: '😔',
    scared: '😨',
    shocked: '😲',
    sleepy: '😴',
    surprised: '😮'
};