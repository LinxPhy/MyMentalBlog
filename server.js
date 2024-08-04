require('dotenv').config()

const express = require('express');
const cors = require('cors')
const createPost = require('./routes/createPost')


const app = express()


app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    })
)



app.use(createPost)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.post('/getposts', (req, res) => {

    try {
        let query = `SELECT * FROM Posts`
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