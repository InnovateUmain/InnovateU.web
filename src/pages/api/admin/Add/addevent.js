import connectDb from "@/middleware/mongoose";
import Event from "../../../../../models/Event";
var QRCode = require('qrcode')
const handler = async (req, res) => {
    if(req.method==='POST'){
        //event add
        if(req.body.status=="add"){
            try{
                const  newevent = new Event({
                    eventname:req.body.eventname,
                    eventdate:req.body.eventdate,
                    eventtime:req.body.eventtime,
                    eventduration:req.body.eventduration,
                    eventdesc:req.body.eventdesc,
                    eventvenue:req.body.eventvenue,
                    eventtype:req.body.eventtype,
                    eventposter:req.body.eventposter,
                    eventreglink:req.body.eventreglink,
                    eventregfee:req.body.eventregfee,
                    eventreglastdate:req.body.eventreglastdate,
                    eventreglimit:req.body.eventreglimit,
                    eventregstatus:req.body.eventregstatus,
                    eventregcount:req.body.eventregcount,
                })
                const event=await newevent.save()
                res.status(200).json({success:true,message:"Event added successfully",})
               }
                 catch(error){
                    console.log(error)
                  res.status(500).json({success:false,message:"Internal server error. Please try again later"})
                 }
        }//end of if
        //
        if(req.body.status=="delete"){
            try{
                const event=await Event.findByIdAndDelete(req.body.id)
                res.status(200).json({success:true,message:"Event deleted successfully",})
               }
                 catch(error){
                  res.status(500).json({success:false,message:"Internal server error. Please try again later"})
                 }
        }//end of if
        //event update
        if(req.body.status=="update"){
            const event = await Event.findByIdAndUpdate({_id:req.body.id},{
                eventname:req.body.eventname,
                eventdate:req.body.eventdate,
                eventtime:req.body.eventtime,
                eventduration:req.body.eventduration,
                eventdesc:req.body.eventdesc,
                eventvenue:req.body.eventvenue,
                eventtype:req.body.eventtype,
                eventposter:req.body.eventposter,
                eventreglink:req.body.eventreglink,
                eventregfee:req.body.eventregfee,
                eventreglastdate:req.body.eventreglastdate,
                eventreglimit:req.body.eventreglimit,
                eventregstatus:req.body.eventregstatus,
                eventregcount:req.body.eventregcount,
                eventspeaker:req.body.eventspeaker,
            })
            res.status(200).json({success:true,message:"Event updated successfully",})
        }//end of if
        //event get
        if(req.body.status=="get"){
            try{
                const event=await Event.find({})
                res.status(200).json({success:true,message:"Event get successfully",event:event})
               }
                 catch(error){
                  res.status(500).json({success:false,message:"Internal server error. Please try again later"})
                 }
        }//end of if
        res.status(200).json({success:true,message:"Please add methods what to do ?",})
    }
    else{
      res.status(401).json({success:false,message:"Invalid request method"})
    }
}

export default connectDb(handler);