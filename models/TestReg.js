import mongoose from "mongoose";
import { Schema } from "mongoose";
const TestRegSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{ type: String, required: true},
    testname:{type:Schema.Types.String,ref:'Test',default:''},
    testid:{type:Schema.Types.ObjectId,ref:'Test',default:''},
    clg:{type:String,default:''},
    phone:{type:String,default:''},
    github:{type:String,default:''},
    linkedin:{type:String,default:''},
    score:{type:Number,default:0},
    status:{type:String,default:'registered'},
    scorestatus:{type:String,default:'not checked'},
    selected:{type:String,default:'pending'},
}, { timestamps: true });
mongoose.models = {};
export default mongoose.model('TestReg', TestRegSchema);