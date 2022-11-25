import mongoose from 'mongoose';
import Book from '../models/Book.js'



export const getBooks = async(req,res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) -1) * LIMIT;
        const total =await Book.countDocuments({});

        const books = await Book.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data:books, currentPage:Number(page), numberOfPages:Math.ceil(total/LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getBookBySearch = async(req,res) => {
    const { searchQuery,author } = req.query;

    try {
      const title = new RegExp(searchQuery, 'i');
      
      const books = await Book.find({ $or: [ {title}, {author} ] });

      res.json({ data: books })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getBook = async(req,res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);

        res.status(200).json(book)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};


export const addBook = async(req,res) => {
    const book =req.body;

    const newBook = new Book({ ...book,creator:req.userId });
    try {
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

export const updateBook = async(req,res) => {
    const id = req.params.id;
    const { title, author, description, price, content, image } = req.body;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, {
            title,
            author,
            description,
            price,
            content,
            image,
        });
        book = await book.save();
    } catch (err) {
        console.log(err)
    }

    if (!book) {
        return res.status(404).json({ message: 'Unable To Update By This ID' })
    }
    return res.status(200).json({ book })
};

export const deletedBook = async(req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Post With That id:${id}`);

    await Book.findByIdAndDelete(id);

    res.json({ message: 'Book deleted successfully. '});
}

