var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
import connectDb from "@/middleware/mongoose";
import Admin from "../../../../models/Admin";
const handler = async (req, res) => {
if(req.method=="POST"){
    let user = await Admin.findOne({email:req.body.email});
    console.log(user);
    
    if(user){
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    const decryptpass = bytes.toString(CryptoJS.enc.Utf8);

        if(req.body.email==user.email&&req.body.password==decryptpass){ 
          const token = jwt.sign({email:user.email,name:user.name}, process.env.JWT_SECRET,);
    res.status(200).json({success: true,token,email:user.email,message:"User logged in successfully"});
}
else{

res.status(200).json({ success: false,message:"Invalid credentials"});
}
}
else{
    res.status(200).json({ success: false,message:"No user found"});
}
}
else{
    res.status(400).json({success:false,message:"This method is not allowed"})
}

}
export default connectDb(handler);