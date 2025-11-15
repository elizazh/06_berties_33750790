// routes/books.js
// All routes related to books

const express = require('express');
const router = express.Router();

// List all books
router.get('/list', function (req, res, next) {
  const sqlquery = 'SELECT * FROM books ORDER BY name ASC';

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(err);
    }
    res.render('list', {
      title: 'All Books',
      availableBooks: result
    });
  });
});

// Show the "Add Book" form
router.get('/addbook', function (req, res, next) {
  res.render('addbook', {
    title: 'Add a New Book'
  });
});

// Handle the Add Book form POST and confirm the book was added
router.post('/bookadded', function (req, res, next) {
  const name = req.body.name;
  const price = req.body.price;

  const sqlquery = 'INSERT INTO books (name, price) VALUES (?, ?)';
  const newrecord = [name, price];

  db.query(sqlquery, newrecord, (err, result) => {
    if (err) {
      return next(err);
    }

    // Render a confirmation page instead of plain text
    res.render('bookadded', {
      title: 'Book Added',
      book: {
        name: name,
        price: price
      }
    });
  });
});

// EXTRA: Bargain books (< £20)
router.get('/bargainbooks', function (req, res, next) {
  const sqlquery = 'SELECT * FROM books WHERE price < 20 ORDER BY price ASC';

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(err);
    }
    res.render('bargainbooks', {
      title: 'Bargain Books (Under £20)',
      bargainBooks: result
    });
  });
});

// EXTRA: Search functionality

// Show the search form (GET)
router.get('/search', function (req, res, next) {
  res.render('search', {
    title: 'Search Books',
    searchTerm: '',
    searchResults: []
  });
});

// Handle the search form (POST)
router.post('/search', function (req, res, next) {
  const searchTerm = req.body.searchTerm || '';

  // Advanced search using LIKE for partial matches
  // Example: 'World' matches 'Brave New World', 'Atlas of the World'
  const sqlquery = 'SELECT * FROM books WHERE name LIKE ? ORDER BY name ASC';
  const likeTerm = '%' + searchTerm + '%';

  db.query(sqlquery, [likeTerm], (err, result) => {
    if (err) {
      return next(err);
    }

    res.render('search', {
      title: 'Search Books',
      searchTerm: searchTerm,
      searchResults: result
    });
  });
});

module.exports = router;
