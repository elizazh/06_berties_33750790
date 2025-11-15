// index.js (app bootstrap)
const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8000;

/* view engine + body parsing */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* MySQL pool (least-privilege user) */
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

/* top-level pages to match the menu */
app.get('/', (_req, res) => res.render('index.ejs'));
app.get('/about', (_req, res) => res.render('about.ejs'));
app.get('/search', (_req, res) => res.render('search.ejs'));
app.get('/register', (_req, res) => res.render('register.ejs'));

/* books router mounted once at /books */
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

/* simple 404/500 */
app.use((_req, res) => res.status(404).send('404 Not Found'));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send('Server error');
});

/* bind to all interfaces for the DOC gateway */
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
