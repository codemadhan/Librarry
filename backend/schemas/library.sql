CREATE TABLE library(
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(255) UNIQUE NOT NULL,
    book_author VARCHAR(255) NOT NULL,
    book_subject VARCHAR(255) NOT NULL,
    published_date DATE NOT NULL
)