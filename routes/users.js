// routes/users.js
// User registration, listing, login and audit

const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const saltRounds = 10;

// ---------- Register form ----------
router.get('/register', (req, res) => {
  res.render('register');
});

// ---------- Handle registration ----------
router.post('/registered', (req, res, next) => {
  const plainPassword = req.body.password;

  bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
    if (err) return next(err);

    const sqlquery = `
      INSERT INTO users (username, first, last, email, hashedPassword)
      VALUES (?, ?, ?, ?, ?)
    `;
    const newUser = [
      req.body.username,
      req.body.first,
      req.body.last,
      req.body.email,
      hashedPassword
    ];

    db.query(sqlquery, newUser, (err2, result) => {
      if (err2) return next(err2);

      // Debug-style response as in the lab sheet
      let message =
        'Hello ' +
        req.body.first +
        ' ' +
        req.body.last +
        ' you are now registered! We will send an email to you at ' +
        req.body.email;

      message +=
        '<br>Your password is: ' +
        req.body.password +
        '<br>Your hashed password is: ' +
        hashedPassword;

      res.send(message);
    });
  });
});

// ---------- List users (no passwords) ----------
router.get('/list', (req, res, next) => {
  const sqlquery = 'SELECT username, first, last, email FROM users';

  db.query(sqlquery, (err, result) => {
    if (err) return next(err);
    res.render('users_list', { users: result });
  });
});

// ---------- Login form ----------
router.get('/login', (req, res) => {
  res.render('login');
});

// ---------- Handle login + audit ----------
router.post('/loggedin', (req, res, next) => {
  const { username, password } = req.body;

  const sqlquery = 'SELECT hashedPassword FROM users WHERE username = ?';

  db.query(sqlquery, [username], (err, result) => {
    if (err) return next(err);

    if (result.length === 0) {
      // user not found -> record audit and fail
      return recordAudit(username, 0, (err2) => {
        if (err2) return next(err2);
        res.send('Login failed: user not found');
      });
    }

    const hashedPassword = result[0].hashedPassword;

    bcrypt.compare(password, hashedPassword, function (err2, match) {
      if (err2) return next(err2);

      recordAudit(username, match ? 1 : 0, (err3) => {
        if (err3) return next(err3);

        if (match) {
          res.send('Login successful! Welcome ' + username);
        } else {
          res.send('Login failed: incorrect password');
        }
      });
    });
  });
});

// ---------- Audit log page ----------
router.get('/audit', (req, res, next) => {
  const sqlquery =
    'SELECT username, success, loginTime FROM login_audit ORDER BY loginTime DESC';

  db.query(sqlquery, (err, result) => {
    if (err) return next(err);
    res.render('audit', { audits: result });
  });
});

// ---------- Helper: insert into login_audit ----------
function recordAudit(username, success, callback) {
  const sqlquery =
    'INSERT INTO login_audit (username, success, loginTime) VALUES (?, ?, NOW())';
  const data = [username, success];

  db.query(sqlquery, data, callback);
}

module.exports = router;
