import connectDb from "../../middleware/mongoose";
import User from "../../../models/User";
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {

let user = jwt.verify(req.body,process.env.JWT_SECRET);
const data = await User.findOne({email:user.email});
res.status(200).json({data,successs:"true"})
}
export default connectDb(handler);