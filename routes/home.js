const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const DBmodel = require("../passport&db/database");
const bcrypt = require("bcrypt");
const passport = require("passport");


router.get("/", (req, res) => {
    
    console.log(req.session);
    res.render("index.ejs", { title: "Welcome to people's Secret"});
})

router.get("/SignUp",checkUserIsNotAuthenticate, (req, res) => {
    res.render("SignUp.ejs", { title: "SignUp page" });
})

router.get("/SignIn",checkUserIsNotAuthenticate, (req, res) => {
    res.render("SignIn.ejs", { title: "SignIn page" })
})

router.get("/secret",checkUserIsAuthenticate, (req, res) => {
    res.render("secrets.ejs", { title: "Secrets" })
})


// set signup post routes and validate user cradientials
router.post("/SignUp", checkUserIsNotAuthenticate,[

    // username must be an email
    body('email').isEmail(),
    // password must be at least 8 chars long
    body('password').isLength({ min: 8 })

], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    // to prevent wrong email or weak password
    const Result = validationResult(req);
    if (!Result.isEmpty()) {
       return res.redirect("/SignUp");
    }

    try {
        const hasedpassword = await bcrypt.hash(req.body.password,12);
        const newUser = new DBmodel({
            username: req.body.name,
            email: req.body.email,
            password: hasedpassword
        })

        newUser.save((err,doc) => {
            if(err) {
                throw err;
            }
            else {
                console.log("saved docs"+doc)
            }
        })

        res.redirect("/signIn")
    }
    catch (err) {
        console.log("Ohhh. fuck you messed up some thing go and take a look on error!",err);
        res.redirect("/signUp");
    }

})

router.post("/SignIn",passport.authenticate('local',{
    successRedirect: '/secret',
    failureRedirect: '/SignIn',
    failureFlash: true,
    successFlash: true
}))


function  checkUserIsAuthenticate(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
     res.redirect("/SignIn");
}

function  checkUserIsNotAuthenticate(req,res,next) {
    if(req.isAuthenticated()) {
        res.redirect("/SignIn");
    }
     next();
    
}

module.exports = router;