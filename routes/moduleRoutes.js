const express = require("express");
const router = express.Router();
const middleWare = require("../middleware/index.js");

router.get("/", (req,res)=>{
	res.render("landingPage");
});

router.get("/admissions", middleWare.isLoggedIn, (req,res)=>{
	res.render("admissions");
})

router.get("/examinations", middleWare.isLoggedIn, (req,res)=>{
	res.render("examinations");
})

router.get("/hostel", middleWare.isLoggedIn, (req,res)=>{
	res.render("hostel");
})

router.get("/recruitment", middleWare.isLoggedIn, (req,res)=>{
	res.render("recruitment");
})

module.exports = router;