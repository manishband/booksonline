import express from "express";
import userController from "../controller/user.controller"

const router = express.Router()

// Login routers details
router.get('/login', (req, res) => {
    res.render('login', { errorLogin: req.flash('error'), successLogin : req.flash('success')});
});
router.post('/login', (req, res) => {
    userController.checkUser(req,res);
});

// Register router details
router.get('/register', (req, res) => {
    res.render('register', {errorLogin: req.flash('error'), successLogin : req.flash('success')});
});

router.post('/register', (req, res) => {
    userController.addUser(req, res);
});

// user details update
router.get('/view/:id', (req, res) => {
    //res.render('home');
    userController.getUsers(req,res);
});

router.delete('/deleteuser', (req, res) => {
    userController.deleteUser(req, res);
});

export default router;