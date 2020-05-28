var Campground = require('../models/campground')
var Comment = require('../models/comment')

//all the middleware goes here
var middlewareObj = {};




middlewareObj.checkLoggedIn =  function (req,res, next) {

    if (req.isAuthenticated()) {

        return next();
        
    }
    res.redirect('/login')
    
}

middlewareObj.checkCampgroundOwnership = function (req,res, next) {
    if (req.isAuthenticated()) {
        
    //is it the user's campground 
    Campground.findById(req.params.id,function(err,campToEdit) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds/view')
        } else {
            //doing it to compare ids as strings and not objects
            var variable1= req.user.id.toString();
            var variabl2=campToEdit.creator.id.toString();
            
            
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
    } else {
        res.redirect('/login')
    }

}
middlewareObj.checkCommentOwnership = function (req,res, next) {
    if (req.isAuthenticated()) {
        
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

    } else {
        res.redirect('/login')        
    }
}





module.exports = middlewareObj;