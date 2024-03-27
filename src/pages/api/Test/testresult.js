import connectDb from "@/middleware/mongoose";
import TestReg from "../../../../models/TestReg";
const nodemailer = require("nodemailer");
const handler = async (req, res) => {
    const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        }
      });
if(req.method === 'POST'){
    console.log(req.body);
    //if method for post starts here
    if(req.body.status=="checked"){
       try{
        const testreg = await TestReg.findByIdAndUpdate({_id:req.body.id},{score:req.body.score,
            scorestatus:req.body.scorestatus,
            status:req.body.statuses
        });
        res.status(200).json({success:true,message:'Test Checked Updated Successfully.'});
       }
       catch(err){
        res.status(400).json({success:false,message:'Something went wrong. Please try again later.'});
       }
    }//if method for checked ends here
    //else if starts here
    else if(req.body.status=="selected"){
    try{
        const testreg = await TestReg.findByIdAndUpdate({_id:req.body.id},{score:req.body.score,
            scorestatus:req.body.scorestatus,
            selected:req.body.selected,
            status:req.body.statuses
        }); 
        const info = await transporter.sendMail({
            from: '<support@Innovateu.org.in>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: `🎉 Congratulations! You're Selected for the Next Round of ${testreg.testname} challenge🌟`, // Subject line
            text: "🎉 Congratulations! You're Invited to the Next Round 🌟", // plain text body
            html: `
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
            <tr>
                <td align="center">
                    <table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="margin-top: 20px; margin-bottom: 20px;">
                        <tr>
                            <td align="center" bgcolor="#007bff" style="padding: 10px;">
                                <!-- Add your logo image inside the src attribute below -->
                                <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png" alt="INNOVATEU LOGO" width="150" style="display: block;"/>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; font-size: 16px; line-height: 1.6;">
                                <p>Dear ${testreg.name}</p>
                                <p>We are pleased to inform you that you have been selected for the next round of our selection process for ${testreg.testname} challenge. This will be an online interview with our hiring team.</p>
                                <p><strong>Score & Interview Details:</strong></p>
                                <ul>
                                    <li><strong>Test Score:</strong> ${req.body.score} </li>
                                    <li><strong>Date:</strong> Any Time</li>
                                    <li><strong>Mode:</strong> Through our Website</li>
                                    <li><strong>Platform:</strong> Google Meet,Zoom</li>
                                </ul>
                                <p>Please confirm your availability by clicking on the link below:</p>
                                <table cellspacing="0" cellpadding="0"> <tr>
                                    <td align="center" width="200" height="40" bgcolor="#007bff" style="border-radius: 5px;">
                                        <a href="https://cal.com/innovateu" style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 10px 20px; display: inline-block;">Confirm Attendance</a>
                                    </td>
                                </tr> </table>
                                <p>If you have any questions or need to reschedule, please do not hesitate to contact us at techinnovateu@gmail.com.</p>
                                <p>Best regards,</p>
                                <p>Team InnovateU<br>
                                Developer Community<br>
                                InnovateU</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#eeeeee" style="text-align: center; font-size: 12px; padding: 10px;">
                                © 2024 innovateu.org.in. All rights reserved.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
            `, 
          });
        res.status(200).json({success:true,message:'Test Selected Updated Successfully.'});
    }
    catch(err){
        res.status(400).json({success:false,message:'Something went wrong. Please try again later.'});
        console.log(err);
    }
}
    //else if ends here
    else if(req.body.status=="rejected"){
        try{
            const testreg = await TestReg.findByIdAndUpdate({_id:req.body.id},{score:req.body.score,
                scorestatus:req.body.scorestatus,
                selected:req.body.selected,
                status:req.body.statuses
            }); 
            const info = await transporter.sendMail({
                from: '<support@Innovateu.org.in>', // sender address
                to: `${req.body.email}`, // list of receivers
                subject: `Update on Your Application for ${testreg.testname} challenge`, // Subject line
                text: "Update on Your Application", // plain text body
                html: `
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
                    <tr>
                        <td align="center">
                            <table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="margin-top: 20px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png" alt="Company Logo" width="120" style="display: block; margin-bottom: 20px;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; font-size: 16px; line-height: 1.6; color: #333;">
                                        <p>Dear ${testreg.name},</p>
                                        <p>Thank you for taking the time to give test for the ${testreg.testname} challenge role at Innovateu and for your interest in joining our team. We wanted to let you know that after careful consideration, we have decided to move forward with another candidate for this position.</p>
                                        <p>We received applications from many qualified individuals for this position. It was a difficult decision, but we have selected the candidate whom we believe most closely matches the job requirements of the position.</p>
                                        <p>We would like to thank you again for offering us the opportunity to review your background and experience. We will keep your resume on file for future openings that match your skills and experience. Please feel free to apply for any positions that you feel you are qualified to fill.</p>
                                        <p>We wish you all the best in your job search and future professional endeavors.</p>
                                        <p>Your Test Score : ${req.body.score}</p>
                                        <p>Sincerely,</p>
                                        <p>Team InnovateU<br>
                                        Developer's Community<br>
                                        InnovateU</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#eeeeee" style="text-align: center; font-size: 12px; padding: 10px;">
                                    © 2024 innovateu.org.in. All rights reserved.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
                `, 
              });
            res.status(200).json({success:true,message:'Test Selected for rejection Updated Successfully.'});
        }
        catch(err){
            res.status(400).json({success:false,message:'Something went wrong. Please try again later.'});
        } 
    }
}
else{
    res.status(400).json({message:'Invalid  Request. '});
}
}
export default connectDb(handler);