import mongoose from "mongoose";
const AdminSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,unique:true},
    password:{type:String,required:true},
    bio:{type:String,default:''},
    title:{type:String,default:''},
    admintype:{type:String,default:''},
    img:{type:String,default:''},
},{timestamps:true})
mongoose.models={}
export default mongoose.model('Admin',AdminSchema);