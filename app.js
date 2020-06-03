console.log("script executed");
var bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 express = require('express'),
 mongoose = require('mongoose'),
 flash = require('connect-flash'),
 requests = require('request'),
  logged = false;
 app = express();
 //dependencies for passport
 var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
//dependency for method override
var methodOverride = require('method-override');
//inside modules
 var User = require('./models/user')
 //routes dependencies
 var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
 var authRoutes = require('./routes/index');
 //passport configuration
/******************************** */
 app.use(require('express-session')({
    secret : "YelpCamp is for u",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
// responsible for reading the session and encoding the session and decoding it
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var date = new Date();
var timestamp = date.getTime();
  var seedDB = require('./models/seed')
//a method that initilized DB for tests
//seedDB();
mongoose.connect("mongodb://localhost:27017/yelpCamp",{useNewUrlParser: true ,useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(flash());


//own middleware for user check
app.use((req,res ,next)=>{
    res.locals.user = req.user;
    res.locals.timestamp = timestamp;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
   return  next();
})

//getting the campground model from the file
var Campground = require('./models/campground')
var Comment = require('./models/comment');


//listen
app.listen(80,()=>  {

    console.log("server is running ");
    
    //console.log(timestamp);
    

});

//routes configuration
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use(authRoutes);


function closeServer() {
    console.log("======================");
        console.log("shutting down server");
        console.log("======================");
    process.exit(0);
}

//closes server
app.get('/close',closeServer);
