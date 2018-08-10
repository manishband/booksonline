import express from "express";
import bodyParser from 'body-parser';
import cookieParser from'cookie-parser';
import session from 'express-session';
import path from 'path';
import config from'./src/config/config.env';
import connectToDb from './src/config/db';
import user from './src/routes/user.routes';
import books from './src/routes/books.routes';
import exphbs from 'express-handlebars'
import flash from 'connect-flash';
import auth from './src/controller/auth.controller'
const port = config.serverPort;

connectToDb();

const app = express();
let sessionStore = new session.MemoryStore;
app.use(cookieParser());
app.use(flash());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000
    }
}));
app.set('views', path.join(__dirname,'src','views'));
app.engine('handlebars', exphbs({defaultLayout: 'main',layoutsDir:'src/views/layouts',data:{title:"jhhjkhjkjjhsad"}}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static(__dirname + '/src/public'));

app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});
app.get('/', (req, res) => {
    res.header(301)
    res.redirect('/user/login');
});
app.get('*',(req,res,next)=>{
    res.locals.user = req.session.user || null;
    next();
})
app.use('/user',user);
app.use('/book',auth,books);




const server = app.listen(port, () => {
   // console.log('server started - ', port);
});

module.exports = server;