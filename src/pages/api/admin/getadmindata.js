import connectDb from "@/middleware/mongoose";
import Admin from "../../../../models/Admin";
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {

let user = jwt.verify(req.body,process.env.JWT_SECRET);
const data = await Admin.findOne({email:user.email});

if(req.body.status=="getalldata"){
    try{
        const data = await Admin.find({});
        res.status(200).json({data,success:true})
    }
    catch(err){
        res.status(400).json({success:false,message:"Something went  Please try again later"+err});
    }
}

res.status(200).json({data,successs:true})
}
export default connectDb(handler);