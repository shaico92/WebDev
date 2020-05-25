var mongoose = require('mongoose');
//connect to db
mongoose.connect("mongodb://localhost/cat_app",{useNewUrlParser: true ,useUnifiedTopology: true});


// this defines how the cat will look 
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color: String
});

var Cat = mongoose.model("Cat", catSchema);

var _1Cat = new Cat ({
    name: "George",
    age: 11,
    color: "black"
});

_1Cat.save(function (err , cat){
    if(err){
        console.log("something went wrong");
        
    }else{
        console.log("just saved "+_1Cat["name"]+" to db");
        console.log(cat);
        
        
    }
})

Cat.create({
            name : "snowhite",
            age: 15,
            Temp : 'Bland'
});

Cat.find({},(err, cats)=>{
        if (err) {
                console.log("ho no");
                          
        }else{
            console.log(cats);
            
        }
})





//add a cat to db

//retrieve all cats

//retrieve specific cat

