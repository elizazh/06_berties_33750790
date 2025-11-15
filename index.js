const express = require('express');
const path = require('path');
const mysql = require('mysql'); // matches your package.json
const app = express();
const PORT = 8000;

// views + static + forms
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'berties_books_app',
  password: 'qwertyuiop',
  database: 'berties_books'
});
db.connect(err => { if (err) console.error('DB connect error:', err); });

// make db available to routers
app.use((req, res, next) => { req.db = db; next(); });

// home page
app.get('/', (req, res) => res.render('index'));

// mount books router
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// 404 (optional)
app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => console.log(`Bertie’s Books on ${PORT}`));
