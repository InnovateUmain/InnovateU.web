import connectDb from "../../middleware/mongoose";
import Revent from "../../../models/Revent";
const Razorpay = require('razorpay');
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const handler = async (req, res) => {
    const rand = Math.floor(Math.random()*1000000);
    const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            Revent: 'thebasirkhanofficial@gmail.com',
            pass: 'bOTLR5E0phXVM2qm'
        }
      });
if(req.method==="POST"){
   if(req.body.estatus=="new") {
    let remail = await Revent.find({email:req.body.email});
    let mevent= await Revent.find({phone:req.body.phone});
    if(remail.length>0){
        res.status(400).json({success:false,message:"This email is already registered"})
    }
    else if(mevent.length>0){
        res.status(400).json({success:false,message:"This phone number is already registered"})
    }
    else{
var instance = new Razorpay({ key_id: `${process.env.NEXT_PUBLIC_KEY_ID}`, key_secret: `${process.env.NEXT_PUBLIC_KEY_SECRET}` })
var options = {
  amount: 500*100,
  currency: "INR",
  receipt: `${rand}`
};
try{
instance.orders.create(options, async function(err, order) {
  console.log(order);
  let eventr = new Revent({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    clg:req.body.clg,
    github:req.body.github,
    linkedin:req.body.linkedin,
    title:req.body.title,
    img:req.body.img,
    orderid:order.id,
})
let a = await eventr.save();
res.status(200).json({success: true,message:"Your Details Saved Successfully Proceeed to Payment",order});
})}
catch{
res.status(400).json({success:false,message:"Cannot intialize your payment server is busy please try again after some time"})
}
        
   }
}
if(req.body.estatus=="old"){
    const info = await transporter.sendMail({
        from: '<support@InnovateU.com>', // sender address
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
                    <img src="https://res.cloudinary.com/dawzncoau/image/upload/v1695498332/mfourzez3vwheixn36ql.png" alt="InnovateU Logo Logo" width="150">
                    <h1 style="font-size: 24px; margin-top: 30px; color: #333;">Welcome to InnovateU</h1>
                    <p style="font-size: 16px; color: #666; margin-top: 20px;">You have successfully created your account on InnovateU.</p>
                    <p style="font-size: 16px; color: #666;">Start managing your projects more efficiently and collaboratively with our powerful tools.</p>
                    <a href="" style="display: inline-block; margin-top: 30px; padding: 15px 30px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">Login to InnovateU</a>
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