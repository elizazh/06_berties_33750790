const express = require('express');
const router = express.Router();

// 6A–C: list (JSON endpoint kept for safety)
router.get('/list.json', (req, res, next) => {
  db.query('SELECT * FROM books', (err, rows) => {
    if (err) return next(err);
    res.send(rows);
  });
});

// 6D: list rendered
router.get('/list', (req, res, next) => {
  db.query('SELECT * FROM books', (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// 6D: add book
router.get('/addbook', (req, res) => res.render('addbook.ejs'));

router.post('/bookadded', (req, res, next) => {
  const sql = 'INSERT INTO books (name, price) VALUES (?, ?)';
  db.query(sql, [req.body.name, req.body.price], (err) => {
    if (err) return next(err);
    res.send('This book is added to database, name: ' + req.body.name + ' price ' + req.body.price);
  });
});

// 6E: bargain books
router.get('/bargainbooks', (req, res, next) => {
  db.query('SELECT name, price FROM books WHERE price < 20', (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// 6E: search (exact)
router.get('/search', (req, res, next) => {
  const { keyword } = req.query;
  db.query('SELECT name, price FROM books WHERE name = ?', [keyword], (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

// 6E: search (advanced, partial + case-insensitive)
router.get('/search-adv', (req, res, next) => {
  const { keyword = '' } = req.query;
  const sql = "SELECT name, price FROM books WHERE LOWER(name) LIKE LOWER(CONCAT('%', ?, '%'))";
  db.query(sql, [keyword], (err, rows) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: rows });
  });
});

module.exports = router;
