import connectDb from "@/middleware/mongoose";
import Admin from "../../../../models/Admin";
const handler = async (req, res) => {
    if(req.method==='POST'){
const user = await Admin.findOneAndUpdate({email:req.body.email},{
    name:req.body.name,
    phone:req.body.phone,
    bio:req.body.bio,
    img:req.body.img,
    title:req.body.title,
});
res.status(200).json({success:true,message:"Profile updated successfully"})
    }
    else{
        res.status(400).json({success:false,message:"Invalid request"})
    }
}

export default connectDb(handler);