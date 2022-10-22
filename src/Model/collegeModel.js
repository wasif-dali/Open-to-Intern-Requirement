const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name is required"],
        unique : [true, "Name already exits"],
        trim : true 
    },
    fullName : {
        type: String, 
        required : [true, "Full name is required"],
        trim : true
    },
    logoLink : {
        type: String,
        required : [true, "Logo Link is required"]
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamps: true})


module.exports = mongoose.model("College",collegeSchema);