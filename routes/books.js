// routes/books.js
// Routes related to books

const express = require('express');
const router = express.Router();

// List all books
router.get('/list', (req, res, next) => {
  const sqlquery = 'SELECT * FROM books ORDER BY name ASC';

  db.query(sqlquery, (err, result) => {
    if (err) return next(err);
    res.render('list', {
      title: 'All Books',
      availableBooks: result
    });
  });
});

// Show Add Book form
router.get('/addbook', (req, res) => {
  res.render('addbook', { title: 'Add a New Book' });
});

// Handle Add Book form
router.post('/bookadded', (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;

  const sqlquery = 'INSERT INTO books (name, price) VALUES (?, ?)';
  const newrecord = [name, price];

  db.query(sqlquery, newrecord, (err, result) => {
    if (err) return next(err);
    res.render('bookadded', {
      title: 'Book Added',
      book: { name, price }
    });
  });
});

// Bargain books (< £20)
router.get('/bargainbooks', (req, res, next) => {
  const sqlquery = 'SELECT * FROM books WHERE price < 20 ORDER BY price ASC';

  db.query(sqlquery, (err, result) => {
    if (err) return next(err);
    res.render('bargainbooks', {
      title: 'Bargain Books (Under £20)',
      bargainBooks: result
    });
  });
});

// Search form (GET)
router.get('/search', (req, res) => {
  res.render('search', {
    title: 'Search Books',
    searchTerm: '',
    searchResults: []
  });
});

// Search results (POST)
router.post('/search', (req, res, next) => {
  const searchTerm = req.body.searchTerm || '';
  const likeTerm = '%' + searchTerm + '%';

  const sqlquery = 'SELECT * FROM books WHERE name LIKE ? ORDER BY name ASC';

  db.query(sqlquery, [likeTerm], (err, result) => {
    if (err) return next(err);
    res.render('search', {
      title: 'Search Books',
      searchTerm,
      searchResults: result
    });
  });
});

module.exports = router;
