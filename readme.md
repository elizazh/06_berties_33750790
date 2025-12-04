
# Berties Book Shop – Labs 6-9

Dynamic Web Apps coursework – Berties Book Shop app with:

- Book listing, adding, bargain books and search (Lab 6)
- User registration, login, password hashing and login audit (Lab 7)
- Authorisation with sessions, validation and sanitisation (Lab 8)

---

## 1. Overview

This app is a simple Node.js + Express web application for managing a small book shop and demonstrating secure user management.

Main features:

- View all books
- Add a new book
- View bargain books (priced under £20)
- Search for books by title keyword
- Register a new user
- Log in as an existing user
- View a list of users (no passwords shown)
- View a login audit (successful / failed logins)
- Authorisation: some pages only accessible when logged in
- Validation and sanitisation on registration

Passwords are **never stored in plain text**. They are hashed using `bcrypt` before being saved in the database.

---

## 2. Features by Lab

### Lab 6 – Books

- `/books/list` – list all books ordered by name
- `/books/addbook` (GET) – show “Add Book” form
- `/books/bookadded` (POST) – insert a new book into the database
- `/books/bargainbooks` – list all books priced under £20
- `/books/search` (GET/POST) – search for books by title keyword

### Lab 7 – Users & Password Hashing

- `/users/register` – registration form
- `/users/registered` (POST)  
  - creates a new user  
  - hashes the password with `bcrypt` and stores it in `hashedPassword`
- `/users/list` – list all users (username, first, last, email)
- `/users/login` – login form
- `/users/loggedin` (POST)  
  - checks the username and password  
  - compares the supplied password with the stored hash using `bcrypt.compare`
- `/users/audit` – shows login history from the `login_audit` table

Both **successful** and **failed** logins are recorded in `login_audit` with a timestamp.

### Lab 8 – Authorisation, Validation, Sanitisation

- `express-session` used to create sessions and remember the logged-in user
- “Protected” routes using a `redirectLogin` middleware:
  - `/users/list`
  - `/users/audit`
  - `/books/list`
- `/users/logout` – logs the user out by destroying the session
- Validation and sanitisation are applied to registration via `express-validator` and `express-sanitizer`

---

## 3. Technologies

- **Node.js / Express**
- **MySQL** (via `mysql2` connection pool)
- **EJS** templates for views
- **bcrypt** for password hashing
- **express-session** for sessions (authorisation)
- **express-validator** for server-side validation
- **express-sanitizer** for XSS protection
- **forever** to keep the app running on the VM

---

## 4. Database

Database name: `berties_books`

Main tables used:

- `books`
  - `id` (INT, PK)
  - `name` (VARCHAR)
  - `price` (DECIMAL)
- `users`
  - `id` (INT, PK)
  - `username` (VARCHAR)
  - `first` (VARCHAR)
  - `last` (VARCHAR)
  - `email` (VARCHAR)
  - `hashedPassword` (VARCHAR) – bcrypt hash, never plain text
- `login_audit`
  - `id` (INT, PK)
  - `username` (VARCHAR)
  - `success` (TINYINT / BOOLEAN)
  - `loginTime` (DATETIME)

A default test user `gold` with password `smiths` is created in the SQL scripts, so the marker can log in and test protected routes quickly.
## Lab 9a - /weather (Calling an external API)

The route `/weather` calls the OpenWeather API using the `request` library.
The user can enter a city name, and the server sends a request to
`http://api.openweathermap.org/data/2.5/weather` with the city, metric units
and an API key. The JSON response is parsed and the temperature, humidity and
description are shown on a web page. If the city is not valid or the API
returns an error, a friendly error message is displayed instead of crashing.

## Lab 9b - /api/books (Providing a JSON API)

The route `/api/books` returns a JSON array of books from the database.

It supports the following query parameters:

- `search` – e.g. `/api/books?search=world` returns only books whose `name`
  contains "world".
- `minprice` and `max_price` – e.g. `/api/books?minprice=5&max_price=10`
  returns books priced between 5 and 10 (inclusive).
- `sort` – e.g. `/api/books?sort=name` sorts by name, and
  `/api/books?sort=price` sorts by price.

The route uses parameterised SQL queries (`?` placeholders) to avoid SQL
injection and returns results in JSON so other programs can consume the data.
---

## 5. Running the App

### On the Goldsmiths server (for marking)

- The app listens on **port 8000**.
- The public URL for the marker is:

```text
http://doc.gold.ac.uk/usr/417/
