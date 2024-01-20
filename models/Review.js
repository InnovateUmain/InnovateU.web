import mongoose from "mongoose";
const ReviewSchema=new mongoose.Schema({
    name:{type:String,required:true},
    img:{type:String,required:true},
    review:{type:String,default:''},
    title:{type:String,default:''},
},{timestamps:true})
mongoose.models={}
export default mongoose.model('Review',ReviewSchema);