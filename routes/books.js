const express = require('express');
const router = express.Router();
const db = global.db;

/* D2: List all books -> views/list.ejs */
router.get('/list', (req, res, next) => {
  db.query('SELECT * FROM books', (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

/* D3: Add book (GET form) */
router.get('/addbook', (req, res) => res.render('addbook'));

/* D3: Add book (POST submit -> confirmation text) */
router.post('/bookadded', (req, res, next) => {
  const { name = '', price = '' } = req.body;
  db.query('INSERT INTO books (name, price) VALUES (?, ?)', [name, price],
    err => err ? next(err)
              : res.send(' This book is added to database, name: ' + name + ' price ' + price));
});

/* E1: Bargain books (< £20) -> reuse list.ejs */
router.get('/bargainbooks', (req, res, next) => {
  db.query('SELECT * FROM books WHERE price < 20', (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

/* E2: Search (form) */
router.get('/search', (req, res) => res.render('search'));

/* E2: Search result (advanced LIKE) -> reuse list.ejs */
router.get('/searchresult', (req, res, next) => {
  const keyword = req.query.keyword || '';
  db.query('SELECT * FROM books WHERE name LIKE ?', [`%${keyword}%`],
    (err, rows) => err ? next(err) : res.render('list', { availableBooks: rows }));
});

module.exports = router;
