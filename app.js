//=======================================
//  Requiring Packages and Models(Schemas)
//=======================================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./schema/users");
const passport= require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const expressSession		= require("express-session");
const methodOverride		= require("method-override");
const bodyParser			= require("body-parser");
const flash					= require('connect-flash');

mongoose.connect("mongodb+srv://hamet123:Sweethame123@cluster0.rdye7.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false}).then(()=>{
	console.log("Connected to DataBase")
}).catch((err)=>{
	console.log("Oops !!! Something went wrong " + err);
})

// mongoose.connect("mongodb://localhost/hpushimla", {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false}).then(()=>{
// 	console.log("Connected to DataBase")
// }).catch((err)=>{
// 	console.log("Oops !!! Something went wrong " + err);
// })

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views/assets"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
	secret: "My Name is Ayush Sood",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// =============================================
//			Requiring and using routes			
// =============================================

const moduleRoutes = require("./routes/moduleRoutes");
const userRoutes = require("./routes/userRoutes");


app.use(moduleRoutes);
app.use(userRoutes);


//======================================
//			Listening to the Port
//======================================

app.listen(process.env.PORT || 5000, process.env.IP, ()=>{
	console.log("Server Started Successfully")
});