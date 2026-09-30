const mongoose = require('mongoose');
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:15*60,
    },
});
//schema ke baad module sai pahle
async function sendVerificationOTP(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email from anyhelp", emailTemplate(otp));
        console.log("On Email, OTP sent Successfully", mailResponse);
    }
    catch(err){
        console.log("error occured while sending mails: ",err);
        throw err;
    }
}

OTPSchema.pre("save", async function () {
    await sendVerificationOTP(this.email, this.otp);
});

module.exports = mongoose.model("OTP",OTPSchema);
