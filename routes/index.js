var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');







router.get('/', (req, res) => {
    //res.send('lol')
    res.render('home');
});



//============
//AUTH ROUTES
//============

//this is the register route
router.get('/register',(req,res)=> {
    res.render('auth/register')
    
})


//regitster post route
router.post('/register',(req,res)=> {
    var username = req.body;
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password,(err)=>{
        if (err) {
            console.log(err);
            return res.render('auth/register');
        } 
        passport.authenticate('local')(req,res,function () {
                
            req.user.username
            res.redirect('/campgrounds')
            
        });
    });
    
});

//Login route
router.get('/login',(req,res)=>{
        
    res.render('auth/login')
})


//submitting the signin post route
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
    logged = true;
});

//logout route
router.get('/logout',function(req,res) {

    req.logOut();
    
    console.log('logging out current user');
    logged = false;
    res.redirect('/campgrounds');
    
})

//middileware
function isLoggedIn(req,res, next) {

    if (req.isAuthenticated()) {

        return next();
        
    }
    res.redirect('/login')
    
}

module.exports =router;