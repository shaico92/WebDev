var express = require('express');
var router = express.Router();
var Campground = require('../models/campground')






//this is the root route
//check commit change
router.get('/' ,(req, res) => {


    Campground.find({},(err , camp )=>{
        if (err) {
                console.log("couldent fetch camps");
                            
        } else {
             
            res.render('campgrounds/campgrounds', { campground: camp });        
        }
    })

    
});

//this is the show route

    router.get('/view/:id',(req , res)=>{
    
        var byId = req.params.id;
        Campground.findById(byId).populate('comments').exec(function (err, foundCampground) {
            if (err) {
                console.log(err);
                
            } else {
                
                
                res.render("campgrounds/show",{campground: foundCampground})
            }
        })
     
            
    });
    

    
//checks authorization for editing/deleting
router.use('/',function (req,res, next) {
    
    
        if (req.isAuthenticated()) {
    
    
             next();
        } else {
            res.status(401).send('Not permitoed to dp this action!! please login first');
        }
        
    });


    router.get('/new', function(req,res) {
        console.log(req.body);
        
        res.render('campgrounds/new');
    } );


// create a new campground
router.post('/', (req, res) => {

    //get data from from and ad dto campground array

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var creator = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampGround = new Campground({
        name: name, image: image ,description: description ,
        creator : creator
        


    })

    
    newCampGround.save(function (err , camp){
        if(err){
            console.log("something went wrong");
            
        }else{
            
                   console.log(camp);
                        
            
        }
    }
    
    
    )
    //campground.push(newCampGround);
    res.redirect('/campgrounds');
    //redirect to campground page


}
)
// edit campground route

router.get('/:id/edit',checkOwnership,function(req,res) {
        Campground.findById(req.params.id,function(err,campToEdit) {
            res.render('campgrounds/edit', {campToEdit});    
                
            }
            
            
        )
   
})
//update campground route

router.put('/:id',function(req,res) {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err, updatedCampground) {
        if (err) {
            console.log(err);
            
        } else {
            //console.log(updatedCampground);
            res.redirect('/campgrounds/'+req.params.id)
            
        }
    })


})


//DESTROY route 

router.delete('/:id',checkOwnership,function (req,res) {

    
        Campground.findById(req.params.id,function (err,campToDelete) {
                        
                                campToDelete.remove();
                                res.redirect('/')
                        
                            
                                    
        })
        // Campground.findOneAndDelete(req.params.id,function (err) {
        //     if (err) {
        //         console.log(err);
        //         res.redirect('/campgrounds')
                
        //     }else{
        //         res.redirect('/');
        //     }
            
            
        // })
    
    
    
})

function checkOwnership(req,res, next) {

        //is it the user's campground 
        Campground.findById(req.params.id,function(err,campToEdit) {
            if (err) {
                console.log(err);
                res.redirect('/campgrounds')
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

}
module.exports =router;
