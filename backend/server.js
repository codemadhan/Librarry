import express from 'express';
import cors from 'cors';
import pool from './utitlities/database.js';
import UserRouter from './routers/userRouter.js';
import AdminRouter from './routers/adminRouter.js';
import LibraryRouter from './routers/libraryRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

pool.getConnection((err , Connection) => {
    if(err){
        console.error('Error connecting to the database' , err.stack);
    }
    console.log('Connected to the database');
    connection.release();
})

app.use('/user' , UserRouter);
app.use('/admin' , AdminRouter);
app.use('/library' , LibraryRouter);

app.listen(8000 , () => {
    console.log('Server running on port 8000');
})