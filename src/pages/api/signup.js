import connectDb from "../../middleware/mongoose";
import User from "../../../models/User"
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const handler = async (req, res) => {
    var quickemailverification = require('quickemailverification').client(process.env.EMAIL_VERIFY_API).quickemailverification();
    const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        }
      });
if(req.method==="POST"){
    
let auser = await User.find({email:req.body.email});
let muser= await User.find({phone:req.body.phone});

if(auser.length>0){
    res.status(400).json({success:false,message:"This email is already registered"})
    console.log(auser.length);
}
else if(muser.length>0){
    res.status(400).json({success:false,message:"This phone number is already registered"})
    console.log(muser);
}

else{
    // Email verification
    async function verifyEmail(email) {
        return new Promise((resolve, reject) => {
            quickemailverification.verify(email, function (err, response) {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }
    
    try {
        const response = await verifyEmail(req.body.email);    
        if (response.body.result === 'invalid') {
            res.status(400).json({ success: false, message: "This email is invalid ! Please try again with a valid email address." });
            return;
        }
    } catch (error) {
        console.error("Email verification error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    // Email verification ends here

        let user = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString(),
        })
        let a = await user.save();
        const token = jwt.sign({email:a.email,name:a.name}, process.env.JWT_SECRET,);
        res.status(200).json({success: true,token,email:user.email,message:"User registered successfully"});
    
    
        const info = await transporter.sendMail({
            from: '<support@Innovateu.org.in>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: `🎉 Welcome to InnovateU! Your Account is Ready 🚀`, // Subject line
            text: "Account Created Successfully", // plain text body
            html: `
            <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f4f4">
    <tr>
        <td style="padding: 20px 0;">
            <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td style="padding: 40px 20px; text-align: center;">
                        <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png" alt="InnovateU Logo Logo" width="150">
                        <h1 style="font-size: 24px; margin-top: 30px; color: #333;">Welcome to InnovateU</h1>
                        <p style="font-size: 16px; color: #666; margin-top: 20px;">You have successfully created your account on InnovateU.</p>
                        <p style="font-size: 16px; color: #666;">Start managing your projects more efficiently and collaboratively with our powerful tools.</p>
                        <a href="${process.env.NEXT_PUBLIC_HOST}/Login" style="display: inline-block; margin-top: 30px; padding: 15px 30px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">Login to InnovateU</a>
                        <p style="font-size: 14px; color: #999; margin-top: 20px;">If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:support@projectstudio.com" style="color: #007bff;">support@InnovateU.com</a>.</p>
                        <p style="font-size: 14px; color: #999;">Thank you for choosing InnovateU!</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    </table>
            `, 
          });

    
}

}
else{
    res.status(400).json({success:false,message:"This methos is not allowed"})
}
}
export default connectDb(handler);