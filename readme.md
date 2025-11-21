# Berties Book Shop – Lab 6 & 7

Dynamic Web Apps coursework – Berties Book Shop app with user registration, login and password hashing.

## 1. Overview

This app is a simple Node.js + Express web application for managing a small book shop.  
Features:

- View all books
- Add a new book
- View bargain books (priced under £20)
- Search for books by title keyword
- Register a new user
- Log in as an existing user
- View a list of users
- View a login audit (successful / failed logins)

Passwords are **never stored in plain text**. They are hashed using **bcrypt** before being saved in the database.

---

## 2. Technologies

- Node.js / Express
- MySQL
- EJS templates
- bcrypt for password hashing

---

## 3. Database setup

Run these scripts in MySQL to create and populate the database.

```bash
mysql -u berties_books_app -p
