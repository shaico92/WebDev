var mongoose =require('mongoose');


var campSchema = new mongoose.Schema({
    name: String,
    price : String,
    image : String,
    description: String,
    comments :[{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    properties :{
        ac : Boolean,
        clean : Boolean,
        bbq : Boolean,
        acdc : Boolean,
        parking : Boolean

    },
    creator : {
        id: {
            type :mongoose.Schema.Types.ObjectId,
            
            ref: 'User'
        },
        username : String
    }

});
var Campground = new mongoose.model('Campground',campSchema);

//this line exports the module in order to use it in other files
module.exports = Campground;

