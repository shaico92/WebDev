var express = require('express');
var router = express.Router();
var Campground = require('../models/campground')
const path= require('path');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
    }
    })
   
  var upload = multer({ storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            
            req.flash('error' , 'Only images are allowed');
        }
        callback(null, true)
    },
     })

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
                console.log(foundCampground);
                
                ;
                
                res.render("campgrounds/show",{campground: foundCampground})
            }
        })
     
            
    });
    

    
    router.get('/new',middleware.checkLoggedIn,  function(req,res) {
        
        
        res.render('campgrounds/new');
    } );


// create a new campground
router.post('/',middleware.checkLoggedIn,upload.single('image'), (req, res) => {
    
    //checkfiletype
    
    


    //get data from from and ad dto campground array

    var name = req.body.name;
    var price = req.body.price;
    var image = "uploads/"+req.file.filename;
    
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


}
)


router.get('/:id/edit',middleware.checkCampgroundOwnership,function(req,res) {
        Campground.findById(req.params.id,function(err,campToEdit) {
            res.render('campgrounds/edit', {campToEdit});    
                
            }
            
            
        )
   
})
//update campground route

router.put('/:id',middleware.checkCampgroundOwnership,upload.single('image'),function(req,res) {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err, updatedCampground) {
        if (err) {
            console.log(err);
            
        } else {
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
        
})



module.exports =router;
