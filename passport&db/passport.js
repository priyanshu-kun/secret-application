const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const model = require("./database");
const bcrypt = require("bcrypt");
// console.log(model)

passport.use(new passportLocal({ usernameField: "email" }, (email, password, done) => {
    console.log(email, password);
    model.findOne({ email: email }, async (err, user) => {
        if (!err) {
            console.log(user);
            console.log(user.password)
            if (user === null) {
                return done(null, false, { message: "User cannot found!" });
            }

            try {
                await bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        return done(null, false, { message: "password cannot match!" });
                    }
                    else {
                        return done(null, user);
                    }
                })
            }
            catch (error) {
                return done(error);
            }


            function getUserById(id) {
                model.find({ _id: id }, (err, res) => {
                    if(!err) {
                        console.log(res)
                        return res;
                    }
                    else {
                      
                        throw err;
                    }
                });
            }

            passport.serializeUser((user, done) => done(null, user._id));
            passport.deserializeUser((_id, done) => {
                console.log(_id)
                return done(null, getUserById(_id));
            })
        }
        else {
            throw err;
        }
    });


}))
