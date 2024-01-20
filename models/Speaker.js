import mongoose from "mongoose";
const SpeakerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,default:''},
    phone:{type:Number,default:''},
    img:{type:String,required:true},
    desc:{type:String,default:''},
    github:{type:String,default:''},
    linkedin:{type:String,default:''},
    twitter:{type:String,default:''},
    title:{type:String,default:''},
    position:{type:String,default:''},
},{timestamps:true})
mongoose.models={}
export default mongoose.model('Speaker',SpeakerSchema);