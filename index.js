const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8000;

// Set EJS views (Lab 6d+)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing for forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MySQL connection pool (Lab 6abc)
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

// Home page → menu (Lab 6d)
app.get('/', (req, res) => res.render('index.ejs'));

// /books routes (Lab 6abc/def)
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
