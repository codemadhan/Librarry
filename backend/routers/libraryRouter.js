import express from 'express';
import { addBookType, deleteBookType, getAllBookType, getFilteredBook, updateBookType } from '../controllers/libraryController.js'

const router = express.Router();

router.get('/books' , getAllBookType);

router.post('/add-book' , addBookType);

router.post('/:id' , updateBookType);

router.delete('/:id' , deleteBookType);

router.get('/filter-books' , getFilteredBook);

export default router;