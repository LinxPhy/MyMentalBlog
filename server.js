require('dotenv').config()

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const { connection } = require('./routes/db.js');
const app = express()

app.get('/', (req,res) => {
    res.sendStatus(200)
})

app.get('/create', (req,res) => {
    try{

        // let { postID, userID, title, category, image, message, location, mood  } = req.params
        // let query = `INSERT INTO Post VALUES (${postID}, ${userID}, ${title}, ${category}, ${image}, ${message}, ${location}, ${mood})`
        let query = 'SELECT * FROM Post'
    
        connection.query(query, (err, result) => {
            if(err) throw err
            console.log("Success")
        })

        connection.end()
        res.sendStatus(200)
    } catch{
        res.sendStatus(500)
    }
})

app.listen(3000, () => console.log('Server Started'));