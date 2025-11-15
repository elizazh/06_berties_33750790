const express = require('express');
const router = express.Router();

// /books -> /books/list
router.get('/', (req, res) => res.redirect('/books/list'));

// List all books
router.get('/list', (req, res, next) => {
  db.query('SELECT * FROM books', (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

// Add book (form)
router.get('/addbook', (req, res) => res.render('addbook'));

// Add book (submit)
router.post('/bookadded', (req, res, next) => {
  const { name, price } = req.body;
  db.query('INSERT INTO books (name, price) VALUES (?, ?)', [name, price], err =>
    err ? next(err) : res.send(`This book is added to database, name: ${name} price ${price}`)
  );
});

// EXTRA: bargain books (< £20)
router.get('/bargainbooks', (req, res, next) => {
  db.query('SELECT * FROM books WHERE price < 20', (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

// Search page (exact + advanced forms)
router.get('/search', (req, res) => res.render('search'));

// Exact search
router.get('/searchexact', (req, res, next) => {
  const title = (req.query.title || '').trim();
  if (!title) return res.render('list', { availableBooks: [] });
  db.query('SELECT * FROM books WHERE name = ?', [title], (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

// Advanced search (LIKE)
router.get('/searchresult', (req, res, next) => {
  const keyword = (req.query.keyword || '').trim();
  db.query('SELECT * FROM books WHERE name LIKE ?', [`%${keyword}%`], (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

module.exports = router;
