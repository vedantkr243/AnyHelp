const Section=require("../models/Section");
const Course = require("../models/Course");
const Subsection = require("../models/SubSection");
exports.createSection=async(req,res)=>{
    try {
        //fetch data
        const {sectionName,courseId}=req.body;
        //validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })}
            //create Section
            console.log('Creating section:', sectionName);
            
            const newSection = await Section.create({sectionName});
            console.log('newsection',newSection);
            
            //update course section list
            const updatedCourseDetails =await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {$push:{courseContent:newSection._id}},
                                                    {new:true})
                                                     .populate({
                                                    path:"courseContent",
                                                    populate: {
                                                        path:"subSection"
                                                    }});
            
            return res.status(200).json({
                success:true,
                message:"Section created successfully",
                updatedCourseDetails,
                newSection,
            });
        }
    
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while creating section",
            error:error.message,
        });
    }
        }

        exports.updateSection=async(req,res)=>{
            try {
                //fetch data
                const {sectionName,sectionId,courseId}=req.body;
                //validation
                if(!sectionName || !sectionId){
                    return res.status(400).json({
                        success:false,
                        message:"All fields are required"
                    });
                }
                //update section
                const updatedSection = await Section.findByIdAndUpdate(
                                                                    sectionId,
                                                                    {sectionName},
                                                                    {new:true}
                                                                    );
                const updatedCourse = await Course.findById(courseId)
                                                            .populate({
                                                            path:"courseContent",
                                                            populate: {
                                                                path:"subSection"
                                                            }});
                
        // return res
                return res.status(200).json({
                    success:true,
                    message:"Section updated successfully",
                    updatedCourse
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:"Error while updating section",
                    error:error.message,
                });
            }
        }
        
        exports.deleteSection=async(req,res)=>{
            try {
                //fetch data - assuming that we are sending Id in params
                // const {sectionId,courseId}=req.body;
                const {sectionId, courseId}=req.body;//req.params;
                 if (!sectionId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        const sectionDetails = await Section.findById(sectionId);
        
        // //Section ke ander ke subsections delete kiye hai 
        sectionDetails.subSection.forEach( async (ssid)=>{
            await Subsection.findByIdAndDelete(ssid);
        })
        console.log('Subsections within the section deleted')
        //NOTE: Due to cascading deletion, Mongoose automatically triggers the built-in middleware to perform a cascading delete for all the referenced 
        //SubSection documents. DOUBTFUL!

        //From course, courseContent the section gets automatically deleted due to cascading delete feature
        await Section.findByIdAndDelete(sectionId);
        console.log('Section deleted')

        const updatedCourse = await Course.findById(courseId)
          .populate({
              path:"courseContent",
              populate: {
                  path:"subSection"
              }});
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
            updatedCourse
        })   
    }
            catch (error) {
                console.log(error);
                return res.status(500).json({   
                    success:false,
                    message:"Error while deleting section",
                    error:error.message,
                });
            }
        }