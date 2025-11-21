-- create_db.sql
CREATE DATABASE IF NOT EXISTS berties_books;

USE berties_books;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT,
  name VARCHAR(50),
  price DECIMAL(5,2) UNSIGNED,
  PRIMARY KEY (id)
);

-- Create the application user (for Node app)
CREATE USER IF NOT EXISTS 'berties_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop';

GRANT ALL PRIVILEGES ON berties_books.* TO 'berties_books_app'@'localhost';

FLUSH PRIVILEGES;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE,
  first VARCHAR(50),
  last VARCHAR(50),
  email VARCHAR(100),
  hashedPassword VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS login_audit (
  id INT AUTO_INCREMENT,
  username VARCHAR(50),
  success TINYINT(1),
  loginTime DATETIME,
  PRIMARY KEY (id)
);
