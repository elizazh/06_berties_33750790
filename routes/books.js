const express = require('express');
const router = express.Router();
const db = global.db; // mysql2 pool created in index.js

// /books -> /books/list
router.get('/', (req, res) => res.redirect('/books/list'));

// LIST
router.get('/list', (req, res, next) => {
  db.query('SELECT * FROM books', (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

// ADD BOOK (form + submit)
router.get('/addbook', (req, res) => res.render('addbook'));
router.post('/bookadded', (req, res, next) => {
  const { name = '', price = '' } = req.body;
  db.query('INSERT INTO books (name, price) VALUES (?,?)', [name, price],
    (err) => err ? next(err) : res.send(`This book is added to database, name: ${name} price ${price}`));
});

// BARGAINS (< £20)
router.get('/bargainbooks', (req, res, next) => {
  db.query('SELECT * FROM books WHERE price < 20', (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

// SEARCH PAGES (both show the same form to avoid 404s)
router.get('/search', (req, res) => res.render('search'));
router.get('/searchexact', (req, res) => res.render('search'));

// SEARCH RESULT (advanced LIKE)
router.get('/searchresult', (req, res, next) => {
  const keyword = req.query.keyword || req.query.title || '';
  db.query('SELECT * FROM books WHERE name LIKE ?', [`%${keyword}%`],
    (err, rows) => err ? next(err) : res.render('list', { availableBooks: rows }));
});

module.exports = router;