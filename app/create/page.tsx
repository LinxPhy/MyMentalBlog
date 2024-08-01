'use client'

import { FormEvent, useState } from "react"

export default function Create() {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('choice')
    const [message, setMessage] = useState('')
    const [image, setImage] : any = useState('')
    const [location, setLocation] = useState('public')
    const [mood, setMood] = useState('mood')
    const [errors, setErrors] = useState<string[]>([]);
    
    const [titleCount, setTitleCount] = useState(0)
    const [messageCount, setMessageCount] = useState(0)

    let title_error = 'Title must be between 5 and 80 characters'
    let cat_error = 'You must choose a category'
    let msg_error = 'Message must be between 5 and 800 characters'
    let img_error = 'Image must be less than 2mb'

    function postCreation(e: FormEvent<HTMLFormElement>) {

        e.preventDefault()
        setErrors([])

        if (!validatePost()) {
            return
        }

        let image_name = image && ( image.target.files[0].name.replace(/\s+/g, '')+ '_' + Date.now() ) || null

        const data = { title, category, message, image_name, location, mood}




    }

    function validatePost() {

        let allErrors: any = []

        if (title.length < 5 || title.length > 120) {
            allErrors.push(title_error)
        }

        if (category === 'choice')  {
            allErrors.push(cat_error)
        }

        if (message.length < 5 || message.length > 800) {
            allErrors.push(msg_error)
        }

        if (image && image.target.files[0].size > 2e6){
            allErrors.push(img_error)
        }

        if (allErrors.length > 0) {
            setErrors(allErrors)
            return false
        }

        return true
    }

    return (
        <main className="create">
            <section className="post-content">

                <form onSubmit={(e) => postCreation(e)}>

                    <div className="title-section">
                        <h2>Create Post</h2>
                    </div>

                    <div className="post-content-container">
                        <div>
                            <p>Title</p>
                            {errors.includes(title_error) ? <p className="error-message">{title_error}</p> : null }
                            <input type="text" placeholder="Enter a Title..." onChange={(e) => { setTitle(e.target.value); setTitleCount(() => e.target.value.length) }} maxLength={120}></input>
                            <span>{titleCount}/120</span>
                        </div>
                        <div>
                            <p>Category</p>
                            {errors.includes(cat_error) ? <p className="error-message">{cat_error}</p> : null }
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="choice">Choose Category...</option>
                                <option value="animals">Animals</option>
                                <option value="career">Career (Education, Work)</option>
                                <option value="connections">Connections (Family, Friends)</option>
                                <option value="environmental">Environmental</option>
                                <option value="finance">Finance</option>
                                <option value="hobbies">Hobbies</option>
                                <option value="love">Love</option>
                                <option value="mental_health">Mental Health</option>
                                <option value="society">Society (Incivility, Social Media)</option>
                                <option value="technology">Technology</option>
                                <option value="wellness">Wellness</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <p>Message</p>
                            {errors.includes(msg_error) ? <p className="error-message">{msg_error}</p> : null }
                            <textarea placeholder="Personal Space..." onChange={(e) => { setMessage(e.target.value); setMessageCount(() => e.target.value.length) }} maxLength={800}></textarea>
                            <span>{messageCount}/800</span>
                        </div>

                        <div>
                            <p>Location</p>
                            <select onChange={(e) => setLocation(e.target.value)}>
                                <option value={'public'}>Public</option>
                                <option value={'private'}>Private</option>
                            </select>
                        </div>

                        <div>
                            <p>Select Mood (Optional)</p>
                            <select className="mood" onChange={(e) => setMood(e.target.value)}>
                                <option value="mood">Select...</option>
                                <option value="angry">😡 - angry</option>
                                <option value="anxious">😰 - anxious</option>
                                <option value="confused">🤨 - confused</option>
                                <option value="curious">🤔 - curious</option>
                                <option value="demon">😈 - demon</option>
                                <option value="disgusted">🤢 - disgusted</option>
                                <option value="excited">🤩 - excited</option>
                                <option value="exhausted">😩 - exhausted</option>
                                <option value="happy">😃 - happy</option>
                                <option value="heart-crack">💔 - heart crack</option>
                                <option value="horrified">😱 - horrified</option>
                                <option value="illness">🤒 - illness</option>
                                <option value="in-love">🥰 - in love</option>
                                <option value="lonely">😞 - lonely</option>
                                <option value="money">🤑 - money</option>
                                <option value="nothing">😶 - nothing</option>
                                <option value="poop">💩 - poop</option>
                                <option value="sad">😔 - sad</option>
                                <option value="scared">😨 - scared</option>
                                <option value="shocked">😲 - shocked</option>
                                <option value="sleepy">😴 - sleepy</option>
                                <option value="surprised">😮 - surprised</option>
                            </select>
                        </div>

                    </div>

                    
                    <div className="post-content-items">
                    {errors.includes(img_error) ? <p className="error-message2">{img_error}</p> : null }
                        <input type="file" accept="image/*" onChange={(e) => setImage(e)}></input>
                        <button type="submit" className="buttonStyle1">Post</button>
                    </div>

                   

                </form>
            </section>
        </main>
    )

}