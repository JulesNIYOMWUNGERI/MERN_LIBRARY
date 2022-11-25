import express from 'express';

const router = express.Router();

import auth from '../middleware/auth.js';

import { getBooks,addBook,deletedBook,updateBook, getBook, getBookBySearch } from '../controllers/bookControllers.js'


router.get('/search',getBookBySearch);
router.get('/',getBooks);
router.get('/:id',getBook);
router.post('/',auth,addBook);
router.patch('/:id',auth,updateBook);
router.delete('/:id',auth,deletedBook);



export default router;
