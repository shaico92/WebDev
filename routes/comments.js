var express = require('express');

//megre the parameters from the comment and the campground.js
var router = express.Router({mergeParams : true});


//importing campground and comment for methods
var User = require('../models/user')
var Campground = require('../models/campground');
var Comment = require('../models/comment');

/*
==============================
Comments Routes
=============================
*/
router.get('/new',isLoggedIn,function (req ,res) {

    var byID = req.params.id;
Campground.findById(byID,function (err , campground) {

    if (err) {
        console.log(err);
        
    } else {
        res.render('comments/new',{campground})
    }
    
})

//create the comment for campground

router.post('/',isLoggedIn,function(req, res) {

  
    //look up campground
Campground.findById(req.params.id,function (err, campground) {

    if (err) {
        console.log(err);
        res.redirect('/campgrounds');
    } else {
        Comment.create(req.body.comment,function (err, comment) {
            if (err) {
                console.log(err);
                
            } else {
                // add username and id to comment and then save comment
                comment.author._id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/'+campground._id)
            }
            
        })
    }
    
})
    //create new comment
    //connect new comment for campground
    //
    
})

    
    
})
function isLoggedIn(req,res, next) {

    if (req.isAuthenticated()) {

        return next();
        
    }
    res.redirect('/login')
    
}

module.exports = router;