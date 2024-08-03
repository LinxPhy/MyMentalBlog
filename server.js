require('dotenv').config()

const express = require('express');
const cors = require('cors');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

const { connection } = require('./routes/db.js');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    })
)

app.get('/', (req,res) => {
    res.sendStatus(200)
})

app.post('/getposts', (req, res) => {

    try{
        let query = `SELECT * FROM Posts`
        connection.query(query, (err, result) => {
            if(err) throw err
            res.send(result)
        })

        
    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }

})

app.post('/create', (req, res) => {
    
    try{
        const postID = generateID(3)
        if (!postID) throw err

        const { userID, title, category, message, image_name, location, mood, incognito, feel } = req.body.data
        const slug = slugify( title,  {lower: true} )
        
        let query = 
            `INSERT INTO Post 
                (postID, userID, title, slug, category, image, message, location, mood, incognito, feel ) 
                VALUES (
                    '${postID}', '${userID}', '${title}', '${slug}', 
                    '${category}', '${image_name}', '${message}', 
                    '${location}', '${mood}', '${incognito}', '${feel}'
            )`

        connection.query(query, (err, result) => {
            if(err) throw err
            console.log("Success")
        })

        res.sendStatus(200)

    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
    
})



app.get('/generateID', async (req, res) => {
    try {
        const id = await generateID(3);
        res.send({ id: id });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error generating ID');
    }
});

function generateID(retries) {
    return new Promise((resolve, reject) => {
        if (retries === 0) return resolve(null);

        const id = getPostID();
        const query = `SELECT id FROM test WHERE id = ?`;

        connection.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }

            if (result.length === 0) {
                return resolve(id);
            } else {
                resolve(generateID(retries - 1));
            }
        });
    });
}

function getPostID(){
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({length: 10}, () => alphanumeric[Math.floor(Math.random() * alphanumeric.length)]).join(''); 
}

app.listen(3000, () => console.log('Server Started'));