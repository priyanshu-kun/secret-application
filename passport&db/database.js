const mongoose = require("mongoose");

// connecting to database
mongoose.connect("mongodb://localhost:27017/secrets", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log("connecting to database");
    }
})


const NewSchema = new mongoose.Schema({
    username: {type: String,required: true},
    email: {type: String,required: true},
    password: {type: String,required: true}
})


const SecretModel = mongoose.model("userSecret",NewSchema);


module.exports = SecretModel;