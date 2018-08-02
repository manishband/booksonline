import express from "express";
import bookController from "../controller/books.controller"
import userController from "../controller/user.controller"

const router = express.Router()

router.get('/allbooks', (req, res) => {
    if(!req.session.user){
        req.session.destroy();
        res.redirect('/user/login');
    }
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