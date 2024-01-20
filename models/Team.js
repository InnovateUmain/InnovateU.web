import mongoose from "mongoose";
const TeamSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,unique:true},
    img:{type:String,required:true},
    desc:{type:String,default:''},
    github:{type:String,default:''},
    linkedin:{type:String,default:''},
    twitter:{type:String,default:''},
    title:{type:String,default:''},
    position:{type:String,default:''},
},{timestamps:true})
mongoose.models={}
export default mongoose.model('Team',TeamSchema);