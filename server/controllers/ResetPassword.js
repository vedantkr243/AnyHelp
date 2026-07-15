// const { default: createPlugin } = require("tailwindcss/plugin");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();
//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get mail from req body
    const {email} =req.body;

    //chek user for this email, email validation
    //const user= await User.findOne({email: email});
    if(!email){
        return res.json({
            success:false,
            message:'Your email is not registered',
        });
    }
    const existingUser = await User.findOne({email:email})
   
       if(!existingUser){
           return res.status(400).json({
               success:false,
               message:"Email doesn't exist"
           })
       }
    //generate token
    const token = crypto.randomUUID();
    //update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
                                        {email},//{email:email},
                                        {
                                            token:token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                        },
                                    {new:true});//used for to get updated document
    //create url (use FRONTEND_URL env or fallback)
     const url = `http://localhost:3000/update-password/${token}`

       
    //send mail containing the url
    await mailSender(email,
        "password Reset Link",
        `password Reset Link :${url}`
    );
    //return response 
    return res.status(200).json({
        success:true,
        message:"Email sent successfully, please check email and change password",
        token,
    })


    

//mailsend karne ka kaam
//ResetPasswordToken




    } catch (error) {
        console.log(error)
      return res.status(500).json({
        success:false,
        message:'Something went wrong while sending reset password mail',
        error:error.message,
      })  
    }
}
//resetpassword 
exports.resetPassword = async (req, res) => {
    try {
        //data fetch
    const {password, confirmPassword, token} =req.body;

    //validation
    if(!token||!password||!confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Enter all details"
            })
        }
    //get user details from db using token
    const userDetails = await User.findOne({token:token});

    // if no entry - Invalid token
    if(!userDetails){
        return res.json({
            success:false,
            messsage:'Token is invalid',
        });
    }
    //token time check
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.status(500).json({
            success:false,
            message:'Token is expired , please regenerate your token',
        });
        
    }
    if(password!==confirmPassword){
        return res.json({
            success:false,
            message:'Password not matching'
        });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    //password update
    const updatedUser=await User.findOneAndUpdate(
    {token},
    {password:hashedPassword},
    {new:true},
);
    //return resposne
    return res.status(200).json({
        success:true,
        message:'password reset succefully',
    
});
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Something went wrong while sending reset password mail "
      })
    }
}
