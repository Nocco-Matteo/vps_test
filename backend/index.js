const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'testdb'
}).promise()

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/api/register',async (req, res) => {
    const { email, password } = req.body;
    console.log('email, password:', email, password);
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    try {
        const [result] = await db.query(query, [email, password]);
        const user = { id: result.insertId, email };
        res.status(200).json(user);
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Error registering user');
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    try {
        const [results] = await db.query(query, [email, password]);
        if (results.length > 0) {
            const user = results[0];
            res.status(200).json(user);
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error('Error selecting user:', err);
        res.status(500).send('Error logging in');
    }
});

app.get("/api", async (req, res) => {
    try {
        res.status(200).send("we we sono l'api nodejs!");
    } catch (e) {
        console.log(e);
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
