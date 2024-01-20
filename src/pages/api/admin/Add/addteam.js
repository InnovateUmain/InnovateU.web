import connectDb from "@/middleware/mongoose";
const nodemailer = require("nodemailer");
import Team from "../../../../../models/Team";
const handler = async (req, res) => {
    if(req.method=="POST"){

        if(req.body.status=="addteam"){
            try{
                let a = new Team({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    img:req.body.img,
                    desc:req.body.desc,
                    github:req.body.github,
                    linkedin:req.body.linkedin,
                    twitter:req.body.twitter,
                    title:req.body.title,
                    position:req.body.position,
                })
               let b = await a.save();
                res.status(200).json({success:true,message:"Team member added successfully"});
            }
            catch(err){
                console.log(err);
                res.status(400).json({success:false,message:"Something went  Please try again later"+err});
            }

        };//end of add team
        if(req.body.status=="updateteam"){
            try{
                let a = await Team.findByIdAndUpdate({_id:req.body.id},{
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    img:req.body.img,
                    desc:req.body.desc,
                    github:req.body.github,
                    linkedin:req.body.linkedin,
                    twitter:req.body.twitter,
                    title:req.body.title,
                    position:req.body.position,
                })
                res.status(200).json({success:true,message:"Team member updated successfully"});
                
            }
            catch(err){
                res.status(400).json({success:false,message:"Something went  Please try again later"+err});
            }

          
        }
        //end of update team
        if(req.body.status=="delete"){
            try{
                let b = await Team.findByIdAndDelete({_id:req.body.id});
                res.status(200).json({success:true,message:"Team member deleted successfully"});
            }catch(err){
                res.status(400).json({success:false,message:"Something went  Please try again later"+err});
            }

            
        }//end of delete team
        
        if(req.body.status=="getall"){
            try{
             let a = await Team.find();
                res.status(200).json({success:true,data:a});
            }
            catch(err){
                res.status(400).json({success:false,message:"Something went  Please try again later"+err});
        }
    }
    if(req.body.status=="lead"){
        try{
         let a = await Team.find({position:"lead"});
            res.status(200).json({success:true,data:a});
        }
        catch(err){
            res.status(400).json({success:false,message:"Something went  Please try again later"+err});
    }
}
if(req.body.status=="manager"){
    try{
     let a = await Team.find({position:"manager"});
        res.status(200).json({success:true,data:a});
    }
    catch(err){
        res.status(400).json({success:false,message:"Something went  Please try again later"+err});
}
}
if(req.body.status=="member"){
    try{
     let a = await Team.find({position:"member"});
        res.status(200).json({success:true,data:a});
    }
    catch(err){
        res.status(400).json({success:false,message:"Something went  Please try again later"+err});
}
}


    //end of get all team
    
    }
    else{
        res.status(400).json({success:false,message:"Method not allowed"});
    }
    
}
export default connectDb(handler);