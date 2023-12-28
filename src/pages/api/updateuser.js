import connectDb from "../../middleware/mongoose";
import User from "../../../models/User";
const handler = async (req, res) => {
    if(req.method==='POST'){
const user = await User.findOneAndUpdate({email:req.body.email},{
    name:req.body.name,
    phone:req.body.phone,
    bio:req.body.bio,
    clg:req.body.college,
    github:req.body.github,
    linkedin:req.body.linkedin,
    website:req.body.website,
});
res.status(200).json({success:true,message:"Profile updated successfully"})
    }
    else{
        res.status(400).json({success:false,message:"Invalid request"})
    }
}

export default connectDb(handler);