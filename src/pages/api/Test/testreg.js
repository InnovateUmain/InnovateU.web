import connectDb from "@/middleware/mongoose";
import TestReg from "../../../../models/TestReg";
const nodemailer = require("nodemailer");
const handler = async (req, res) => {
    //post method for reg opt
    if(req.method==="POST"){
     if(req.body.status=="reg"){
     let a  = await TestReg.findOne({email:req.body.email,testid:req.body.testid});
     //if user is not registered for test
     if(a){
            res.status(200).json({ success:false,message:"You have already registered for this test"});
     }
     //if user is not registered for test
     else{
        console.log(req.body);
        try{
            let testReg = new TestReg({
                name:req.body.name,
                email:req.body.email,
                testname:req.body.testname,
                testid:req.body.testid,
                phone:req.body.phone,
                clg:req.body.clg,
                github:req.body.github,
                linkedin:req.body.linkedin,
            });
            await testReg.save();
            res.status(200).json({ success:true,message:"You have successfully registered for this test"});
        }
        catch(err){
            res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
            console.log(err);
        }
     }
     }
     //end of post method route for test registration
    }
    else{
        try{
            let testReg = await TestReg.find({});
            res.status(200).json({ success:true,data:testReg});
        }
        catch(err){
            res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
            
        }
    }
    //else post route for test registration
}
export default connectDb(handler);