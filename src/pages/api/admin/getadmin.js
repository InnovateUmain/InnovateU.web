import connectDb from "@/middleware/mongoose";
import Admin from "../../../../models/Admin";
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {

let user = jwt.verify(req.body.token,process.env.JWT_SECRET);
const data = await Admin.findOne({email:user.email});
res.status(200).json({data,successs:true})
}
export default connectDb(handler);