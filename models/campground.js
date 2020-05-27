var mongoose =require('mongoose');


var campSchema = new mongoose.Schema({
    name: String,
    image : String,
    description: String,
    comments :[{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
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

