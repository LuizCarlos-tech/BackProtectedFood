const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys_google');
const { users } = require('../app/models');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('./keys_fb')


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
        console.log(profile);
        users.findOne({where:{id_google: profile.id}}).then((currentUser)=>{
            if(currentUser){
                //already have the user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            }else{
                //if not, create user in our db
              
                users.create({ name: profile.displayName,  
                    url_image: profile._json.picture,
                    id_google: profile.id}).then((newUser)=>{
                      console.log('new user created:'+ newUser);
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
      console.log(profile);
      process.nextTick(function () {
        //Check whether the User exists or not using profile.id
        if(config.use_database) {
            // if sets to true
          
            users.findOne({where:{id_facebook: profile.id}}).then((currentUser)=>{
              if(currentUser){
                  //already have the user
                  console.log('user is: ', currentUser);
                  done(null, currentUser);
              }else{
                  //if not, create user in our db
                  users.create({ 
                    name: profile.displayName, 
                    id_facebook: profile.id }).then((newUser)=>{
                        console.log('new user created:'+ newUser);
                    });
              }
          });
            
  
        }
        return done(null, profile);
      });
    }
  ));