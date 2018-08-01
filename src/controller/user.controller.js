import Users from '../model/user.model';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const user = await Users.getAll();
        res.send(user);
    }
    catch(err) {
        res.send('Got error in getAll');
    }
}

controller.getUsers = async (req, res) => {
    try {       
        const id = req.params.id;  
        const user = await Users.getUser(id);
        res.send(_.pick(user[0],['firstname','lastname','email','_id'])); 
    }
    catch(err) {
       // res.send('Got error in getAll');
        res.send(err);
    }
}

controller.deleteUser = async (req, res) => {
    let userName = req.body.name;
    try{
        const removedUser = await Users.removeUser(userName);
        res.send('Users successfully deleted');
    }
    catch(err) {
        res.send('Delete failed..!');
    }
}

controller.checkUser = async (req, res) => {
    try{
        
        const { error } = validateLoginUser(req.body);
        if (error) throw error.details[0].message;
        const user = await Users.findEmail({email:req.body.email});
        const pass = await bcrypt.compare(req.body.password,user.password);
        if (!user || !pass) throw `Invalid Email or password`;
        req.flash('success', `Users login successfully`);
        res.redirect('/book/allbooks');
    }catch(err){
        req.flash('error', `${err}`);
        res.redirect('/user/login');
    }   
}
controller.addUser = async (req, res) => {
   
    try{
        const { error } = validateRegisterUser(req.body);
        if (error) throw error.details[0].message;
        let data = await Users.findEmail({email:req.body.email});
        if(data) throw 'Users already exist in database' ;
        let user = new Users(_.pick(req.body,['firstname','lastname','email','password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        req.flash('success', 'User successfully Added in the system');
        res.redirect('/book/allbooks');
    }
    catch(err) {
        req.flash('error', `${err}`)
        res.redirect('/user/register');
    }
}
function validateLoginUser (login) {
    const schema = {
      email: Joi.string().max(255).required().email(),
      password: Joi.string().max(255).required()
    };

    return Joi.validate(login, schema)
}
function validateRegisterUser (register) {
    const schema = {
      firstname: Joi.string().min(2).max(255).required(),
      lastname: Joi.string().min(2).max(255).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      repassword: Joi.string().min(5).max(255).required().valid(Joi.ref('password'))
    };
    return Joi.validate(register, schema);
}
export default controller;