const middlewareObject = {};


// MiddleWare to check login/logout Status
middlewareObject.isLoggedIn = function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash("error","You need to be logged in !!!");
		res.redirect("/login");
	}
};


module.exports = middlewareObject;