import mongoose, { Schema } from "mongoose";
const EventRegisteredSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{ type: String, required: true, unique: false },
    phone:{type:Number,required:true},
    ticketid:{type:String,unique:true,required:true},
    orderid:{type:String,default:""},
    paymentid:{type:String,default:''},
    paymentstatus:{type:String,default:'pending'},
    paymentamount:{type:String,default:'free'},
    eventstatus:{type:String,default:'pending'},
    ticketstatus:{type:String,default:'not claimed'},
    eventname:{type:Schema.Types.String,ref:'Event',default:''},
    eventdate:{type:Schema.Types.String,ref:'Event',default:''},
    eventtime:{type:Schema.Types.String,ref:'Event',default:''},
    eventvenue:{type:Schema.Types.String,ref:'Event',default:''},
    eventtype:{type:Schema.Types.String,ref:'Event',default:''},
    eventid:{type:Schema.Types.ObjectId,ref:'Event',default:''},
    eventgrplink:{type:String,default:''},
    clg:{type:String,default:''},
    github:{type:String,default:''},
    linkedin:{type:String,default:''},
},{timestamps:true})
mongoose.models={}
export default mongoose.model('Revent',EventRegisteredSchema);