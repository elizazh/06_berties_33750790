// routes/users.js
// User registration, login, authorisation, validation, sanitisation, audit.

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const db = global.db;
const saltRounds = 10;

// ===== Middleware to protect routes (Lab 8a: Authorisation) =====
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('./login'); // redirect to login page
  }
  next(); // user is logged in → proceed
};

// ===== Registration form (GET) =====
router.get('/register', (req, res) => {
  res.render('register', {
    errors: [],
    old: {},
  });
});

// ===== Handle registration (POST) – Labs 7 + 8 =====
router.post(
  '/registered',
  [
    // Lab 8b: Validation
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email address.'),
    check('username')
      .isLength({ min: 5, max: 20 })
      .withMessage('Username must be between 5 and 20 characters long.'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Re-display register page with errors + previously entered values
      return res.render('register', {
        errors: errors.array(),
        old: {
          first: req.body.first,
          last: req.body.last,
          email: req.body.email,
          username: req.body.username,
        },
      });
    }

    // Lab 8b/c: Sanitise inputs (protect against XSS)
    const first = req.sanitize(req.body.first);
    const last = req.sanitize(req.body.last);
    const email = req.sanitize(req.body.email);
    const username = req.sanitize(req.body.username);

    // Do NOT sanitise password – it must be stored exactly then hashed
    const plainPassword = req.body.password;

    // Lab 7: hash password before storing
    bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      const sql =
        'INSERT INTO users (username, first, last, email, hashedPassword) VALUES (?, ?, ?, ?, ?)';
      const params = [username, first, last, email, hashedPassword];

      db.query(sql, params, (err2) => {
        if (err2) {
          return next(err2);
        }

        // Debug-style response as in the lab sheet
        let result =
          'Hello ' +
          first +
          ' ' +
          last +
          ' you are now registered! We will send an email to you at ' +
          email +
          '. ';
        result +=
          'Your password is: ' +
          plainPassword +
          ' and your hashed password is: ' +
          hashedPassword;

        res.send(result);
      });
    });
  }
);

// ===== List users – protected (Labs 7 + 8a) =====
router.get('/list', redirectLogin, (req, res, next) => {
  const sql =
    'SELECT username, first, last, email FROM users ORDER BY username ASC';
  db.query(sql, (err, results) => {
    if (err) {
      return next(err);
    }
    res.render('users_list', { users: results });
  });
});

// ===== Login form (GET) =====
router.get('/login', (req, res) => {
  res.render('login', { error: '' });
});

// ===== Helper: record login attempts (Lab 7 extension) =====
function recordAudit(username, success, callback) {
  const sql =
    'INSERT INTO login_audit (username, success, loginTime) VALUES (?, ?, NOW())';
  db.query(sql, [username, success ? 1 : 0], callback);
}

// ===== Handle login (POST) – Labs 7 + 8 =====
router.post('/loggedin', (req, res, next) => {
  const username = req.body.username;
  const plainPassword = req.body.password;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      return next(err);
    }

    if (results.length === 0) {
      // No such user – failed login
      return recordAudit(username, false, (auditErr) => {
        if (auditErr) {
          return next(auditErr);
        }
        return res.render('login', {
          error: 'Login failed: incorrect username or password.',
        });
      });
    }

    const user = results[0];
    const hashedPassword = user.hashedPassword;

    // Compare supplied password with stored hash (Lab 7)
    bcrypt.compare(plainPassword, hashedPassword, (err2, match) => {
      if (err2) {
        return next(err2);
      }

      if (match) {
        // Successful login – create session (Lab 8a)
        req.session.userId = username;

        // Record successful login in audit table (Lab 7 extension)
        recordAudit(username, true, (auditErr) => {
          if (auditErr) {
            return next(auditErr);
          }
          res.send(
            'Login successful! <a href="../">Home</a> | <a href="./logout">Logout</a>'
          );
        });
      } else {
        // Wrong password – failed login
        recordAudit(username, false, (auditErr) => {
          if (auditErr) {
            return next(auditErr);
          }
          return res.render('login', {
            error: 'Login failed: incorrect username or password.',
          });
        });
      }
    });
  });
});

// ===== Logout route (Lab 8a) =====
router.get('/logout', redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('./');
    }
    res.send(
      'You are now logged out. <a href="../">Home</a> | <a href="./login">Login again</a>'
    );
  });
});

// ===== Audit route – show all login attempts (Lab 7 extension) =====
router.get('/audit', redirectLogin, (req, res, next) => {
  const sql =
    'SELECT username, success, loginTime FROM login_audit ORDER BY loginTime DESC';
  db.query(sql, (err, results) => {
    if (err) {
      return next(err);
    }
    res.render('audit', { audits: results });
  });
});

module.exports = router;
