
const authentication = (req, res, next) => {
    var token = getCookie(req.headers.cookie, 'access_token');
    if (!req.session.user) {
        req.flash('error','Please login to access the application')
        res.redirect('/user/login');
    } else {
        next();
    }     
}

function getCookie ( src, name ) {
    var value = "; " + src;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
const authorization = (req,res,next) =>{

}
module.exports =authentication
