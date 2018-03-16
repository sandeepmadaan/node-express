var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
const usersController = require('../controllers/user');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

router.post('/register', usersController.create);

// Login
router.get('/login', usersController.login);

router.post('/login', usersController.validate);

passport.use('local',new LocalStrategy(
    function(username, password, done) {
        usersController.getUserByEmail(username, function(err, user){
            console.log(username);
         if(err) throw err;
         if(!user){
             return done(null, false, {message: 'Unknown User'});
         }
  
         usersController.comparePassword(password, user.password, function(err, isMatch){
             if(err) throw err;
             if(isMatch){
                 return done(null, user);
             } else {
                 return done(null, false, {message: 'Invalid password'});
             }
         });
     });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        usersController.getUserById(id, function(err, user) {
          done(err, user);
        });
      });


    
      router.post('/login',
      passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
      function(req, res) {
        res.redirect('/');
      });
    
    router.get('/logout', function(req, res){
        req.logout();
    
        req.flash('success_msg', 'You are logged out');
    
        res.redirect('/users/login');
    });
      

    module.exports = router;