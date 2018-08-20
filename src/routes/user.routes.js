import express from "express";
import userController from "../controller/user.controller"
import auth from '../controller/auth.controller'

const router = express.Router()

// Login routers details
router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.user = ''
        req.flash('success','You are successfully logout from system');
        res.redirect('/user/login');
    }
});
// Login routers details
router.get('/login', (req, res) => {
    if (req.session.user) {
        req.flash('success','You are already login in system');
        res.redirect('/book/allbooks');
    }
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

router.get('/view', (req, res) => {
    userController.getAll(req, res);
});

// user details update
router.get('/edit/:id', (req, res) => {
    userController.getUser(req, res);
});

router.post('/edit/:id', (req, res) => {
    userController.updateUser(req,res) ;
});

router.delete('/deleteuser', (req, res) => {
    
    userController.deleteUser(req, res);
});

export default router;