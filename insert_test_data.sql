-- insert_test_data.sql
USE berties_books;

INSERT INTO books (name, price) VALUES
('Brighton Rock', 20.25),
('Brave New World', 25.00),
('Animal Farm', 12.99),
('Atlas of the World', 30.50),
('The Hobbit', 15.99);
INSERT INTO users (username, first, last, email, hashedPassword)
VALUES ('gold', 'Goldy', 'Smith', 'gold@example.com',
        '$2b$10$5YXrQJL3mQ2buIV0kmJezpPA2k5y0Iz1OZq0F.hbUH85fCeFP1o');
