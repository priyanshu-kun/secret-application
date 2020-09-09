const router = require("express").Router();

router.get("/",(req,res) => {
    res.render("index.ejs",{title: "Welcome to people's Secret"});
})

module.exports = router;