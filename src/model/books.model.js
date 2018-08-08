import mongoose from 'mongoose';
import Joi from 'joi';
import UserSchema from './user.model'
const Schema = mongoose.Schema;

const BooksSchema = Schema({
    _id: Schema.Types.ObjectId,
    updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
    author:{ type: Schema.Types.ObjectId, ref: 'users' },
    name: String,
    genere:String,
    publisher:String,
    price:Number,
    delete:{type:Boolean, default:false},
    lastupdated:{type:Date,default: Date.now()}
  });

let BooksModel = mongoose.model('books', BooksSchema);

BooksModel.getAll = () => {
    return BooksModel.find({delete:false})
    .populate('author', ['firstname','lastname'])
    .sort('_id');
}

BooksModel.getBook = (book_id) => {
    return BooksModel.find({'_id':book_id,delete:false})
    .populate('author', ['firstname','lastname']);
}

BooksModel.editBook = (booksId) => {
    return BooksModel.findById(booksId);
}
BooksModel.removeBooks = (book_id) => {
    return BooksModel.remove({'_id': book_id});
}


export default BooksModel;