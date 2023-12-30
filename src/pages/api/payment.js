import connectDb from "../../middleware/mongoose";
import * as crypto from "crypto"
import Revent from "../../../models/Revent";
const handler = async (req, res) => {
    console.log(req.body);
    let order ;
    //validate payment using razorpay
      const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body;
      // Pass yours key_secret here
      const key_secret = process.env.NEXT_PUBLIC_KEY_SECRET;     
    
      // STEP 8: Verification & Send Response to User
        
      // Creating hmac object 
      let hmac = crypto.createHmac('sha256', key_secret); 
    
      // Passing the data to be hashed
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        
      // Creating the hmac in the required format
      const generated_signature = hmac.digest('hex');
        
        
      if(razorpay_signature===generated_signature){
        // razorpay_order_id
    //     razorpay_payment_id: 'pay_LzpFe1jHO8rymk',
    // razorpay_order_id: 'order_LzpFVdVQVloXpf',
    // razorpay_signature:
   
       order= await Revent.findOneAndUpdate({orderid:req.body.razorpay_order_id},{paymentstatus:"paid",paymentid:req.body.razorpay_payment_id
        ,paymentamount:500
      });
        res.redirect(`/components/Events/Eventconf?id=${order._id}`,200);
        }
      else{
         order =await Revent.findOneAndUpdate({orderid:req.body.razorpay_order_id},{paymentstatus:"pending",paymentid:req.body.razorpay_payment_id});
      }
}
export default connectDb(handler);