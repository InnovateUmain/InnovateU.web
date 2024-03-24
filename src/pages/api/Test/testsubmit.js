import connectDb from "@/middleware/mongoose";
import TestReg from "../../../../models/TestReg";
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {

let test = jwt.verify(req.body.token,process.env.JWT_SECRET);
console.log(test);
const data = await TestReg.find({email:test.email});
res.status(200).json({data,successs:true})
}
export default connectDb(handler);