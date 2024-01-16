import mongoose, { Schema } from "mongoose";
const EventSchema=new mongoose.Schema({
    eventname:{type:String,required:true},
    eventdate:{type:String,required:true},
    eventtime:{type:String,required:true},
    eventduration:{type:String,required:true},
    eventdesc:{type:String,required:true},
    eventvenue:{type:String,required:true},
    eventtype:{type:String,default:'pending'},
    eventposter:{type:String,default:'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'},
    eventreglink:{type:String,default:''},
    eventregfee:{type:String,default:'free'},
    eventreglastdate:{type:String,default:''},
    eventreglimit:{type:String,default:'unlimited'},
    eventregstatus:{type:String,default:'open'},
    eventregcount:{type:Number,default:'0'},
    eventspeaker:{type:String,default:''},
},{timestamps:true})
mongoose.models={}
export default mongoose.model('Event',EventSchema);