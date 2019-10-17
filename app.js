const express = require("express");
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { User } = require('./app/models');

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false }));

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

  
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.use(session({ secret: 'keyboard cat', key: 'sid'}));
  //app.use(passport2.initialize());
  //app.use(passport2.session());
  app.use(express.static(__dirname + '/public'));
  
  app.get('/profilefb', function(req, res){
    res.render('profile', { user: req.user });
  });
  
  //app.use(express.urlencoded({ extended: false }));
  
  app.get('/account', ensureAuthenticated, function(req, res){
    res.render('profile', { user: req.user });
  });
  
  app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));  
  
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/profilefb', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profilefb');
  });
  
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  
  
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  };

app.get('/', (req, res) =>{
    res.render('home',{user: req.user});
});
  
app.listen(3001, () => {
    console.log('APP LISTENING FOR REQUESTS ON PORT 3001')
});