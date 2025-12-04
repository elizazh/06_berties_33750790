// routes/api.js
// Lab 9b - Providing an API for books

const express = require('express');
const router = express.Router();

const db = global.db;

// GET /api/books
// Optional query params:
//   ?search=world
//   ?minprice=5&max_price=10
//   ?sort=name  or  ?sort=price
router.get('/books', (req, res) => {
  const search = req.query.search || '';
  const minprice = req.query.minprice;
  const maxprice = req.query.max_price; // lab uses max_price
  const sort = req.query.sort;

  let sql = 'SELECT * FROM books';
  const params = [];
  const conditions = [];

  // Filter: name contains search term
  if (search) {
    conditions.push('name LIKE ?');
    params.push('%' + search + '%');
  }

  // Filter: price range
  if (minprice) {
    conditions.push('price >= ?');
    params.push(Number(minprice));
  }
  if (maxprice) {
    conditions.push('price <= ?');
    params.push(Number(maxprice));
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // Sorting
  if (sort === 'name') {
    sql += ' ORDER BY name ASC';
  } else if (sort === 'price') {
    sql += ' ORDER BY price ASC';
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(result);
  });
});

module.exports = router;
