-- Create DB (idempotent) & use it
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

-- Table
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT,
  name VARCHAR(50),
  price DECIMAL(5,2) UNSIGNED,
  PRIMARY KEY (id)
);

-- App user with least-privilege (run locally now; run again on VM later)
CREATE USER IF NOT EXISTS 'berties_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop';
GRANT ALL PRIVILEGES ON berties_books.* TO 'berties_books_app'@'localhost';
