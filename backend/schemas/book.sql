CREATE TABLE book(
    id INT AUTO_INCREMENT PRIMARY KEY , 
    library_id INT NOT NULL , 
    published_date DATE NOT NULL, 
    user_id INT ,

    CONSTRAINT fk_user 
    FOREIGN KEY (user_id) 
    REFERENCES user(user_id),

    CONSTRAINT fk_library
    FOREIGN KEY (library_id)
    REFERENCES library(book_id)
)