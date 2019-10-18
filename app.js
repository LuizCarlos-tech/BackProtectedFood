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
const auth = require("./auth")();
const jwt = require('jwt-simple');
const cfg = require('./config/passport/config');

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
  app.use(bodyParser.json());

  app.use(session({ secret: 'keyboard cat', key: 'sid'}));
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

//Login normal

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));


app.use(auth.initialize());

app.use(express.urlencoded({ 
  extended: false 
}));

app.use(session({
  secret: 'keyboard cat',
  resave: true, 
  saveUninitialized:true
}));
 
app.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get("/user", auth.authenticate(), function(req, res) {
  res.json(users[req.user.id]);
});

app.post("/token",async function(req, res) {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
      where: {
        email: email,
        password: password
      }
    })
    if (user) {
      const payload = {id: user.id};
      const token = jwt.encode(payload, cfg.jwtSecret);
      res.set('x-access-token', token, user);
      res.json({token: token});
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});
  
app.listen(3001, () => {
    console.log('APP LISTENING FOR REQUESTS ON PORT 3001')
});