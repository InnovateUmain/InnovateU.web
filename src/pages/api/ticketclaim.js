import connectDb from "../../middleware/mongoose";
const nodemailer = require("nodemailer");
import Revent from "../../../models/Revent";
const handler = async (req, res) => {
  if(req.method=="POST"){
try{
let ticket = await Revent.findOne({ticketid:req.body.ticketid});
if(ticket!=null){
    if(ticket.ticketstatus=="claimed"){
        res.status(200).json({success:false,message:"Ticket already claimed"})
    }
    else{
        let update = await Revent.findOneAndUpdate({ticketid:req.body.ticketid},{ticketstatus:"claimed"});
        res.status(200).json({success:true,message:"Ticket claimed successfully"})
    }
}
else{
    res.status(200).json({success:false,message:"Ticket not found"})
}
}
catch(err){
res.status(400).json({success:false,message:err.message})
}
  }
  else{
        res.status(400).json({success:false,message:"This method is not allowed"})
  }  
}
export default connectDb(handler);