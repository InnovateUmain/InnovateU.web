import connectDb from "@/middleware/mongoose";
import Revent from "../../../../../models/Revent";
const nodemailer = require("nodemailer");

const handler = async (req, res) => {
    if(req.method==="POST"){
    if(req.body.status=="getdata"){
        try{
            let a = await Revent.find({});
            res.status(200).json({success:true,data:a})
        }
        catch(err){
            res.status(200).json({success:false,message:"something went wrong" +err})
        }
        return;
    }//end of getdata if
    
    }
    //post if end
    else{
        res.status(400).json({success:false,message:"Invalid Request"})
    }

}
export default connectDb(handler);