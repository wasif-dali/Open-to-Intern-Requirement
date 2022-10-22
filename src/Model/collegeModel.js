const mongoose = require("mongoose")
const collegeSchema=new  mongoose.Schema({
    name: {
        type:String,
        required:"name is required",
         unique:true,
        trim:true},
    fullName: { type:String,
        required:"fullName is required",
         unique:true,
        trim:true}, 
    logoLink: {
        type:String,
        required:"logoLink is required"},
    isDeleted: {
        type:boolean,
         default: false}
},{timestamps:true})
module.exports = mongoose.model('college', collegeSchema)