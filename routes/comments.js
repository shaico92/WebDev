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
//comment to test new branch

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
                res.redirect('/campgrounds/view/'+campground._id)
            }
            
        })
    }
    
})
    //create new comment
    //connect new comment for campground
    //
    
})

    
    
})

//edit comment

router.get('/:comment_id/edit',function(req,res) {
    var id = req.params.id;
    Campground.findById(id,function (err,campground) {
    if (err) {
        console.log(err);
        
    } else {
        var comment_id = req.params.comment_id;
        Comment.findById(comment_id,function(err,comment) {
            if (err) {
                console.log(err);
                
            } else {
                res.render('comments/edit',{campground,comment});
                //res.send('lol this is new')
            }
            
        })
    }    
    })
    


    
})



//updating comment

router.put('/:comment_id',function(req,res) {
    Comment.findById(req.params.comment_id,function(err,comment) {

        if (err) {
            res.redirect('back')
        } else {
            
    var content = req.body.comment;
    comment.text = content.text;
    comment.save();
    res.redirect('/campgrounds/view/'+req.params.id);            
        }
        
    })





    
})



//delete comment

router.delete('/:comment_id',function(req,res) {
    Campground.findById(req.params.id,function(err,campground) {
        if (err) {
            console.log(err);
            
        } else {
            Comment.findById(req.params.comment_id,function(err,comment) {
                if (err) {
                    console.log(err);
                    
                } else {
                    comment.remove();
                    campground.save();
                    res.redirect('/campgrounds/view/'+campground._id);
                }
                
            })
        }
        
    })

    
})

function checkOwnership(req,res, next) {

    //is it the user's campground 
    Campground.findById(req.params.id,function(err,campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds')
        } else {
            //doing it to compare ids as strings and not objects
            
            Comment.findById(req.params.comment_id,function(err,comment) {
                if (err) {
                    console.log(err);
                    
                } else {
                    var variable1= req.user.id.toString();
                    //var variabl2=campground.comments.comment.author.id.toString();
                    if (variable1==variabl2) {

                        console.log('match comment user and logged user can edit now');
                        return next();
                    }else{
                        res.redirect('back');
                    }
                }
                
            })
            
            }
        }
        
        
    )

}
function isLoggedIn(req,res, next) {

    if (req.isAuthenticated()) {

        return next();
        
    }
    res.redirect('/login')
    
}

module.exports = router;