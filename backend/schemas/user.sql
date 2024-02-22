CREATE TABLE user(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number BIGINT NOT NULL,
    password VARCHAR(255) NOT NULL 
)