const express = require("express");
const authRoutes = require('./routes/index');
const crud = require('./routes/crud');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys_google');
const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const auth = require("./auth")();

const app = express();

app.post('/loginUser', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/loginUser' }));


app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(auth.initialize());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//set up routes

app.use('/', authRoutes)
app.use('/', crud);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/image'));


app.use(session({
  secret: 'keyboard cat',
  key: 'sid',
  resave: true, 
  saveUninitialized:true
}));

app.get('/', (req, res) =>{
  res.render('home',{user: req.user});
});
  
app.listen(3000, () => {
    console.log('APP LISTENING FOR REQUESTS ON PORT 3000')
});