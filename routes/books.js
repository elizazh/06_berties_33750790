const express = require('express');
const router = express.Router();

// If someone visits /books, send them to the list
router.get('/', (req, res) => res.redirect('/books/list'));

/* List all books */
router.get('/list', (req, res, next) => {
  db.query('SELECT * FROM books', (err, result) => {
    if (err) return next(err);
    res.render('list', { availableBooks: result });
  });
});

/* Add book (form) */
router.get('/addbook', (req, res) => res.render('addbook'));

/* Add book (submit) */
router.post('/bookadded', (req, res, next) => {
  const sql = 'INSERT INTO books (name, price) VALUES (?, ?)';
  db.query(sql, [req.body.name, req.body.price], (err) => {
    if (err) return next(err);
    res.send(`This book is added to database, name: ${req.body.name} price ${req.body.price}`);
  });
});

/* Bargains (< £20) */
router.get('/bargainbooks', (req, res, next) => {
  db.query('SELECT * FROM books WHERE price < 20', (err, result) => {
    if (err) return next(err);
    res.render('list', { availableBooks: result });
  });
});

/* Search pages */
router.get('/search', (req, res) => res.render('search'));

/* Exact search */
router.get('/searchexact', (req, res, next) => {
  const name = req.query.name || '';
  db.query('SELECT * FROM books WHERE name = ?', [name], (err, result) => {
    if (err) return next(err);
    res.render('list', { availableBooks: result });
  });
});

/* Advanced (partial match) */
router.get('/searchresult', (req, res, next) => {
  const keyword = req.query.keyword || '';
  db.query('SELECT * FROM books WHERE name LIKE ?', [`%${keyword}%`], (err, result) => {
    if (err) return next(err);
    res.render('list', { availableBooks: result });
  });
});

module.exports = router;
