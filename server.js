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
        SELECT distinct
            u.username, u.email, u.image as icon, 
            p.postID, p.title, p.slug,
            p.category, p.image, p.message,
            p.location, p.mood, p.incognito,
            p.feel, p.created_at, 
            CASE
                when exists(
                    select 1
                    from bookmarks b
                    where b.postID = p.postID AND b.userID = p.userID
                ) then 1
                else 0
            end as is_bookmarked
        FROM users u 
        join posts p ON u.userID = p.userID
        left join bookmarks b on u.userID = p.userID
        ORDER BY created_at DESC; `
        connection.query(query, (err, result) => {
            if (err) throw err
            res.send(result)
        })

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.post('/createbookmark', async (req, res) => {

    try {
        const { postID, userID } = req.body
        let query = `INSERT INTO bookmarks VALUES (?, ?)`
        let data = [userID, postID]

        await new Promise((resolve, reject) => {
            connection.query(query, data, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })

        res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

app.post('/removebookmark', async (req, res) => {

    try {
        const { postID, userID } = req.body
        let query = `DELETE FROM bookmarks WHERE postID = (?) AND userID = (?)`
        let data = [postID, userID]

        await new Promise((resolve, reject) => {
            connection.query(query, data, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })

        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.post('/getbookmarks', async (req, res) => {

    try {
        const { userID } = req.body
        // let query = `SELECT * FROM bookmarks WHERE userID = (?)`

        let query = `
        select u.username, u.email, u.image as icon, 
            p.postID, p.title, p.slug,
            p.category, p.image, p.message,
            p.location, p.mood, p.incognito,
            p.feel, p.created_at,
            CASE
                when exists(
                    select 1
                    from bookmarks b
                    where b.postID = p.postID AND b.userID = p.userID
                ) then 1
                else 0
            end as is_bookmarked
        from bookmarks b
        join posts p ON p.postID = b.postID
        join users u ON u.userID = b.userID
        WHERE p.userID = (?)
        ORDER BY created_at DESC;
        `
        let data = [userID]

        const bookmarks = await new Promise((resolve, reject) => {
            connection.query(query, data, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })

        res.status(200).send(bookmarks)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})








app.listen(3000, () => console.log('Server Started'));