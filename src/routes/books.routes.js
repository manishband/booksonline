import express from "express";
import bookController from "../controller/books.controller"
import userController from "../controller/user.controller"
import auth from '../controller/auth.controller'

const router = express.Router()
router.get('/allbooks',auth, (req, res) => {
    bookController.getAll(req, res);
});

router.get('/view/:id',auth, (req, res) => {
    bookController.getBook(req, res);
});

router.get('/addBook',auth, (req, res) => {
    bookController.getAuthors(req, res);
});

router.post('/addBook', (req, res) => {
    bookController.addBook(req, res);
});
router.post('/editBook',auth, (req, res) => {
    bookController.editBook(req , res);
});


router.delete('/deletebook/:id',auth, (req, res) => {
    bookController.deleteCar(req, res);
});

export default router;