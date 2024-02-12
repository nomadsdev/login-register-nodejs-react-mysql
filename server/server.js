const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sqlUsP = `SELECT * FROM users WHERE username = ? OR email = ?`;
    const sqlRegister = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.query(sqlUsP, [username, email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length > 0) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
      db.query(sqlRegister, [username, email, password], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sqlUcP = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.query(sqlUcP, [username, password], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      req.session.user = results[0];
      res.status(200).json({ message: 'Login successful', user: results[0] });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});