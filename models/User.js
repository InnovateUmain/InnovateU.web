import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,unique:true},
    password:{type:String,required:true},
    bio:{type:String,default:''},
    clg:{type:String,default:''},
    github:{type:String,default:''},
    linkedin:{type:String,default:''},
    website:{type:String,default:''},
    img:{type:String,default:''},
},{timestamps:true})
mongoose.models={}
export default mongoose.model('User',UserSchema);