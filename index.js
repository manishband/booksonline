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
const port = config.serverPort;

connectToDb();

const app = express();
let sessionStore = new session.MemoryStore;
app.use(cookieParser());
app.use(flash());
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.set('views', path.join(__dirname,'src','views'));
app.engine('handlebars', exphbs({defaultLayout: 'main',layoutsDir:'src/views/layouts'}));
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
    res.redirect('/user/login');
});

app.use('/user',user);
app.use('/book',books);




app.listen(port, () => {
   // console.log('server started - ', port);
});