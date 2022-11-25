import mongoose from 'mongoose';



const bookSchema = mongoose.Schema({
    title:{ type:String, required:true },
    author:{ type:String, required:true },
    creator:{ type:String, required:true },
    description:{ type:String, required:true },
    price:{ type:Number, required:true },
    content:{ type:String, },
    image:{ type:String, }
});


var Book = mongoose.model('Book',bookSchema);

export default Book;