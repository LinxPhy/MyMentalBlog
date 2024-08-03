

export default function Note({data} : any) {

    const { userID, title, category, message, image_name, location, mood } = data

    // need to think about user image icon

    return (
        <div className="Note">

            <div className="note-header">
                <div className="note-header-content">
                    <img src=""></img>

                    <div className="note-info">
                        <span>Love</span>
                        <span>453 days ago</span>
                    </div>
                </div>

                <div className="note-title">
                    <h5>My Husband does not care about me anymore</h5>
                </div> 
            </div>

            <div className="note-image">
                <img src=""></img>
            </div>

            <div className="note-message">
                <p>I'm so frustrated with my partner right now! They never listen to me and they're always so selfish. I feel like I'm always the one making compromises and it's just not fair. I don't know how much more I can take.</p>
            </div>

            <div className="note-items">
                <div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>

                <div>
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )

}