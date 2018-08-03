import express from "express";
import userController from "../controller/user.controller"

const router = express.Router()

// Login routers details
router.get('/logout', (req, res) => {
    if(req.session.user){
        req.session.destroy();
    }
    res.render('login');
});
// Login routers details
router.get('/login', (req, res) => {
    if(req.session.user){
        req.flash('success','You are already login in system');
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

// user details update
router.get('/view/:id', (req, res) => {
    res.render('user',{userData:userController.updateUser(req,res),errorLogin:req.flash('error')})
});

router.delete('/deleteuser', (req, res) => {
    
    userController.deleteUser(req, res);
});

export default router;