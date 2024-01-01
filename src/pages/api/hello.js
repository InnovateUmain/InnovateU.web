import connectDb from "../../middleware/mongoose";
const nodemailer = require("nodemailer");
var QRCode = require('qrcode')
const handler = async (req, res) => {
    var img = await QRCode.toDataURL("55555555");
    const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: "thebasirkhanofficial@gmail.com",
          pass: "bOTLR5E0phXVM2qm",
        },
      });
      const info = await transporter.sendMail({
        from: '<support@InnovateU.com>', // sender address
        to: `khanbasir5555@gmail.com`, // list of receivers
        subject: `🎉 Welcome to InnovateU! Your Account is Ready 🚀`, // Subject line
        text: "Account Created Successfully", // plain text body
        html: `
         `, 
      });
res.status(200).json({ 

    success:true,dEVS:"bASIRKHAN",message:"Hello world",name:"Basir Khan"})
}
export default connectDb(handler);