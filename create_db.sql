-- create_db.sql
-- Creates the berties_books database, books table and app user

-- Create the database if it does not already exist
CREATE DATABASE IF NOT EXISTS berties_books;

-- Use the database
USE berties_books;

-- Create the books table if it does not already exist
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT,
  name VARCHAR(50),
  price DECIMAL(5,2) UNSIGNED,
  PRIMARY KEY (id)
);

-- Create the application user if it does not already exist
CREATE USER IF NOT EXISTS 'berties_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop';

-- Give the application user access to the berties_books database
GRANT ALL PRIVILEGES ON berties_books.* TO 'berties_books_app'@'localhost';

FLUSH PRIVILEGES;
