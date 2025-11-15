// index.js
// Main entry point for Berties Books

const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();

// ----------------------
// Database connection pool
// ----------------------
const db = mysql.createPool({
  host: 'localhost',
  user: 'berties_books_app',
  password: 'qwertyuiop',
  database: 'berties_books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Make the pool available everywhere as global.db
global.db = db;

// ----------------------
// View engine & middleware
// ----------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); // for POST form data
app.use(express.static(path.join(__dirname, 'public'))); // css, images, etc.

// ----------------------
// Routes
// ----------------------
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Optional: /list shortcut used in some lab docs – just redirect to /books/list
app.get('/list', (req, res) => {
  res.redirect('/books/list');
});

// Basic error handler (so next(err) doesn't crash the app without message)
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500);
  res.send('Something went wrong with the server or database.');
});

// ----------------------
// Start server
// ----------------------
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Berties Books app listening on port ${port}`);
});

module.exports = app;
