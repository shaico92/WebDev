var  mongoose = require('mongoose');

var Campground = require('./campground');

var User = require('./user'); 


var Comment = require('./comment.js');

var data = [
    {
        name: 'this is the first test Campground',
    image : "/imgs/bearlobster.jpg",
    description: 'this is the firstmbled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu',
    comments : []
    
},
    {
        name: 'this is the second test Campground',
    image : "/imgs/bearlobster.jpg",
    description: 'this is the secondmbled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu',
    comments : []
    },
    {
        name: 'this is the third test Campground',
    image : "/imgs/bearlobster.jpg",
    description: 'this is the thirdmbled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu',
    comments : []
    },
    {
        name: 'this is the fourth test Campground',
    image : "/imgs/bearlobster.jpg",
    description: 'this is the fourthmbled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu',
    comments : []

    },
    {
        name: 'this is the fifth test Campground',
    image : "/imgs/bearlobster.jpg",
    description: 'this is the fifthmbled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu',
    comments : []
    }
]

function seedDB() {
    //remove all campgrounds
    User.remove({},function (err) {
        if (err) {
            console.log(err);
            
        } else {
            console.log("deleting all users");
            
        }
        
    })
    Campground.remove({},function (err) {
        if (err) {
            console.log(err);
            
        } else {
            console.log("removeCampgrounds");
                //add all campGrounds
        data.forEach((seed)=>{
            Campground.create(seed,function(err,campground) {
                if (err) {
                    console.log(err);
                    
                } else {
                
                    //create a comment

                    Comment.create(
                        {
                            text: ' This is grat , but i with there was onternet',
                            author: 'homer'
                        },function (err, comment) {
                                if (err) {
                                        console.log(er);
                                        
                                } else {

                                    //pushing the comment for the campground var
                                    campground.comments.push(comment);
                                    campground.save(function (err,data) {
                                            if (err) {
                                                                console.log(err);
                                                                                                                
                                            } else {
                                                
                                                //console.log(data);
                                                
                                            }
                                        });
                                        //Created a comment
                                       

                                }
                            
                            
                        }
                    )
                        
                }
                
            })

        }
        
        )
        
        console.log('adding '+data.length+ ' campgrounds');
        console.log('adding '+data.length+ ' comments');
        }
        
    }) 
    
        
}

module.exports = seedDB;