const express = require('express');
const router = express.Router();

// /books -> /books/list (prevents "Cannot GET /books")
router.get('/', (req, res) => res.redirect('/books/list'));

// list all
router.get('/list', (req, res, next) => {
  req.db.query('SELECT * FROM books', (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

// add form
router.get('/addbook', (req, res) => res.render('addbook'));

// add submit
router.post('/bookadded', (req, res, next) => {
  const { name, price } = req.body;
  req.db.query('INSERT INTO books (name, price) VALUES (?, ?)', [name, price], err =>
    err ? next(err) : res.redirect('/books/list')
  );
});

// bargains
router.get('/bargainbooks', (req, res, next) => {
  req.db.query('SELECT * FROM books WHERE price < 20', (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

// search (advanced LIKE)
router.get('/search', (req, res) => res.render('search'));
router.get('/searchresult', (req, res, next) => {
  const k = req.query.keyword || '';
  req.db.query('SELECT * FROM books WHERE name LIKE ?', [`%${k}%`], (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

// (optional exact to match link)
router.get('/searchexact', (req, res) => res.render('search'));
router.get('/searchexactresult', (req, res, next) => {
  const k = req.query.keyword || '';
  req.db.query('SELECT * FROM books WHERE name = ?', [k], (err, rows) =>
    err ? next(err) : res.render('list', { availableBooks: rows })
  );
});

module.exports = router;
