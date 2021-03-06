import express from "express";
import bookController from "../controller/books.controller"

const router = express.Router()
router.get('/list', (req, res) => {
   res.render('books')
});
router.get('/allbooks', (req, res) => {
    bookController.getAll(req, res);
 });

router.get('/view/:id', (req, res) => {
    bookController.getBook(req, res);
});

router.get('/addBook', (req, res) => {
    bookController.getAuthors(req, res);
});

router.post('/addBook', (req, res) => {
    bookController.addBook(req, res);
});
router.post('/editBook', (req, res) => {
    bookController.editBook(req , res);
});


router.delete('/deletebook/:id', (req, res) => {
    bookController.deleteCar(req, res);
});

export default router;