import connectDb from "../../middleware/mongoose";
import Revent from "../../../models/Revent";
const Razorpay = require("razorpay");
var jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
import Event from "../../../models/Event";
var QRCode = require("qrcode");
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
    if (req.body.estatus == "getdata") {
     
      try {
        let a = await Revent.findById(req.body.id);
        var img = await QRCode.toDataURL(a.ticketid);
        
        res.status(200).json({ success: true, data: a, url: img });
      } catch (err) {
        res
          .status(200)
          .json({ success: true, message: "something went wrong" + err });
      }
      return;
    }
    //get user data via email (used in myevent and my ticket section)
    if (req.body.estatus == "getdataviaemail") {
      try {
        let a = await Revent.find({ email: req.body.email });
        // var img = await QRCode.toDataURL(a.ticketid);
        res.status(200).json({ success: true, data: a, url: "" });
      } catch (err) {
        res
          .status(200)
          .json({ success: true, message: "something went wrong" + err });
      }
      return;
    }

    if (req.body.estatus == "checkuser") {
      try {
        let a = await Revent.findOne({ email: req.body.email });
        res.status(200).json({ success: true, data: a });
        console.log(a);
      } catch (err) {
        res
          .status(400)
          .json({
            success: false,
            message: "Something went wrong ! Please try again after some time ",
          });
      }
      return;
    }

    if (req.body.estatus == "new") {
      const event = await Event.findById({ _id: req.body.id });
      const find = await Revent.findOne({
        $and: [
          { email: req.body.email },
          { eventname: event.eventname },
          { paymentstatus: "free" },
        ],
      });
      const ppend = await Revent.findOne({
        email: req.body.email,
        eventname: event.eventname,
        paymentstatus: "pending",
      });
      const paid = await Revent.findOne({
        $and: [
          { email: req.body.email },
          { eventname: event.eventname },
          { paymentstatus: "paid"},
        ],
      });
      //console.log(paid==null, ppend==null, find==null,ppend.orderid);
      if (find != null) {
        res
          .status(400)
          .json({
            success: false,
            message: "You have already registered for this event",
          });
        return;
      } //if end

      if (ppend != null) {
        res
          .status(200)
          .json({
            success: true,
            message:
              "Your details are already saved . Please proceed for payment",
            event: event,
            order: ppend,
            orderid: ppend.orderid,
          });
        return;
      } //if end

      if (paid != null) {
        res
          .status(400)
          .json({
            success: false,
            message: "You have already registered for this event",
          });
        return;
      } //if end
      else {
        if (event.eventregfee == "free") {
          if (event.eventreglimit == "unlimited") {
            let eventr = new Revent({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              clg: req.body.clg,
              github: req.body.github,
              linkedin: req.body.linkedin,
              title: req.body.title,
              img: req.body.img,
              ticketid: ticketid,
              eventname: event.eventname,
              eventdate: event.eventdate,
              eventtype: event.eventtype,
              eventvenue: event.eventvenue,
              eventtime: event.eventtime,
              eventstatus: "pending",
              paymentstatus: "free",
              paymentamount: "free",
              orderid: rand,
              paymentid: "free",
              ticketstatus: "not claimed",
            });
            let a = await eventr.save();
            let updateregcount = await Event.findByIdAndUpdate(
              { _id: event._id },
              { $inc: { eventregcount: 1 } }
            );
            res
              .status(200)
              .json({
                success: true,
                message:
                  "Congratulations ! You have Successfully registered for this event",
                id: a._id,
              });
            return;
          } //unlimited if end
          else if (event.eventregcount < event.eventreglimit) {
            let eventr = new Revent({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              clg: req.body.clg,
              github: req.body.github,
              linkedin: req.body.linkedin,
              title: req.body.title,
              img: req.body.img,
              ticketid: ticketid,
              eventname: event.eventname,
              eventdate: event.eventdate,
              eventtype: event.eventtype,
              eventvenue: event.eventvenue,
              eventtime: event.eventtime,
              eventstatus: "pending",
              paymentstatus: "free",
              paymentamount: "free",
              orderid: rand,
              paymentid: "free",
              ticketstatus: "not claimed",
            });
            let a = await eventr.save();
            let updateregcount = await Event.findByIdAndUpdate(
              { _id: event._id },
              { $inc: { eventregcount: 1 } }
            );
            res
              .status(200)
              .json({
                success: true,
                message:
                  "Congratulations ! You have Successfully registered for this event",
                id: a._id,
              });
            return;
          } //else if end
          //user is trying to register for a full event

          if (event.eventregcount >= event.eventreglimit) {
            let closed = await Event.findByIdAndUpdate(
              { _id: event._id },
              { eventregstatus: "over" }
            );
            res
              .status(400)
              .json({
                success: false,
                message:
                  "Sorry ! Registration  is full for this event.Ohh You are too late!",
              });
            return;
          }
        } //if end
        else {
          var instance = new Razorpay({
            key_id: `${process.env.NEXT_PUBLIC_KEY_ID}`,
            key_secret: `${process.env.NEXT_PUBLIC_KEY_SECRET}`,
          });
          var options = {
            amount: event.eventregfee * 100,
            currency: "INR",
            receipt: `${rand}`,
          };
          try {
            instance.orders.create(options, async function (err, order) {
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
                eventname: event.eventname,
                eventdate: event.eventdate,
                eventtype: event.eventtype,
                eventvenue: event.eventvenue,
                eventtime: event.eventtime,
                eventstatus: "pending",
                paymentstatus: "pending",
                paymentamount: event.eventregfee,
                ticketstatus: "not claimed",
              });
              let a = await eventr.save();
              res
                .status(200)
                .json({
                  success: true,
                  message:
                    "Your Details Saved Successfully Proceeed to Payment",
                  order,
                  event: event,
                });
              
              return;
            });
          } catch {
            res
              .status(400)
              .json({
                success: false,
                message:
                  "Cannot intialize your payment server is busy please try again after some time",
              });
            return;
          }
        } //else end;
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
