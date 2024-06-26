import connectDb from "../../middleware/mongoose";
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
      
    if(req.method=="POST"){
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

        const info = await transporter.sendMail({
            from: '<support@innovateu.org>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: `Query Submitted Confirmation `, // Subject line
            text: "Query Submitted Confirmation", // plain text body
            html: `
            <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f4f4f4">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff;">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <h1 style="color: #333;">Your Query Submitted Successfully</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <p style="color: #666;">Thank you for submitting your query. Our team is working on it and will get back to you as soon as possible.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <a href="${process.env.NEXT_PUBLIC_HOST}" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none;">Visit Our Website</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <p style="color: #666;">You are receiving this email because you contacted us. If you have any further questions, please don't hesitate to reply to this email innovateuorg@gmail.com.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
            `, 
          });
        
          const info1 = await transporter.sendMail({
            from: '<support@innovateu.com>', // sender address
            to: "khanbasir5555@gmail.com, csanimeshsingh747@gmail.com, saneev.das@cutm.ac.in, 220301120209@cutm.ac.in", // list of receivers
            subject: `Query Submitted Confirmation `, // Subject line
            text: "Query Submitted Confirmation", // plain text body
            html: `
            <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f4f4f4">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff;">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <h1 style="color: #333;">InnovateU User Query</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <p style="color: #666;"><strong>Name:</strong> ${req.body.name}</p>
                            <p style="color: #666;"><strong>Email:</strong> ${req.body.email}</p>
                            <p style="color: #666;"><strong>Query Message: ${req.body.message} </strong></p>
                            <p style="color: #666; padding: 10px; background-color: #f9f9f9;">Hii,Team <br>I wanted to bring to your attention an issue that has been reported. It's crucial that we address this promptly to ensure a smooth customer experience. Please investigate the matter and take the necessary steps to resolve it as soon as possible</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <a href="mailto:${req.body.email}" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none;">Respond to User</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <p style="color: #666;">You are receiving this email because a user has submitted a query. Please respond promptly.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
            `, 
          });
          res.status(200).json({success:true,message:"Query Submitted Successfully"});
    }
    else{
        res.status(400).json({success:false,message:"Invalid Request"});
    }



}
export default connectDb(handler);