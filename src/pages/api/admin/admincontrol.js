import connectDb from "@/middleware/mongoose";
import Admin from "../../../../models/Admin";
const handler = async (req, res) => {

if(req.body.status=="getalldata"){
    try{
        const data = await Admin.find({});
        res.status(200).json({data:data,success:true})
    }
    catch(err){
        res.status(400).json({success:false,message:"Something went  Please try again later"+err});
    }
}
if(req.body.status=="delete"){
    try{
        let a = await Admin.findByIdAndDelete({_id:req.body.id});
        res.status(200).json({success:true,message:"Admin deleted successfully"});
    }
    catch(err){
        res.status(400).json({success:false,message:"Something went  Please try again later"+err});
    }
}

}
export default connectDb(handler);