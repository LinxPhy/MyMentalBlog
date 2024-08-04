require('dotenv').config()

const express = require('express');
const cors = require('cors');
const slugify = require('slugify');
const admin = require('firebase-admin');
const serviceAccount = require('./keys/keys.json');
const { connection } = require('./routes/db.js');
const multer = require('multer');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    })
)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "test-a7fb4.appspot.com"
    //storageBucket: 'test-a7fb4.appspot.com'
    //gs://test-a7fb4.appspot.com
});

const bucket = admin.storage().bucket();

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


const upload = multer({
    storage: multer.memoryStorage()
})

app.post('/upload_image', upload.single('image'), async (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const { originalname, buffer } = req.file;
        const fileName = `${Date.now()}_${originalname}`;
        const file = bucket.file(fileName);

        // Upload the file to Firebase Storage
        await file.save(buffer, {
            metadata: {
                contentType: req.file.mimetype
            }
        });

        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491' // Set expiration date as needed
        });

        console.log("success")
        res.json({ imageUrl: url });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file.');
    }

})

app.post('/create', (req, res) => {

    try {
        const postID = generateID(3)
        if (!postID) throw err

        const { userID, title, category, message, image_name, location, mood, incognito, feel } = req.body.data
        const slug = slugify(title, { lower: true })

        let query =
            `
                INSERT INTO Post (postID, userID, title, slug, category, image, message, location, mood, incognito, feel )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `

        let data = [postID, userID, title, slug, category, image_name, message, location, mood, incognito, feel]

        connection.query(query, [data], (err, result) => {
            if (err) { console.log(err) }
            console.log("Added new Post")
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

app.listen(3000, () => console.log('Server Started'));