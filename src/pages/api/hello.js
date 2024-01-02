import connectDb from "../../middleware/mongoose";
const nodemailer = require("nodemailer");
var QRCode = require('qrcode')
const handler = async (req, res) => {
    
res.status(200).json({ 

    success:true,dEVS:"bASIRKHAN",message:"Hello world",name:"Basir Khan"})
}
export default connectDb(handler);