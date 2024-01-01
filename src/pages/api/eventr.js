import connectDb from "../../middleware/mongoose";
import Revent from "../../../models/Revent";
const Razorpay = require("razorpay");
var jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
var QRCode = require('qrcode')
const handler = async (req, res) => {
  //genrating ticketid randomly
  const ticketid = "IN" + Math.floor(Math.random() * 100000) + "D24";
  //genrating random id for razorpay reciept
  const rand = Math.floor(Math.random() * 1000000);
  //intializing node mailer
  const transporter = await nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "thebasirkhanofficial@gmail.com",
      pass: "bOTLR5E0phXVM2qm",
    },
  });
  //
  if (req.method === "POST") {
    //get user data for event (used in confirmation page)
    if(req.body.estatus=="getdata"){
      console.log(req.body.id);
      try{
        let a = await Revent.findById(req.body.id);
        var img = await QRCode.toDataURL(a.ticketid);
        res.status(200).json({ success: true, data: a,url:img });
      }
      catch(err){
        res.status(200).json({ success: true, message:"something went wrong" +err});
      }
      return;
    }
    //get user data via email (used in myevent and my ticket section)
    if(req.body.estatus=="getdataviaemail"){
      try{
        let a = await Revent.findOne({email:req.body.email})
        var img = await QRCode.toDataURL(a.ticketid);
        res.status(200).json({ success: true, data: a,url:img });
      }
      catch(err){
        res.status(200).json({ success: true, message:"something went wrong" +err});
      }
      return;
    }
    if (req.body.estatus == "checkuser") {
      try {
        let a = await Revent.findOne({ email: req.body.email });
        res.status(200).json({ success: true, data: a });
        console.log(a);
      } catch (err) {
        res.status(400).json({ success: false, message: "Something went wrong ! Please try again after some time " });
      }
      return;
    }
    if (req.body.estatus == "new") {
      let remail = await Revent.find({ email: req.body.email });
      let mevent = await Revent.find({ phone: req.body.phone });
      if (remail.length > 0) {
        res
          .status(400)
          .json({
            success: false,
            message: "This email is already registered",
          });
      } else if (mevent.length > 0) {
        res
          .status(400)
          .json({
            success: false,
            message: "This phone number is already registered",
          });
      } else {
        var instance = new Razorpay({
          key_id: `${process.env.NEXT_PUBLIC_KEY_ID}`,
          key_secret: `${process.env.NEXT_PUBLIC_KEY_SECRET}`,
        });
        var options = {
          amount: 500 * 100,
          currency: "INR",
          receipt: `${rand}`,
        };
        try {
          instance.orders.create(options, async function (err, order) {
            console.log(order);
            let eventr = new Revent({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              clg: req.body.clg,
              github: req.body.github,
              linkedin: req.body.linkedin,
              title: req.body.title,
              img: req.body.img,
              orderid: order.id,
              ticketid: ticketid,
             eventname: "InnovateU Devcon 2k24",
             eventdate: "15-19 JAN 2024",
            });
            let a = await eventr.save();
            res
              .status(200)
              .json({
                success: true,
                message: "Your Details Saved Successfully Proceeed to Payment",
                order,
              });
          });
        } catch {
          res
            .status(400)
            .json({
              success: false,
              message:
                "Cannot intialize your payment server is busy please try again after some time",
            });
        }
      }
    }
    if (req.body.estatus == "old") {
      
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "This methos is not allowed" });
  }
};
export default connectDb(handler);
