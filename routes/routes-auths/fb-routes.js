const router = require('express').Router();
const passport = require('passport');

  router.get('/profilefb', function(req, res){
    res.render('profile', { user: req.user });
  });
    
    //app.use(express.urlencoded({ extended: false }));
    
  router.get('/account', ensureAuthenticated, function(req, res){
    res.render('profile', { user: req.user });
  });
    
  router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));  
    
  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/profilefb', failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/profilefb');
    });
    
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
      
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
      res.redirect('/login')
    };

    module.exports = router;
  