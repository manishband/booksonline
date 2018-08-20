import jwt from 'jsonwebtoken';

const authentication = (req, res, next) => {
    let user = req.session.user;
    if(!user){
        req.flash('error','Please Login to user the applicaion ')
        res.redirect('/user/login');
    }else{
        next();
    }   
}
const authorization = (req,res,next) =>{

}
module.exports = authentication
