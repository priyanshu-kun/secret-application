require("dotenv").config();
const express = require("express");
const routes = require("./routes/home");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const app = express();
const expressSession = require("express-session");
const flash = require("express-flash");
const mongoose = require("mongoose");
const mongoSession = require("connect-mongo")(expressSession);
const passport = require("passport");

// require passport.js
require("./passport&db/passport");



// set globle variable ejs
app.set("view engine", ejs);


// use body parser
app.use(bodyParser.urlencoded({ extended: false }))
// init static files
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());

// connect session to mongoose
const sessionDB = new mongoSession({
    mongooseConnection: mongoose.connection,
    collection: "sessions"
})


app.use(flash());
// create a session
app.use(expressSession({
    secret: "This is my secret",
    saveUninitialized: true,
    resave: false,
    store: sessionDB,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}
));

app.use(passport.initialize());
app.use(passport.session());


// use set all routes
app.use("/", routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log("Server is running on port: " + PORT);
    }
})
