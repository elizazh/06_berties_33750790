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
