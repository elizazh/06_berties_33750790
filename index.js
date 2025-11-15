const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 8000;

// DB (MySQL/MariaDB)
global.db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'berties'
});
db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Express + EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Home
app.get('/', (req, res) => res.render('index'));

// Books routes
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// 404 minimal
app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => console.log(`Bertie’s Books on ${PORT}`));
