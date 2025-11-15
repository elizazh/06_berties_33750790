const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

/* ---- MySQL pool (Lab 6A/B requirement) ---- */
const mysql = require('mysql2');
const db = mysql.createPool({
  host: 'localhost',
  user: 'berties_books_app',
  password: 'qwertyuiop',
  database: 'berties_books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
global.db = db; // lab uses this pattern

/* ---- App basics ---- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* ---- Routes ---- */
app.locals.siteName = "Berties Book Shop";
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

/* ---- Home/menu page ---- */
app.get('/', (req,res) => res.render('index'));

/* ---- Start ---- */
app.listen(port, '0.0.0.0', () => {
  console.log(`Berties Books listening on ${port}`);
});
