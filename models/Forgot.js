import mongoose from "mongoose";
const ForgotSchema=new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
},{timestamps:true})
mongoose.models={}
export default mongoose.model('Forgot',ForgotSchema);