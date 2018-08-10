import Book from '../model/books.model';
import Users from '../model/user.model';
import Joi from 'joi';
import _ from 'lodash';
import mongoose from 'mongoose';

const controller = {};
controller.getAll = async (req, res) => {
    try {
        const books = await Book.getAll();
        let data = [];
        books.forEach(key => {
            let element = {};
            element.name = key.name;
            element.publisher= key.publisher;
            element.author = key.author;
            element.price =key.price;
            element.genere = key.genere;
            element.id =key.id;
            if(req.session.user != undefined){
                if(req.session.user.role == 'Admin'){
                    element.setEdit = 'show';
                }else{
                    element.setEdit = (key.updatedBy == req.session.user._id || key.author == req.session.user._id)? 'show' :'';
                }
            }else{
                element.setEdit = '';
            }
            
            data.push(element)
        });
        res.render('books',{userDetail:req.session.user,booksResult:data,successAlert:req.flash('success')});
    }
    catch(err) {
        res.send(`${err}`);
    }
}
controller.getAuthors = async (req, res) => {
    try {
        const user = await Users.getAll();
        let authors = [];
        user.forEach(key=>{
            let element ={}
            element.firstname = key.firstname,
            element.lastname = key.lastname,
            element.value = key._id
            authors.push(element);
        })
        res.render('addBooks',{author:authors,errorLogin:req.flash('error')});
    }
    catch(err) {
        res.send('Got error in getAll');
    }
}

controller.getBook = async (req, res) => {
    try {
        const book_id = req.params.id;
        const books = await Book.getBook(book_id);
        res.send(_.pick(books[0],['name','genere','publisher','price','author','_id']));
    }
    catch(err) {
        res.send(`Got error in getBook ${err}`);
    }
}
controller.addBook = async (req, res) => {
   
   try {
        const { error } = validateAddBook(req.body);
        if (error) throw error.details[0].message;
        let savedBook = new Book({
            _id: new mongoose.Types.ObjectId(),
            updatedBy: req.session.user._id,
            author:req.body.author,
            name: req.body.name,
            genere:req.body.genere,
            publisher:req.body.publisher,
            price:req.body.price,
        }); 

        await savedBook.save();
        req.flash('success', `Book successfully added`);
        res.redirect('/book/allbooks');
    }
    catch(err) {
        req.flash('error', `${err}`);
        res.redirect('/book/addBook');
    }
}

controller.deleteBook = async (req, res) => {
    let bookName = req.body.name;
    try{
        const removedBook = await Book.removeBook(bookName);
        res.send('Book successfully deleted');
    }
    catch(err) {
        res.send('Delete failed..!');
    }
}
controller.editBook = async (req, res) => {
    try {
        const { error } = validateEditBook(req.body);
        if (error) throw error.details[0].message;
        let book = await Book.editBook(req.body.book_id);
            book.updatedBy =  req.session.user._id;
            book.name =  req.body.name;
            book.genere = req.body.genere;
            book.publisher = req.body.publisher;
            book.price = req.body.price;
            const log  = await book.save();

        res.send({status:'success',message:'Book updated successfully '});
    }
    catch(err) {
        res.send({status:'danger',message:`${err}`});
    }
}
function validateAddBook (book) {
    const schema = {
      name: Joi.string().max(255).required(),
      genere: Joi.string().max(255).required(),
      publisher: Joi.string().max(255).required(),
      price: Joi.string().max(255).required(),
      author:Joi.string().max(255).required(),
    };
    return Joi.validate(book, schema);
}
function validateEditBook (book) {
    const schema = {
      name: Joi.string().max(255).required(),
      genere: Joi.string().max(255).required(),
      publisher: Joi.string().max(255).required(),
      price: Joi.string().max(255).required(),
      book_id:Joi.string()
    };
    return Joi.validate(book, schema);
}
export default controller;