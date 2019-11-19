const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys_google');
const { User } = require('../app/models');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('./keys_fb');

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

passport.use(
    new GoogleStrategy({
    //options for the google strat

    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }, (acessToken, refreshToken ,profile , done) => {
        //check if user already exists in our db

        User.findOne({where:{id_google: profile.id}}).then((currentUser)=>{
            if(currentUser){
                //already have the user
                done(null, currentUser);
            }else{
                //if not, create user in our db
              
                User.create({ name: profile.displayName,  
                    url_image: profile._json.picture,
                    id_google: profile.id}).then((newUser)=>{
                      done(null, newUser);
                  });
            }
        });
    })  
)
//facebook
  
  
  // Use the FacebookStrategy within Passport.
  
  passport.use(new FacebookStrategy({
      clientID: config.facebook_api_key,
      clientSecret:config.facebook_api_secret ,
      callbackURL: config.callback_url
    },
    function (accessToken, refreshToken, profile, done) {

      process.nextTick(function () {
        //Check whether the User exists or not using profile.id
        if(config.use_database) {
            // if sets to true
          
            User.findOne({where:{id_facebook: profile.id}}).then((currentUser)=>{
              if(currentUser){
                  //already have the user
                  done(null, currentUser);
              }else{
                  //if not, create user in our db
                  User.create({ 
                    name: profile.displayName, 
                    id_facebook: profile.id }).then((newUser)=>{
                    });
              }
          });
        }
        return done(null, profile);
      });
    }
  ));