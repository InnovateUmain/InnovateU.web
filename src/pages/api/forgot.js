import User from "../../../models/User";
import Forgot from "../../../models/Forgot";
var CryptoJS = require("crypto-js");
import connectDb from "@/middleware/mongoose";
import Jwt from "jsonwebtoken";
const nodemailer = require("nodemailer");
const handler = async (req, res) => {
  //check if the customer exists in the database or not
  if (req.body.sendMail == true) {
    const transporter = await nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: 'thebasirkhanofficial@gmail.com',
        pass: 'bOTLR5E0phXVM2qm'
      }
    });
    const user = await User.findOne({email:req.body.email });
 
    try{
      let token = `${Math.floor(Math.random()*1000000)}`;
      let f = await Forgot.findOne({ email: req.body.email });
      if (f != null) {
        if (f.email == req.body.email) {
          await Forgot.deleteOne({_id:f._id});
        }
      }
      let forgot = new Forgot({
        email: req.body.email,
        otp: token,
      });
      await forgot.save();
      const info = await transporter.sendMail({
        from: '<support@Project-Studio.com>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: `Otp For Password Reset`, // Subject line
        text: "Forgot Your Password", // plain text body
        html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
          <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <img src="https://res.cloudinary.com/dawzncoau/image/upload/v1701193584/InnovateU-removebg-preview_sgnisw.png" alt="InnovateU Logo" width="200">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 0;">
                    <h2 style="font-size: 24px; color: #333333; margin: 0;">Password Reset OTP for Your InnovateU Account</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="font-size: 16px; color: #666666;">Dear ${user.name},</p>
                    <p style="font-size: 16px; color: #666666;">We received a request to reset the password for your InnovateU account. To continue, please use the following One-Time Password (OTP):</p>
                    <p style="font-size: 20px; color: #333333; font-weight: bold;">OTP: <span style="color: #007bff;">${token}</span></p>
                    <p style="font-size: 16px; color: #666666;">Please note that this OTP is valid for a limited time and can only be used once.</p>
                    <p style="font-size: 16px; color: #666666;">If you didn't request this password reset or if you have any concerns about the security of your account, please contact our support team immediately at <a href="mailto:support@innovateu.com" style="color: #007bff; text-decoration: none;">support@innovateu.com</a>.</p>
                    <p style="font-size: 16px; color: #666666;">Thank you for choosing InnovateU.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        </body>
        `, 
      });
      // let email = `We have sent you this email in response to your request to reset your password on Techprint.in
      // <br/><br/>
      // To reset your password for, please follow the link below:
  
      // <a href="${`https://techprint.com/forgot?token=${token}`}</a>
  
      // <br/><br/>
  
      // We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your Techprint.in My Account Page and clicking on the "Change Address or Password" link.`;
      //reset password logic
      res.status(200).json({ success: true ,forgot});
    }
    catch(err){
      res.status(400).json({ success: false});
    }
    
  } 
 else {
  try{
    let tokenn = await Forgot.findOne({ otp: req.body.otp });
    if (tokenn != null) {
      await User.findOneAndUpdate(
        { email: tokenn.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.cpassword,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    }
    else {
      res.status(400).json({ success: false, message: "Invalid Otp" });
    }
  }
  catch{
    res.status(400).json({ success: false ,message:"Something went wrong please try again after some time !"});
  }
  
}
}
export default connectDb(handler);