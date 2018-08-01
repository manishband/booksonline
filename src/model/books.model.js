import mongoose from 'mongoose';
import Joi from 'joi';
import UserSchema from './user.model'

const BooksSchema = mongoose.Schema({
    name: String,
    owner:[{type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}],
    genere:String,
    publisher:String,
    price: Number,
    lastupdated:{type:Date, default:Date.now},
    delete:{type:Boolean,default:false},
    lastUpdatedBy:{type:Object}
}, {collection : 'books'});

let BooksModel = mongoose.model('books', BooksSchema);

BooksModel.getAll = () => {
    return BooksModel.find({delete:false})
    .sort('_id');
}

BooksModel.getBook = (book_id) => {
    return BooksModel.find({'_id':book_id,delete:false});
}

BooksModel.removeBooks = (booksName) => {
    return BooksModel.remove({name: booksName});
}


export default BooksModel;