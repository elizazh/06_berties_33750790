-- insert_test_data.sql
USE berties_books;

INSERT INTO books (name, price) VALUES
('Brighton Rock', 20.25),
('Brave New World', 25.00),
('Animal Farm', 12.99),
('Atlas of the World', 30.50),
('The Hobbit', 15.99);
INSERT INTO users (username, first, last, email, hashedPassword)
VALUES ('gold', 'Gold', 'Smiths', 'gold@example.com', '<HASH_GOES_HERE>');
