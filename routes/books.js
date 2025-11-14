const express = require('express');
const router = express.Router();

// 6A–C: LIST (rendered in 6d)
router.get('/list', (req, res, next) => {
  db.query('SELECT * FROM books', (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// 6D: ADD BOOK (form + insert)
router.get('/addbook', (req, res) => res.render('addbook.ejs'));

router.post('/bookadded', (req, res, next) => {
  const sql = 'INSERT INTO books (name, price) VALUES (?, ?)';
  db.query(sql, [req.body.name, req.body.price], (err) => {
    if (err) return next(err);
    res.send('This book is added to database, name: ' + req.body.name + ' price ' + req.body.price);
  });
});

// 6E: BARGAIN BOOKS (< £20)
router.get('/bargainbooks', (req, res, next) => {
  db.query('SELECT name, price FROM books WHERE price < 20', (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// 6E: SEARCH (exact)
router.get('/search', (req, res, next) => {
  const { keyword } = req.query;
  db.query('SELECT name, price FROM books WHERE name = ?', [keyword], (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// 6E: SEARCH (advanced: partial + case-insensitive)
router.get('/search-adv', (req, res, next) => {
  const keyword = (req.query.keyword || '').trim();
  const sql = "SELECT name, price FROM books WHERE LOWER(name) LIKE LOWER(CONCAT('%', ?, '%'))";
  db.query(sql, [keyword], (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

module.exports = router;
