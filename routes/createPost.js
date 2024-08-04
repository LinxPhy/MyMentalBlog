require('dotenv').config()
const admin = require('firebase-admin');
const express = require('express')
const multer = require('multer');
const slugify = require('slugify');
const { connection } = require('../routes/db');
const serviceAccount = require('../keys/keys.json');

const app = express()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "test-a7fb4.appspot.com"
});

const bucket = admin.storage().bucket();
const upload = multer({storage: multer.memoryStorage()})


app.post('/create', upload.single('image'), async(req, res) => {

    try {
        const postID = await generateID(3)
        if (!postID) throw err

        const { userID, title, message, location } = req.body
        let { category, mood, feel, incognito } = req.body

        category ? 'null' : null
        mood ? 'null' : null
        feel ? 'null' : null
        
        if (incognito == 'true'){
            incognito = true
        } else {
            incognito = false
        }

        const slug = slugify(title, { lower: true })

        let query =
            `
                INSERT INTO posts (postID, userID, title, slug, category, message, location, mood, incognito, feel )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `

        let data = [postID, userID, title, slug, category, message, location, mood, incognito, feel]

        connection.query(query, data, async (err, result) => {
            if (err) { 
                throw err
            }
            console.log("Added new Post")

            if (!req.file) return

            const { originalname, buffer } = req.file;
            const fileName = `${Date.now()}_${originalname}`;
            const file = bucket.file(fileName);

            await file.save(buffer, {
                metadata: {
                    contentType: req.file.mimetype
                }
            });

            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });

            let query = 
                `
                    UPDATE posts SET image = ? WHERE postID = ?
                `
            let data = [url, postID]

            connection.query(query, data, async (err, result) => {
                if(err) { console.log(err) }
                console.log("Saved Image")
            })
        })

        res.sendStatus(200)

    } catch (e) {
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

function getPostID() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 10 }, () => alphanumeric[Math.floor(Math.random() * alphanumeric.length)]).join('');
}




module.exports = app;