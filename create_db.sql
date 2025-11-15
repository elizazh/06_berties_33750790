-- Create DB and table (with IF NOT EXISTS as per lab)
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  price DECIMAL(5,2) UNSIGNED
);

-- App user + privileges (Lab 6 asks to include these at end)
CREATE USER IF NOT EXISTS 'berties_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop';
GRANT ALL PRIVILEGES ON berties_books.* TO 'berties_books_app'@'localhost';
