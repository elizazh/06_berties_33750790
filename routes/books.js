// routes/books.js
const express = require('express');
const router = express.Router();

// use the pool created in index.js
const db = global.db;

// /books/list  -> table view
router.get('/list', (req, res, next) => {
  db.query('SELECT id, name, price FROM books ORDER BY id', (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// /books/bargainbooks  -> price < 20
router.get('/bargainbooks', (req, res, next) => {
  db.query('SELECT id, name, price FROM books WHERE price < 20 ORDER BY price ASC', (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// add form
router.get('/addbook', (_req, res) => res.render('addbook.ejs'));

// handle add
router.post('/bookadded', (req, res, next) => {
  const { name, price } = req.body;
  db.query('INSERT INTO books (name, price) VALUES (?, ?)', [name, price], (err) => {
    if (err) return next(err);
    res.redirect('/books/list');
  });
});

// exact search
router.get('/search', (req, res, next) => {
  const { keyword } = req.query;
  db.query('SELECT name, price FROM books WHERE name = ?', [keyword], (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// advanced (case-insensitive, partial)
router.get('/search-adv', (req, res, next) => {
  const keyword = (req.query.keyword || '').trim();
  const sql =
    'SELECT name, price FROM books WHERE LOWER(name) LIKE LOWER(CONCAT("%", ?, "%"))';
  db.query(sql, [keyword], (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

module.exports = router;
