const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8000;

/* --- View engine + body parsing --- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* --- MySQL pool --- */
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

/* --- Static pages (to match the menu screenshot) --- */
app.get('/',       (req, res) => res.render('index.ejs'));
app.get('/about',  (req, res) => res.render('about.ejs'));
app.get('/search', (req, res) => res.render('search.ejs'));
app.get('/register',(req,res) => res.render('register.ejs'));

/* --- Books router --- */
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

/* --- (nice) basic error handlers --- */
app.use((req,res)=>res.status(404).send('404 Not Found'));
app.use((err,req,res,next)=>{ console.error(err); res.status(500).send('Server error'); });

/* --- Start server (bind all interfaces) --- */
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
