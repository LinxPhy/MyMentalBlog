

const express = require('express');
const { connection } = require('../routes/db');

const app = express()







app.post('/storeUser', async (req, res) => {
    try {
        console.log(req.body)
        const { id, name, email, image } = req.body;

        // Check if the user already exists
        const query = `SELECT userID FROM Users WHERE userID = ?`;
        const data = [id];

        const userExists = await new Promise((resolve, reject) => {
            connection.query(query, data, (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });

        if (userExists) {
            // Update existing user
            const query = `
                UPDATE Users SET username = ?, email = ?, image = ?
                WHERE userID = ?
            `;
            const data = [name, email, image, id];

            await new Promise((resolve, reject) => {
                connection.query(query, data, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

        } else {
            // Insert new user
            const query = `
                INSERT INTO Users (userID, username, email, image, premium)
                VALUES (?, ?, ?, ?, ?)
            `;
            const data = [id, name, email, image, expiration, 0];

            await new Promise((resolve, reject) => {
                connection.query(query, data, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        }

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while processing your request.');
    }
});



module.exports = app;