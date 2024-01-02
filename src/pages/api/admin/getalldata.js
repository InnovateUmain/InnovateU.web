import connectDb from "@/middleware/mongoose";
import User from "../../../../models/User";
import Admin from "../../../../models/Admin";
import Revent from "../../../../models/Revent";
const handler = async (req, res) => {
    if(req.method=="POST"){
    if(req.body.status=="user"){
        try{
            const data = await User.find({});
            res.status(200).json({data,successs:true})
        }
        catch(err){
            res.status(200).json({success:false,message:err.message})
        }  
    }
    if(req.body.status=="eventpaid"){
        try{
            const data = await Revent.find({paymentstatus:"paid"});
            res.status(200).json({data,successs:true})
        }
        catch(err){
            res.status(200).json({success:false,message:err.message})
        }  
    }
    if(req.body.status=="event"){
        try{
            const data = await Revent.find({});
            res.status(200).json({data,successs:true})
        }
        catch(err){
            res.status(200).json({success:false,message:err.message})
        }  
    }
    if(req.body.status=="ticketclaimed"){
        try{
            const data = await Revent.find({ticketstatus:"claimed"});
            res.status(200).json({data,successs:true})
        }
        catch(err){
            res.status(200).json({success:false,message:err.message})
        }  
    }
}
    else{
        res.status(400).json({success:false,message:"This method is not allowed"})
    }
}

export default connectDb(handler)