const RatingsAndReviews= require("../models/RatingAndReviews");
const Course= require("../models/Course");
const mongoose = require("mongoose");

//createRating
exports.createRating= async(req,res)=>{
    try{
        //get user id
        //fetch data from request body
        const {courseId, rating, review}= req.body;
        const userId= req.user.id;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                            {_id:courseId,
                                                studentEnrolled: {$elemMatch: {eq: userId}},
                                            });

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingsAndReviews.findOne({
                                                user:userId,
                                                course:courseId,
                                                });
        
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'Course is already reviewd by the user'
            });
        }
        //create rating and review entry
        const ratingReview = await RatingsAndReviews.create({
                                         rating,review 
                                        ,Course:courseId,
                                        user:userId,
                                    });
        //upgrade course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                            {
                                                $push:{ratingAndReviews:ratingReview._id,}
                                            },
                                            {new:true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully",
            ratingReview,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
             success:false,
             message:error.message,
        });
    }};

//getAveragerating
exports.getAverageRating = async (req, res) => {
    try {
        //get course id
        const courseId = req.body;
        //calculate avg rating

        const result = await RatingsAndReviews.aggregate([
            {
            $match:{
                course: courseId,
            },
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:"rating"},
            }
        }
    ])
    //return rating
    if(result.length>0){

        return res.status(200).json({
            success:false,
            averageRating:result[0].averageRating,
        })
    }
    //if no rating/Review exist
    return res.status(200).json({
        success:true,
        message:'Average rating is 0, no ratings given till now',
        averageRating:0,
    })
    } catch (error) {
       console.log(error);
        return res.status(500).json({
             success:false,
             message:error.message,
             
        }); 
    }
}
//getAllRatingAndReview
exports.getAllRating = async(req,res) =>{
    try {
            const allReviews = await RatingsAndReviews.find({})
                                                    .sort({rating:"desc"})
                                                    .populate({
                                                        path:"user",
                                                        select:"firstName lastName email image",
                                                    })
                                                    .populate({
                                                        path:"course",
                                                        select:"courseName",
                                                    })
                                                    .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
             success:false,
             message:error.message,
             
        });   
    }
}