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
    if(req.body.status=="getnev"){
        try{
        const eventdata = await Revent.find({$and:[{eventname:req.body.eventname},{eventstatus:req.body.eventstatus}]});
        res.status(200).json({success:true,data:eventdata})
        }
        catch(err){
            res.status(200).json({success:false,message:"something went wrong" +err})
        }
    }
    //end of getnev if
    //getnet if start
    if(req.body.status=="getnet"){
        try{
        const eventdata = await Revent.find({$and:[{eventname:req.body.eventname},{paymentstatus:req.body.eventtype}]});
        res.status(200).json({success:true,data:eventdata})
        }
        catch(err){
            res.status(200).json({success:false,message:"something went wrong" +err})
        }
    }
    //getnet if end
    //getntic if start
    if(req.body.status=="getntic"){
        try{
        const eventdata = await Revent.find({$and:[{eventname:req.body.eventname},{ticketstatus:req.body.ticketstatus}]});
        res.status(200).json({success:true,data:eventdata})
        }
        catch(err){
            res.status(200).json({success:false,message:"something went wrong" +err})
        }
    }
    //getntic if end
    //getename if start
    if(req.body.status=="getename"){
        try{
        const eventdata = await Revent.find({eventname:req.body.eventname});
        res.status(200).json({success:true,data:eventdata})
        }
        catch(err){
            res.status(200).json({success:false,message:"something went wrong" +err})
        }
    }
    //getename if end
    //UPDATE if start
    console.log(req.body);
    if(req.body.statuss=="eventupdate"){
        console.log(req.body);
        try{
        const eventdata = await Revent.findByIdAndUpdate({_id:req.body.id},{
            name:req.body.name,
            phone:req.body.phone,
            eventstatus:req.body.status,
            paymentstatus:req.body.paymentstatus,
            ticketstatus:req.body.tiketclm,
            eventgrplink:req.body.eventgrplink,
            github:req.body.github,
            linkedin:req.body.linkedin,
            clg:req.body.clg,
        });
        res.status(200).json({success:true,message:"updated successfully"})
        }
        catch(err){
            console.log(err);
            res.status(200).json({success:false,message:"something went wrong" +err})
        }
    }
    }
    //post if end
    else{
        res.status(400).json({success:false,message:"Invalid Request"})
    }

}
export default connectDb(handler);