var express = require('express');
var router = express.Router();
var Campground = require('../models/campground')




//can only work if middleware file name is index.js
var middleware = require('../middleware');





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
// router.use('/',function (req,res, next) {
    
    
//         if (req.isAuthenticated()) {
    
    
//              next();
//         } else {
//             res.status(401).send('Not permitoed to dp this action!! please login first');
//         }
        
//     });


    router.get('/new',middleware.checkLoggedIn,  function(req,res) {
        
        
        res.render('campgrounds/new');
    } );


// create a new campground
router.post('/',middleware.checkLoggedIn, (req, res) => {
    
    //checkfiletype

    


    //get data from from and ad dto campground array

    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var creator = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampGround = new Campground({
        name: name, price: price,image: image ,description: description ,
        creator : creator
        


    })
    
    newCampGround.save(function (err , camp){
        if(err){
            console.log("something went wrong");
            
        }else{
            
            res.redirect('/campgrounds');               
                        
            
        }
    }
    
    
    )
    //campground.push(newCampGround);
    
    //redirect to campground page


}
)
// edit campground route

router.get('/:id/edit',middleware.checkCampgroundOwnership,function(req,res) {
        Campground.findById(req.params.id,function(err,campToEdit) {
            res.render('campgrounds/edit', {campToEdit});    
                
            }
            
            
        )
   
})
//update campground route

router.put('/:id',middleware.checkCampgroundOwnership,function(req,res) {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err, updatedCampground) {
        if (err) {
            console.log(err);
            
        } else {
            //console.log(updatedCampground);
            res.redirect('/campgrounds/view/'+req.params.id)
            
        }
    })


})


//DESTROY route 

router.delete('/:id',middleware.checkCampgroundOwnership,function (req,res) {

    
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



module.exports =router;
