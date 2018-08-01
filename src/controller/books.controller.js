import Book from '../model/books.model';
import Users from '../model/user.model';
import Joi from 'joi';
import _ from 'lodash';

const controller = {};
controller.getAll = async (req, res) => {
    try {
        const books = await Book.getAll();
        let data = [];
        books.forEach(key => {
            let element = {};
            element.name = key.name;
            element.publisher= key.publisher;
            element.owner = key.owner;
            element.price =key.price;
            element.genere = key.genere;
            element.id =key.id;
            data.push(element)
        });
        res.render('books',{booksResult:data,successAlert:req.flash('success')});
    }
    catch(err) {
        res.send('Got error in getAll');
    }
}
controller.getBook = async (req, res) => {
    try {
        const book_id = req.params.id;
        const books = await Book.getBook(book_id);
        res.send(_.pick(books[0],['name','genere','publisher','price','owner']));
    }
    catch(err) {
        res.send(`Got error in getBook ${err}`);
    }
}
controller.addBook = async (req, res) => {
   
   try {
        const { error } = validateAddBook(req.body);
        if (error) throw error.details[0].message;
        const savedBook = await new Book({
            name: req.body.name,
            genere:req.body.genere,
            publisher:req.body.publisher,
            price:req.body.price
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
        const { error } = validateAddBook(req.body);
        if (error) throw error.details[0].message;
        const savedBook = await new Book({
            name: req.body.name,
            genere:req.body.genere,
            publisher:req.body.publisher,
            price:req.body.price
        }); 
        //await savedBook.save();
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
      price: Joi.string().max(255).required()
    };
    return Joi.validate(book, schema);
}
export default controller;