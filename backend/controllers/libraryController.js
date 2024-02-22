import pool from "../utitlities/database.js";

export const addBookType = async (req, res) => {
    try{
        const {bookName , author , subject , dateOfPublishing} = req.body;

        const [result]  = await pool.query('INSERT INTO library (book_name , book_author , book_subject , published_date) VALUES(? , ? , ? , ?)' , [bookName , author , subject , dateOfPublishing]);
        
        console.log(result);

        res.json({message : 'Book Type Created'});

    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
}

export const deleteBookType = async (req, res) => {
    try{
        const book_id = req.params.id;
        console.log(req.params.id);
        console.log(book_id);

        const [result] = await pool.query('DELETE FROM library WHERE book_id = ?', [book_id]);

        console.log(result);

        res.json({message : 'Book Type Deleted'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
}

export const updateBookType = async (req, res) => {
    try{
        const book_id = req.params.id;
        const {book_name , book_author , book_subject , published_date} = req.body;

        const [result] = await pool.query('UPDATE library SET book_name = ? , book_author = ? , book_subject = ? , published_date = ? WHERE book_id = ?', [book_name , book_author , book_subject, book_id , published_date]);

        console.log(result);

        res.json({message : 'Book Type Updated'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }

}

export const getAllBookType = async (req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM library');

        res.status(200).send(result);

    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
}

export const getFilteredBook = async (req, res) => {
    try{
        const {book_name , book_author , book_subject , published_date} = req.params;

        let sql = 'SELECT * FROM library WHERE 1=1';
        const params = [];

        if (author) {
            sql += ' AND book_author = ?';
            params.push(book_author);
        }
        if (publishDate) {
            sql += ' AND publish_date = ?';
            params.push(published_date);
        }
        if (bookName) {
            sql += ' AND book_name LIKE ?';
            params.push(`%${book_name}%`); // Using LIKE for partial matching
        }
        if (subject) {
            sql += ' AND book_subject = ?';
            params.push(book_subject);
        }

        // Execute the SQL query with parameters
        const [books] = await pool.query(sql, params);
        res.json(books);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'internal server error'});
    }
}