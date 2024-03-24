import connectDb from "@/middleware/mongoose";

const nodemailer = require("nodemailer");
import Test from "../../../../models/Test";

const handler = async (req, res) => {
//add a new Test to the database
//if for the post method
if(req.method==="POST"){
    //if for the addTest
if(req.body.status=="addTest"){
    let test = new Test({
        testname: req.body.testname,
        testtype: req.body.testtype,
        testdate: req.body.testdate,
        testtitle: req.body.testtitle,
        testdescription: req.body.testdescription,
        testbenefits: req.body.testbenefits,
    });
    try{
        await test.save();
        res.status(200).json({success:true,message:"Test added successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error. Try again after some time"});
    }
}
//if ends here;
//if for the updateTest
else if(req.body.status=="updateTest"){
    try{
        await Test.findByIdAndUpdate({_id:req.body.id},{
            testname: req.body.testname,
            testtype: req.body.testtype,
            testdate: req.body.testdate,
            testtitle: req.body.testtitle,
            testdescription: req.body.testdescription,
            testbenefits: req.body.testbenefits,
        });

        res.status(200).json({success:true,message:"Test updated successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error. Try again after some time"});
    }
}
//update else if ends here
//else if for delete the Test..
else if(req.body.status=="deleteTest"){
    try{
        await Test.findByIdAndDelete({_id:req.body.id});
        res.status(200).json({success:true,message:"Test deleted successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error. Try again after some time"});
    }
}
//
//else if ends here
//else for bad request
else {
    res.status(400).json({success:false,message:"Bad request. At least one parameter is missing or invalid."});
}
//bad request else ends here
}

//else for get method
else{
    try{
        const tests = await Test.find();
        res.status(200).json({tests:tests});
    }
    catch(error){
        res.status(500).json({message:"Internal server error. Try again after some time"});
    }
}

}

export default connectDb(handler);