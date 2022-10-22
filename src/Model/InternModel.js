const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const emailValidation = function (email){
    let regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(email)
}

const mobileValidation = function(mobile){
    let regexForMobile = /^[6-9]\d{9}$/
    return regexForMobile.test(mobile)
}

const internSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, "name is required"],
        trim : true
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : [true, "email already exits"],
        validate : [emailValidation,"please enter a valid email"],
        trim : true
    },
    mobile : {
        type : String,
        required : [true, "mobile number is required"],
        unique : [true,"mobile number already exits"],
        validate : [mobileValidation,"please enter a valid mobile number"],
        trim : true
    },
    collegeId : {
        type : ObjectId,
        ref : "College"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }

},{timestamps : true})


module.exports = mongoose.model('Intern',internSchema)