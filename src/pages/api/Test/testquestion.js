import connectDb from "@/middleware/mongoose";
import Testq from "../../../../models/Testq";

const handler = async (req, res) => {
    //post method for reg opt
    if(req.method==="POST"){
        //if for add endpoint
        if(req.body.status=="add"){
            console.log(req.body);
            try{
                let testq = new Testq({
                   testid:req.body.testid,
                   testname:req.body.testname,
                    question1:req.body.question1,
                    question2:req.body.question2,
                    question3:req.body.question3,
                    question4:req.body.question4,
                });
                await testq.save();
                res.status(200).json({ success:true,message:"Question added successfully."});
            }
            catch(err){
                res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
                console.log(err);
            }
        }//end of if method post endpoint
        //else for update endpoint
        else if(req.body.status=="update"){
            console.log(req.body);
           try{
                let testq = await Testq.findByIdAndUpdate({_id:req.body.id},{
                    testname:req.body.testname,
                    testid:req.body.testid,
                    question1:req.body.question1,
                    question2:req.body.question2,
                    question3:req.body.question3,
                    question4:req.body.question4,
                });
                res.status(200).json({ success:true,message:"Question updated successfully."});
           }
           catch(err){
                res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
                console.log(err);
           }
        }//else for update endpoint ended
        //else for delete endpoint
        else if(req.body.status=="delete"){
            try{
            let testq = await Testq.findByIdAndDelete({_id:req.body.id});
            res.status(200).json({ success:true,message:"Question deleted successfully."});
            }
            catch(err){
                res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
                console.log(err);
            }
        }//else for delete endpoint ended
        //else for getting questions added
        else{
            if(req.headers['authorization']==process.env.AUTH_KEY){
                try{
                    const data = await Testq.find({testid:req.body.testid});
                    res.status(200).json({data,success:true})
                }
                catch(err){
                    res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
                    console.log(err);
                
                }
                
            }
        }//else for getting questions added ended
    }
    //else for get for get request
    else{
        try{
            let data = await Testq.find({});
            res.status(200).json({data,success:true});
        }
        catch(err){
            res.status(200).json({ success:false,message:"Something went wrong. Please try again later"});
            console.log(err);
        }
    }
}
export default connectDb(handler);