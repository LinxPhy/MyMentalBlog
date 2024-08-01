require('dotenv').config()

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const { connection } = require('./routes/db.js');
const app = express()

app.get('/', (req,res) => {
    res.sendStatus(200)
})

app.listen(3000, () => console.log('Server Started'));