const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise()

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
        if (err) {
            res.status(500).send('Error registering user');
        } else {
            const user = { id: result.insertId, email }; // Restituisci i dati dell'utente
            res.status(200).json(user);
        }
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            res.status(500).send('Error logging in');
        } else if (results.length > 0) {
            const user = results[0];
            res.status(200).json(user);  // Invia i dati utente come JSON
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
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
