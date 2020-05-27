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
        var author = {
            id : req.user.id,
            username : req.user.username
        }
        
        var commentText = req.body.comment.text;

        var newComment = new Comment({
            // text: String,
            // author : {
                  
                
            //     id: {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: 'User'
            //     },
            //     username : String
            // }
                text : commentText.toString(),
                author : author

        })

        // Comment.create(req.body.comment,function (err, comment) {
        //     if (err) {
        //         console.log(err);
                
        //     } else {
                // add username and id to comment and then save comment

                    


                // comment.author._id = req.user._id;
                // comment.author.username = req.user.username;
                // comment.save();

                newComment.save();
                campground.comments.push(newComment);
                //campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/view/'+campground._id)
         //   }
            
       // })
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

router.delete('/:comment_id',checkCommentOwnership,function(req,res) {
            //Comment.findById(req.params.comment_id,function(err,comment) {
                //if (err) {
                  //  console.log(err);
                    
                //} else {
                    Comment.findById(req.params.comment_id,function (err,comment){

                        console.log(comment.author.id);
                        
                        comment.remove();
                    
                        res.redirect('/campgrounds/view/'+req.params.id);


                    })
                    
              //  }
                
            //})
        }
        
    )

    


function checkCommentOwnership(req,res, next) {
    
        //is it the user's campground 
        Comment.findById(req.params.comment_id,function(err,comment) {
            if (err) {
                console.log(err);
                res.redirect('/campgrounds')
            } else {
                //doing it to compare ids as strings and not objects
                var variable1= req.user.id.toString();
                var variabl2=comment.author.id.toString();
                
                
                if(variable1==variabl2){
                    // now can continue to next function
                    return next();
                    //res.render('campgrounds/edit', {campToEdit});    
                }else{
                    //maybe try a different res at the moment this is what i have
                    res.redirect('back');
                     
                }
            }
            
            
        })

}
function isLoggedIn(req,res, next) {

    if (req.isAuthenticated()) {

        return next();
        
    }
    res.redirect('/login')
    
}

module.exports = router;