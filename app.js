const express = require("express");
const authRoutes = require('./routes/routes-auths/google-routes');
const profileRoutes = require('./routes/routes-auths/profile-routes');
const fbRoutes = require('./routes/routes-auths/fb-routes');
const crudRoutes = require('./routes/routes-auths/crud_routes');
const crud = require('./routes/crud');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys_google');
const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { users } = require('./app/models');

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/', fbRoutes);
app.use('/', crudRoutes);
app.use('/', crud);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(express.static(__dirname + '/public'));
  

app.get('/', (req, res) =>{
  res.render('home',{user: req.user});
});
  
app.listen(3000, () => {
    console.log('APP LISTENING FOR REQUESTS ON PORT 3000')
});