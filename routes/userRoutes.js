const express= require("express");
const router = express.Router();
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../schema/users.js");


// Handling SignUp Routes
router.get("/signup", (req,res)=>{
	res.render("signup");
})

router.post("/signup", (req,res)=>{
	User.register(new User({username : req.body.username, email:  req.body.email}), req.body.password, (err,user)=>{
		if(err){
			req.flash("error", err.message);
			return res.redirect("/signup");
		} else {
			passport.authenticate("local")(req,res,()=>{
				req.flash("success", "Account Created Successfully");
				res.redirect("/");
			})
		}
	})
})

// Handling Login Routes
router.get("/login", (req,res)=>{
	res.render("login");
})

router.post("/login", passport.authenticate("local",{
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash : "Invalid Username or Password",
	successFlash : "Successfully Logged In !!!"
	
}),(req,res)=>{

});


//Handling the LogOut request
router.get("/logout", (req,res)=>{
	req.logout()
	req.flash("success","You have successfully logged out !!");
	res.redirect("/login");
});


module.exports = router;