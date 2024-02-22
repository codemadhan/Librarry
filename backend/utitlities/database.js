import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'bnghwr2fr2qbtkftsph3-mysql.services.clever-cloud.com',
    user: 'um7nzzhwioxoj60p',
    database: 'bnghwr2fr2qbtkftsph3',
    password: '1UPCdEjkYBTWnspuwRYY',
    waitForConnections: true,
    connectionLimit: 10      
}).promise();

// Function to create tables if they do not exist
const createTables = async () => {
    try {
        // Create user table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone_number BIGINT NOT NULL,
                password VARCHAR(255) NOT NULL 
            )
        `);

        // Create library table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS library (
                book_id INT AUTO_INCREMENT PRIMARY KEY,
                book_name VARCHAR(255) UNIQUE NOT NULL,
                book_author VARCHAR(255) NOT NULL,
                book_subject VARCHAR(255) NOT NULL,
                published_date DATE NOT NULL
            )
        `);

        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

// Call the function to create tables
createTables();

export default pool;
