// index.js
// Main entry point for Berties Books

const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const app = express();

// ---------- Database connection ----------
const db = mysql.createPool({
  host: 'localhost',
  user: 'berties_books_app',   // same as Lab 6
  password: 'qwertyuiop',      // same as Lab 6
  database: 'berties_books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// make pool global for routes
global.db = db;

// ---------- View engine & middleware ----------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));       // for form POSTs
app.use(express.static(path.join(__dirname, 'public'))); // css, etc.

// Session (Lab 8)
app.use(session({
  secret: 'somerandomstuff',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000  // 10 minutes
  }
}));

// Input sanitiser (Lab 8)
app.use(expressSanitizer());

// ---------- Routes ----------
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const weatherRouter = require('./routes/weather');
const apiRouter = require('./routes/api');

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRouter);
app.use('/api', apiRouter);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Optional shortcut: /list -> /books/list
app.get('/list', (req, res) => {
  res.redirect('/books/list');
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server or database error.');
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Berties Books app listening on port ${PORT}`);
});
