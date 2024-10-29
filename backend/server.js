const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const app = express();

app.use(express.json());
app.use(cors());

// JWT Secret
const JWT_SECRET = 'your-secret-key';

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// User registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('Error registering user');
        res.send('User registered successfully');
    });
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM users WHERE username = ?`;
    db.query(sql, [username], async (err, result) => {
        if (err || result.length === 0) return res.status(400).send('User not found');

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1m' });
        res.json({ token });
    });
});

// Protected route
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied');

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        res.send('Welcome to the dashboard');
    });
});

app.listen(5000, () => {
    console.log('Server running on port http://localhost:5000');
});
