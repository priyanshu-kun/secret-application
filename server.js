require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();


// set globle variable ejs
app.set("view-engine","ejs");

// init static files
app.use(express.static(path.join(__dirname+"/public")))

// use router file gloable middleware
app.use("/",require("./routes/home"));




const PORT = process.env.PORT || 3000;
app.listen(PORT,(err) => {
    if(err) {
        throw err;
    }
    else {
        console.log("Server is running on port: "+PORT);
    }
})