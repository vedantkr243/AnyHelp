const mongoose = require('mongoose');

const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    accountType:{
        type:String,
        required:true,
        enum:["Student","Instructor","Admin"],
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"Profile",
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
    image:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        // required:true,
    },
    resetPasswordExpires:{
        type:Date,
    },
    courseProgress:[
        {  
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
        }
    ],
     active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
});

module.exports=mongoose.model("User", userschema);