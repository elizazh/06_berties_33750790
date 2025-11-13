const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8000;

// views (for 6D)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MySQL pool (6A–C)
const db = mysql.createPool({
  host: 'localhost',
  user: 'berties_books_app',
  password: 'qwertyuiop',
  database: 'berties_books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
global.db = db;

// routes
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// simple home (helps the marker)
app.get('/', (req, res) => {
  res.send('<h1>Berties Books</h1><p><a href="/books/list">Books list</a></p>');
});

app.listen(port, () => console.log(`http://localhost:${port}`));
