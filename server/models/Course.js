// const mongoose=require("mongoose");

// const courseSchema=new mongoose.Schema({
//    courseName:{
//     type:String,
//    },
//    courseDescription:{
//     requird:true,
//     type:String,
//    },
//    Instructor:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User",
//     required:true,
//    },
//    whatYouWillLearn:{
//     type:String,
//    },
//    courseContent:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Section",
//    }],
//    ratingAndReviews:[
//     {
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"RatingAndReview",
//    }
//    ],
//    price:{
//     type:Number,
//    },
//    thumbnail:{
//     type:Stringifier_,
//    },
//    tag:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Tag",
//    },
//    studentEnrolled:[
//     {
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User",
//         required:true,
// }
//    ],

// });

// module.exports = mongoose.model("Course", courseSchema);
const mongoose =  require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String, 
    },
    description:{
        type:String, 
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    whatWillYouLearn:{
        type:String, 
        trim:true
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "Section",
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"RatingAndReview",
    }],
    price:{
        type:Number, 
    },
    thumbnail:{
        type:String,
    },
    tags:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentsEnrolled: [{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }],
    instructions: {
		type: String,
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt: {
		type:Date,
		default:Date.now
	},
})

module.exports = mongoose.model("Course", courseSchema);