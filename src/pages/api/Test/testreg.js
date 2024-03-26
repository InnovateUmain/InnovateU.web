import connectDb from "@/middleware/mongoose";
var jwt = require('jsonwebtoken');
import Test from "../../../../models/Test";
import TestReg from "../../../../models/TestReg";
const nodemailer = require("nodemailer");
const handler = async (req, res) => {
    const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: 'thebasirkhanofficial@gmail.com',
            pass: 'bOTLR5E0phXVM2qm'
        }
      });
    //post method for reg opt
    if(req.method==="POST"){
     if(req.body.status=="reg"){
     let a  = await TestReg.findOne({email:req.body.email,testid:req.body.testid});
     //if user is not registered for test
     if(a){
            res.status(200).json({ success:false,message:"You have already registered for this test"});
     }
     //if user is not registered for test
     else{
        console.log(req.body);
        let TestDetails;
        try{
            TestDetails = await Test.findById({_id:req.body.testid});
        }
        catch(err){
            console.log(err)
        }
        try{
            let testReg = new TestReg({
                name:req.body.name,
                email:req.body.email,
                testname:req.body.testname,
                testid:req.body.testid,
                phone:req.body.phone,
                clg:req.body.clg,
                github:req.body.github,
                linkedin:req.body.linkedin,
            });
            await testReg.save();
            const token = jwt.sign({email:req.body.email,testid:req.body.testid}, process.env.JWT_SECRET);

            const info = await transporter.sendMail({
                from: '<support@Innovateu.org.in>', // sender address
                to: `${req.body.email}`, // list of receivers
                subject: ` 🚀 ${req.body.testname} Test Registration Confirmation: Save the Date for Your Test! 📅`, // Subject line
                text: "Test Registration has been successfully done", // plain text body
                html: `
                <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
<table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
<tr>
<td align="center" style="padding-bottom: 20px;">
<img src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png" alt="Innovateu Logo" width="200" style="max-width: 100%;">
</td>
</tr>
<tr>
<td align="center" style="padding-bottom: 20px;">
<h1 style="color: #333; margin: 0; font-size: 24px;">${req.body.testname} Test Registration Successful!</h1>
<p style="color: #333; margin: 10px 0; font-size: 16px;">Thank you for registering for the ${req.body.testname}.</p>
</td>
</tr>
<tr>
<td style="background-color: #f3f3f3; border-radius: 5px; padding: 20px;">
<h2 style="color: #333; margin-top: 0; font-size: 20px;">Test Details</h2>
<p style="color: #333; margin: 10px 0; font-size: 16px;"><strong>Date:</strong> ${TestDetails.testdate.slice(0,10)}</p>
<p style="color: #333; margin: 10px 0; font-size: 16px;"><strong>Time:</strong> ${TestDetails.testdate.slice(11,16)} (IST)</p>
<p style="color: #333; margin: 10px 0; font-size: 16px;"><strong>Test Duration:</strong> 2 hours</p>
</td>
</tr>
<tr>
<td align="center" style="padding-top: 30px;">
<a href="${process.env.NEXT_PUBLIC_HOST}/CodeCraft" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 18px;">Access Test Page</a>
</td>
</tr>
<tr>
<td align="center" style="padding-top: 30px;">
<p style="color: #666; font-size: 14px;">If you have any questions, feel free to contact us at <a href="mailto:techinnovateu@gmail.com" style="color: #666; text-decoration: none;">techinnovateu@gmail.com</a>.</p>
<p style="color: #666; font-size: 14px;">This is an automated message. Please do not reply.</p>
</td>
</tr>
</table>
</body>
                `, 
              });
            res.status(200).json({ success:true,message:"You have successfully registered for this test",token:token});
        }

        catch(err){
            res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
            console.log(err);
        }
     }
    
    
     }
     //end of post method route for test registration
     //post method for checking if user is registered for test
     if(req.body.status=="check"){
       
        try{
            let a  = await TestReg.findOne({email:req.body.email,testid:req.body.testid});
            
            if(a){
                const token = jwt.sign({email:req.body.email,testid:req.body.testid}, process.env.JWT_SECRET);
                res.status(200).json({ success:true,message:"You have already registered for this test",token:token});
            }
            else{
                res.status(200).json({ success:false,message:"You have not registered for this test"});
            }
        }
        catch(err){
            res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
        }
     }
     //end of post method route for checking if user is registered for test
     //post method for getting test details
     if(req.body.status=="submitTest"){
        console.log(req.body);
      try{
    let a = await TestReg.findOne({email:req.body.email,testid:req.body.testid});
    //if user is registered for test
    if(a){
        console.log("gonee")
        await a.updateOne({
            question1answer:req.body.question1,
            question2answer:req.body.question2,
            question3answer:req.body.question3,
            question4answer:req.body.question4,
            imgarr:req.body.imgarr,
            status:'submitted'
        });
//         const info = await transporter.sendMail({
//             from: '<support@Innovateu.org.in>', // sender address
//             to: `${a.email}`, // list of receivers
//             subject: ` 📝 Test Submission Acknowledgement: Thank You!`, // Subject line
//             text: "Test Submission Acknowledgement: Thank You!", // plain text body
//             html: `
//             <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
//     <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
//         <tr>
//             <td align="center" style="padding: 20px;">
//                 <table role="presentation" width="600px" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
//                     <tr>
//                         <td style="padding: 20px;">
//                             <!-- Logo -->
//                             <div style="text-align: center; margin-bottom: 20px;">
//                                 <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png" alt="innovateu Logo" style="max-width: 200px; height: auto;">
//                             </div>
//                             <h1 style="font-size: 24px; font-weight: bold; color: #333333; margin: 0 0 10px;">Thank You for Submitting the Test ${a.testname} </h1>
//                             <p style="font-size: 16px; color: #666666; margin: 0 0 20px;">We have received your test submission. We will review it carefully and get back to you as soon as possible.</p>
//                             <p style="font-size: 16px; color: #666666; margin: 0 0 20px;">If you have any questions or concerns, feel free to reach out to us at techinnovateu@gmail.com</p>
//                             <p style="font-size: 16px; color: #666666; margin: 0 0 20px;">This is an automated message. Please do not reply. </p>
//                             <p style="font-size: 16px; color: #666666; margin: 0 0 20px;">Warm Regards Team Innovateu.org</p>
//                             <table role="presentation" cellspacing="0" cellpadding="0" border="0">
//                                 <tr>
//                                     <td style="border-radius: 4px; background-color: #007bff; padding: 10px 20px;">
//                                         <a href="${process.env.NEXT_PUBLIC_HOST}" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">Return to Website</a>
//                                     </td>
//                                 </tr>
//                             </table>
//                         </td>
//                     </tr>
//                 </table>
//             </td>
//         </tr>
//     </table>
// </body>
//             `, 
//           });
        res.status(200).json({ success:true,message:"Test Submitted Successfully"});
    }
    //if user is not registered for test
    else{
        res.status(200).json({ success:false,message:"You have not registered for this test"});
    }
      }
      catch(err){
        res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
        console.log(err);
      }

     }//end of post method route for submitting test details
     if(req.body.status=="getTestDetails"){
        console.log(req.body.status,req.body.email);
        try{
            let a = await TestReg.findOne({email:req.body.email});
            res.status(200).json({ success:true,data:a});
        }
        catch(err){
            console.log(err);
            res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
        }
     }
//end of the post method route for getting test details
    }
    else{
        try{
            let testReg = await TestReg.find({});
            res.status(200).json({ success:true,data:testReg});
        }
        catch(err){
            res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
            
        }
    }
    //else post route for test registration
}
export default connectDb(handler);