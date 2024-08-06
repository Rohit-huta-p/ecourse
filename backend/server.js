const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const cors = require('cors')
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecourse'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to handle form submission
app.post('/submit', (req, res) => {
    console.log("HOLLs");
    const { name, email, subject, message } = req.body;

  

    const query = 'INSERT INTO enquiry (name, email, subject, message) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

app.post('/signup', (req, res) => {

    const { name, email, course } = req.body;


    if( !name || !email || !course){
        return res.status(400).json({error: 'There are missing Fields!'});
    }

    const query = 'INSERT INTO users (name, email, course) VALUES (?, ?, ?)';
    db.query(query, [name, email, course], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
