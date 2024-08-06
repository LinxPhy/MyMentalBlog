require('dotenv').config()

const express = require('express');
const cors = require('cors')
const createPost = require('./routes/createPost')
const storeUser = require('./routes/storeUser')
const { connection } = require('./routes/db');

const app = express()


app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    })
)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(createPost)
app.use(storeUser)




app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.post('/getposts', (req, res) => {

    try {
        let query = `
        SELECT 
            u.username, u.email, u.image as icon, 
            p.postID, p.title, p.slug,
            p.category, p.image, p.message,
            p.location, p.mood, p.incognito,
            p.feel, p.created_at
        FROM users u JOIN posts p ON u.userID = p.userID;`
        connection.query(query, (err, result) => {
            if (err) throw err
            res.send(result)
        })

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})









app.listen(3000, () => console.log('Server Started'));