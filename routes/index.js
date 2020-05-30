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
            req.flash('error' , err.message.toString())
            return res.redirect('/register');
        } 
        passport.authenticate('local')(req,res,function () {
                
            req.flash('success', "Welcome to Yelp camp " + newUser.username)
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
    

});

//logout route
router.get('/logout',function(req,res) {

    req.logOut();
    
    req.flash('success', "logged you out!")
    res.redirect('/campgrounds');
    
})



module.exports =router;