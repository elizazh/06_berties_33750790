const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8000;

/* MySQL pool (Lab 6 A–C) */
const db = mysql.createPool({
  host: 'localhost',
  user: 'berties_books_app',
  password: 'qwertyuiop',
  database: 'berties_books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
global.db = db;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* Routes for Lab 6 */
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

/* Home page with links (Lab 6D Task 4) */
app.get('/', (req, res) => res.render('index'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Bertie's Books listening on ${port}`);
});
