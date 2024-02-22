CREATE TABLE admin(
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number BIGINT NOT NULL,
    password VARCHAR(255) NOT NULL 
)