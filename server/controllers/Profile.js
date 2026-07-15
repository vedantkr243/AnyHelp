const Profile= require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateProfile = async(req,res)=>{
    try {
        //fetch data 
        // const {dateOfBirth,about,contactNumber}=req.body;
         const {dateOfBirth="", gender, about="", contactNumber } = req.body;
        //get user id
        console.log("Request body:", req.user);
        const userId = req.user.id;//from where user we get in middleware and Auth controller
        //validation
        if (!gender || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        console.log("User ID from token:", userId);
        //find profile
        const userDetails = await User.findById(userId);
        console.log("User details fetched from DB:", userDetails);
        const profileId = userDetails.additionalDetails;
         const updatedProfile = await Profile.findByIdAndUpdate(profileId, {dateOfBirth, gender, about, contactNumber}, {new:true});
        const updatedUserDetails = await User.findById(userId).populate("additionalDetails").exec();
     
        // const profileDetails = await Profile.findById(profileId);
        // //update profile
        // profileDetails.dateOfBirth = dateOfBirth;
        // profileDetails.about = about;
        // profileDetails.contactNumber = contactNumber;
        // profileDetails.gender = gender;
        // await profileDetails.save();
        //return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({  
            success: false,
            message: "Error while updating profile",
            error: error.message,
        });
    }
}

//delete account
exports.deleteAccount = async(req,res)=>{
    try {
        //get user id
        // const {user} = req.body
        const userId = req.user.id
        //validation
        const userDetails = await User.findById(userId);
        // if(!userDetails){
        //     return res.status(404).json({
        //         success:false,
        //         message:"User not found",
        //     });
        // }
        //delete profile
        //explore how can be schedule this deletion (after 30 days, 5 days) operation (cron job)
        // const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //todo: hw unroll user form all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:userId});
        
        //return response
        return res.status(200).json({
            success:true,
            message:"User deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting account",
            error: error.message,
        });
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
        ///get id
        const id= req.user.id;
        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'User Data fetched successfully',
            userDetails,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        });
    }
    }
    exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      console.log("Received file:", displayPicture, "for user ID:", userId);
      const image = await uploadImageToCloudinary(
        displayPicture.tempFilePath,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image);

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
      .populate({
        path: "courses",
        populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
        },
      })
      .exec()

      userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.instructorDashboard = async(req, res) => {
	try{
		const courseDetails = await Course.find({instructor:req.user.id});

		const courseData  = courseDetails.map((course)=> {
			const totalStudentsEnrolled = course.studentsEnrolled.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({courses:courseData});

	}
	catch(error) {
		console.error(error);
		res.status(500).json({message:"Internal Server Error"});
	}
}