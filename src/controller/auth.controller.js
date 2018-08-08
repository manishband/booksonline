
const authentication = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error','Please login to access the application')
        res.redirect('/user/login');
    } else {
        next();
    }     
}
const authorization = (req,res,next) =>{

}
module.exports =authentication
