// Let /books land on the list page
router.get('/', (req, res) => res.redirect('/books/list'));
const express = require('express');
const router = express.Router();

/* List all books (Part D Task 2 – render nicely) */
router.get('/list', (req, res, next) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, result) =>
    err ? next(err) : res.render('list', { availableBooks: result })
  );
});

/* Add Book (Part D Task 3) */
router.get('/addbook', (req, res) => res.render('addbook'));

router.post('/bookadded', (req, res, next) => {
  const sql = 'INSERT INTO books (name, price) VALUES (?, ?)';
  const params = [req.body.name, req.body.price];
  db.query(sql, params, (err) => {
    if (err) return next(err);
    res.send(`This book is added to database, name: ${req.body.name} price ${req.body.price}`);
  });
});

/* Extension: Bargain books (< £20) (Part E Task 1) */
router.get('/bargainbooks', (req, res, next) => {
  const sql = 'SELECT * FROM books WHERE price < 20';
  db.query(sql, (err, result) =>
    err ? next(err) : res.render('list', { availableBooks: result })
  );
});

/* Search (Part E Task 2): basic + advanced LIKE */
router.get('/search', (req, res) => res.render('search'));

router.get('/searchresult', (req, res, next) => {
  const keyword = req.query.keyword || '';
  // Advanced: partial match; satisfies the “update to advanced” instruction.
  const sql = 'SELECT * FROM books WHERE name LIKE ?';
  db.query(sql, [`%${keyword}%`], (err, result) =>
    err ? next(err) : res.render('list', { availableBooks: result })
  );
});

module.exports = router;
