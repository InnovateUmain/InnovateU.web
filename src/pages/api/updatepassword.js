import User from "../../../models/User";
var CryptoJS = require("crypto-js");
import connectDb from "../../middleware/mongoose";
import Jwt from "jsonwebtoken";
 const  handler= async(req, res)=> {
    if(req.method=="POST"){
      try{
          let dbuser=await User.findOne({email:req.body.email});
          const bytes  = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
          const decryptpass = bytes.toString(CryptoJS.enc.Utf8);
          if(decryptpass==req.body.password){
            await User.findOneAndUpdate({email:dbuser.email},{password: CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString()});
            res.status(200).json({success:true,message:"Password updated successfully"})
          }
          else{
            res.status(400).json({success:false,error:"Invalid Password"});
          }
          
        }
      catch(err){ 
        res.status(400).json({success:false,error:"Something went wrong please try again later. Internal server error"})
      }
    }
    else{
        res.status(400).json({success:false})
    }
    
  }
  export default connectDb(handler)