Berties Book Shop – Lab 6 & 7 & 8

Dynamic Web Apps coursework – Berties Book Shop app with user registration, login and password hashing.

1. Overview

This app is a simple Node.js + Express web application for managing a small book shop.
Features:

View all books
Add a new book
View bargain books (priced under £20)
Search for books by title keyword
Register a new user
Log in as an existing user
View a list of users
View a login audit (successful / failed logins)
Passwords are never stored in plain text. They are hashed using bcrypt before being saved in the database.

2. Technologies

Node.js / Express
MySQL
EJS templates
bcrypt for password hashing
3. Database setup

Running the app
The app listens on port 8000.

On the Goldsmiths server:

The app is available at:
http://doc.gold.ac.uk/usr/417/
On the VM directly:

Start the app: forever start index.js (or node index.js for testing)
Open in a browser: http://localhost:8000/
## authorisation

I used `express-session` to create sessions. On successful login in
`/users/loggedin` I save `req.session.userId = username`. I added a
`redirectLogin` middleware and applied it to `/users/list`, `/users/audit` and
`/books/list` so these pages can only be accessed by logged-in users. I also
added a `/users/logout` route that destroys the session.

## validation

I used `express-validator` in the `/users/registered` route to validate the
registration form. The server checks that the email is valid, the username is
between 5 and 20 characters, and the password is at least 8 characters long. If
validation fails, the user is shown the register page again with error messages.

## sanitisation

I used `express-sanitizer` to protect against XSS attacks. On the registration
page, I sanitise the `first`, `last`, `email` and `username` fields before using
or storing them. This stops input like `Henry <script>alert("Gotcha!")</script>`
from running as JavaScript.

