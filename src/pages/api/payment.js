import connectDb from "../../middleware/mongoose";
import * as crypto from "crypto"
import QRCode from "react-qr-code";
import Revent from "../../../models/Revent";
const nodemailer = require("nodemailer");
import Event from "../../../models/Event";
const handler = async (req, res) => {
  const transporter = await nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "thebasirkhanofficial@gmail.com",
      pass: "bOTLR5E0phXVM2qm",
    },
  });
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
   
       order= await Revent.findOneAndUpdate({orderid:req.body.razorpay_order_id},{paymentstatus:"paid",paymentid:req.body.razorpay_payment_id ,eventstatus:"success",
      });
      const event = await Event.findOne({_id:order.eventid});

      const info = await transporter.sendMail({
        from: '<support@InnovateU.com>', // sender address
        to: `${order.email}`, // list of receivers
        subject: `🎉 Welcome to InnovateU! Your Account is Ready 🚀`, // Subject line
        text: "Account Created Successfully", // plain text body
        html: `
        <body
class="clean-body"
style="
margin: 0;
padding: 0;
-webkit-text-size-adjust: 100%;
background-color: #f2fafc;
"
>

<table
bgcolor="#f2fafc"
cellpadding="0"
cellspacing="0"
class="nl-container"
role="presentation"
style="
  table-layout: fixed;
  vertical-align: top;
  min-width: 320px;
  border-spacing: 0;
  border-collapse: collapse;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
  background-color: #f2fafc;
  width: 100%;
"
valign="top"
width="100%"
>
<tbody>
  <tr style="vertical-align: top" valign="top">
    <td style="word-break: break-word; vertical-align: top" valign="top">
      
      <div style="background-color: #fb3c2d">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="divider"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      min-width: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          class="divider_inner"
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            min-width: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            padding-top: 0px;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider_content"
                            height="01"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-top: 0px solid transparent;
                              height: 01px;
                              width: 100%;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr
                                style="vertical-align: top"
                                valign="top"
                              >
                                <td
                                  height="1"
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  "
                                  valign="top"
                                >
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="divider"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      min-width: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          class="divider_inner"
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            min-width: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            padding-top: 0px;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider_content"
                            height="5"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-top: 0px solid transparent;
                              height: 5px;
                              width: 100%;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr
                                style="vertical-align: top"
                                valign="top"
                              >
                                <td
                                  height="5"
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  "
                                  valign="top"
                                >
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                </div>
               
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
            </div>
            
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          > 
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              ">
              <div class="col_cont" style="width: 100% !important">
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  
                  <div
                    align="center"
                    class="img-container center fixedwidth"
                    style="padding-right: 0px; padding-left: 0px"
                  >
                    <img
                      align="center"
                      alt="Light blue sphere with flowers"
                      border="0"
                      class="center fixedwidth"
                      src="https://res.cloudinary.com/dst73auvn/image/upload/v1628952130/2-removebg-preview_ljkree.png"
                      style="
                        text-decoration: none;
                        -ms-interpolation-mode: bicubic;
                        height: auto;
                        border: 0;
                        width: 100%;
                        max-width: 322px;
                        display: block;
                      "
                      title="Light blue sphere with flowers"
                      width="272"
                    />
                    
                  </div>
                 
                  <div
                    style="
                      color: #44464a;
                      font-family: 'Playfair Display', Georgia, serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        font-family: 'Playfair Display', Georgia, serif;
                        color: #44464a;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 30px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: center;
                          font-family: 'Playfair Display', Georgia, serif;
                          mso-line-height-alt: 36px;
                          margin: 0;
                        "
                      >
                        <span style="font-size: 30px"
                          >You are successfully registered for ${event.eventname}</span
                        >
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  
                  <!--[if mso]></td></tr></table><![endif]-->
                  <div
                    align="center"
                    class="img-container center fixedwidth"
                    style="padding-right: 25px; padding-left: 25px"
                  >
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 25px;padding-left: 25px;" align="center"><![endif]-->
                    <div style="font-size: 1px; line-height: 25px"> </div>
                    <img
                      align="center"
                      alt="Separator"
                      border="0"
                      class="center fixedwidth"
                      src="${event.eventposter}"
                      style="
                        text-decoration: none;
                        -ms-interpolation-mode: bicubic;
                        height: auto;
                        border: 0;
                        width: 100%;
                        max-width: 622px;
                        display: block;
                      "
                      title="Separator"
                      width="136"
                    />
                    <div style="font-size: 1px; line-height: 25px"> </div>
                    <div style="
        line-height: 1.2;
        font-size: 12px;
        color: #44464a;
        font-family: Nunito, Arial, Helvetica Neue,
        Helvetica, sans-serif;
        mso-line-height-alt: 14px;
      ">
          <h3>Event Details</h3>
          <p>Venue:- CUTM BBSR CAMPUS ${event.eventvenue}</p>
          <p>Description:- ${event.eventdesc}</p>
      </div>
                  </div>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid mixed-two-up"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: #ffffff;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: #ffffff;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="453" style="background-color:#ffffff;width:453px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:15px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num8"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 448px;
                width: 453px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 15px;
                    padding-bottom: 5px;
                    padding-right: 10px;
                    padding-left: 10px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #44464a;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #44464a;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.2;
                          word-break: break-word;
                          mso-line-height-alt: 17px;
                          margin: 0;
                        "
                      >
                        Ticket Id:
                        <span style="color: #fb3c2d"
                          ><strong>${order.ticketid}</strong></span
                        >
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #44464a;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #44464a;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.2;
                          word-break: break-word;
                          mso-line-height-alt: 17px;
                          margin: 0;
                        "
                      >
                        Event Date: ${event.eventdate}
                        
                      </p>
                      <p
                      style="
                        font-size: 14px;
                        line-height: 1.2;
                        word-break: break-word;
                        mso-line-height-alt: 17px;
                        margin: 0;
                      "
                    >
                      Event Time: ${event.eventtime}
                    </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:#ffffff;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:15px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 15px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <div class="mobile_hide">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="divider"
                      role="presentation"
                      style="
                        table-layout: fixed;
                        vertical-align: top;
                        border-spacing: 0;
                        border-collapse: collapse;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        min-width: 100%;
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                      "
                      valign="top"
                      width="100%"
                    >
                      <tbody>
                        <tr style="vertical-align: top" valign="top">
                          <td
                            class="divider_inner"
                            style="
                              word-break: break-word;
                              vertical-align: top;
                              min-width: 100%;
                              -ms-text-size-adjust: 100%;
                              -webkit-text-size-adjust: 100%;
                              padding-top: 0px;
                              padding-right: 0px;
                              padding-bottom: 0px;
                              padding-left: 0px;
                            "
                            valign="top"
                          >
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="divider_content"
                              height="15"
                              role="presentation"
                              style="
                                table-layout: fixed;
                                vertical-align: top;
                                border-spacing: 0;
                                border-collapse: collapse;
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-top: 0px solid transparent;
                                height: 15px;
                                width: 100%;
                              "
                              valign="top"
                              width="100%"
                            >
                              <tbody>
                                <tr
                                  style="vertical-align: top"
                                  valign="top"
                                >
                                  <td
                                    height="15"
                                    style="
                                      word-break: break-word;
                                      vertical-align: top;
                                      -ms-text-size-adjust: 100%;
                                      -webkit-text-size-adjust: 100%;
                                    "
                                    valign="top"
                                  >
                                    <span></span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="divider"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      min-width: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          class="divider_inner"
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            min-width: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            padding-top: 0px;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider_content"
                            height="15"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-top: 0px solid transparent;
                              height: 15px;
                              width: 100%;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr
                                style="vertical-align: top"
                                valign="top"
                              >
                                <td
                                  height="15"
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  "
                                  valign="top"
                                >
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid three-up no-stack"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 15px; padding-left: 15px; padding-top:5px; padding-bottom:5px;background-color:#f9feff;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                background-color: #f9feff;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 15px;
                    padding-left: 15px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #fb3c2d;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #fb3c2d;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.2;
                          word-break: break-word;
                          mso-line-height-alt: 17px;
                          margin: 0;
                        "
                      >
                        Event Name
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 15px; padding-left: 15px; padding-top:5px; padding-bottom:5px;background-color:#f9feff;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                background-color: #f9feff;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 15px;
                    padding-left: 15px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #fb3c2d;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #fb3c2d;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: center;
                          mso-line-height-alt: 17px;
                          margin: 0;
                        "
                      >
                        Ticket Quantity
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 15px; padding-left: 15px; padding-top:5px; padding-bottom:5px;background-color:#f9feff;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                background-color: #f9feff;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 15px;
                    padding-left: 15px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #fb3c2d;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #fb3c2d;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: right;
                          mso-line-height-alt: 17px;
                          margin: 0;
                        "
                      >
                        Total
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid three-up no-stack"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #393d47;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 0px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #393d47;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.2;
                          word-break: break-word;
                          mso-line-height-alt: 17px;
                          margin: 0;
                        "
                      >
                        ${event.eventname}
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #393d47;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 5px;
                      padding-bottom: 10px;
                      padding-left: 5px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #393d47;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: center;
                          mso-line-height-alt: 17px;
                          margin: 0;
                        "
                      >
                        1
                      </p>
                    </div>
                  </div>
                  
                </div>
               
              </div>
            </div>
            
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 0px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #393d47;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 0px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #393d47;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: right;
                          mso-line-height-alt: 17px;
                          margin: 0;
                        "
                      >
                      ₹ ${event.eventregfee}
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="divider"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      min-width: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          class="divider_inner"
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            min-width: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            padding-top: 0px;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider_content"
                            height="1"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-top: 1px solid #e1ecef;
                              height: 1px;
                              width: 100%;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr
                                style="vertical-align: top"
                                valign="top"
                              >
                                <td
                                  height="1"
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  "
                                  valign="top"
                                >
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid three-up no-stack"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #393d47;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #393d47;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 16px;
                          line-height: 1.2;
                          word-break: break-word;
                          mso-line-height-alt: 19px;
                          margin: 0;
                        "
                      >
                        <span style="font-size: 16px"
                          ><strong>Subtotal</strong></span
                        >
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <div></div>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #393d47;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #393d47;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 16px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: right;
                          mso-line-height-alt: 19px;
                          margin: 0;
                        "
                      >
                        <span style="font-size: 16px">₹ ${event.eventregfee}</span>
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="divider"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      min-width: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          class="divider_inner"
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            min-width: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            padding-top: 0px;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider_content"
                            height="1"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-top: 1px solid #e1ecef;
                              height: 1px;
                              width: 100%;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr
                                style="vertical-align: top"
                                valign="top"
                              >
                                <td
                                  height="1"
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  "
                                  valign="top"
                                >
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid three-up no-stack"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #393d47;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #393d47;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 16px;
                          line-height: 1.2;
                          word-break: break-word;
                          mso-line-height-alt: 19px;
                          margin: 0;
                        "
                      >
                        <span style="font-size: 16px"
                          ><strong>Discount</strong></span
                        >
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <div></div>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num4"
              style="
                display: table-cell;
                vertical-align: top;
                max-width: 320px;
                min-width: 224px;
                width: 226px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #393d47;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #393d47;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 16px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: right;
                          mso-line-height-alt: 19px;
                          margin: 0;
                        "
                      >
                        <span style="font-size: 16px">₹0,00</span>
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="divider"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      min-width: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          class="divider_inner"
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            min-width: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            padding-top: 0px;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider_content"
                            height="1"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-top: 1px solid #e1ecef;
                              height: 1px;
                              width: 100%;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr
                                style="vertical-align: top"
                                valign="top"
                              >
                                <td
                                  height="1"
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  "
                                  valign="top"
                                >
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #fb3c2d;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.2;
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.2;
                        font-size: 12px;
                        color: #fb3c2d;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 14px;
                      "
                    >
                      <p
                        style="
                          font-size: 22px;
                          line-height: 1.2;
                          word-break: break-word;
                          text-align: right;
                          mso-line-height-alt: 26px;
                          margin: 0;
                        "
                      >
                        <span style="font-size: 22px"
                          ><strong
                            ><span style="">Total ₹ ${event.eventregfee}</span></strong
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="divider"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      min-width: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          class="divider_inner"
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            min-width: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            padding-top: 0px;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider_content"
                            height="40"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-top: 0px solid transparent;
                              height: 40px;
                              width: 100%;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr
                                style="vertical-align: top"
                                valign="top"
                              >
                                <td
                                  height="40"
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  "
                                  valign="top"
                                >
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: #ffffff;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: #ffffff;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:#ffffff;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 15px;
                    padding-bottom: 15px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 35px; padding-left: 35px; padding-top: 15px; padding-bottom: 15px; font-family: Arial, sans-serif"><![endif]-->
                  <div
                    style="
                      color: #44464a;
                      font-family: Nunito, Arial, Helvetica Neue,
                        Helvetica, sans-serif;
                      line-height: 1.5;
                      padding-top: 15px;
                      padding-right: 35px;
                      padding-bottom: 15px;
                      padding-left: 35px;
                    "
                  >
                    <div
                      class="txtTinyMce-wrapper"
                      style="
                        line-height: 1.5;
                        font-size: 12px;
                        color: #44464a;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        mso-line-height-alt: 18px;
                      "
                    >
                      <p
                        style="
                          font-size: 14px;
                          line-height: 1.5;
                          word-break: break-word;
                          text-align: center;
                          mso-line-height-alt: 21px;
                          margin: 0;
                        "
                      >
                        You can find more amazing events on our website. 
                      </p>
                      <p
                      style="
                        font-size: 14px;
                        line-height: 1.5;
                        word-break: break-word;
                        text-align: center;
                        mso-line-height-alt: 21px;
                        margin: 0;
                      "
                    >
                      Join now to our whatsapp group to get more updates.Join Now: <a href="${event.eventgrplink}" target="_blank">${event.eventgrplink}</a>
                    </p>
                    </div>
                  </div>
                  <!--[if mso]></td></tr></table><![endif]-->
                  <div
                    align="center"
                    class="button-container"
                    style="
                      padding-top: 10px;
                      padding-right: 10px;
                      padding-bottom: 10px;
                      padding-left: 10px;
                    "
                  >
                   <a
                      href="${process.env.NEXT_PUBLIC_HOST}/events"
                      style="
                        -webkit-text-size-adjust: none;
                        text-decoration: none;
                        display: inline-block;
                        color: #fb3c2d;
                        background-color: transparent;
                        border-radius: 28px;
                        -webkit-border-radius: 28px;
                        -moz-border-radius: 28px;
                        width: auto;
                        width: auto;
                        border-top: 1px solid #fb3c2d;
                        border-right: 1px solid #fb3c2d;
                        border-bottom: 1px solid #fb3c2d;
                        border-left: 1px solid #fb3c2d;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        font-family: Nunito, Arial, Helvetica Neue,
                          Helvetica, sans-serif;
                        text-align: center;
                        mso-border-alt: none;
                        word-break: keep-all;
                      "
                      target="_blank"
                      ><span
                        style="
                          padding-left: 20px;
                          padding-right: 20px;
                          font-size: 16px;
                          display: inline-block;
                          letter-spacing: undefined;
                        "
                        ><span
                          style="
                            font-size: 16px;
                            line-height: 2;
                            word-break: break-word;
                            mso-line-height-alt: 32px;
                          "
                          >View More</span
                        ></span
                      ></a
                    >
                    <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                  </div>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  <!--<![endif]-->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="divider"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      min-width: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          class="divider_inner"
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            min-width: 100%;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            padding-top: 0px;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider_content"
                            height="25"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-top: 0px solid transparent;
                              height: 25px;
                              width: 100%;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr
                                style="vertical-align: top"
                                valign="top"
                              >
                                <td
                                  height="25"
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  "
                                  valign="top"
                                >
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    align="center"
                    class="img-container center fixedwidth"
                    style="padding-right: 25px; padding-left: 25px"
                  >
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 25px;padding-left: 25px;" align="center"><![endif]-->
                    <div style="font-size: 1px; line-height: 25px"> </div>
                    <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={${order.ticketid}}
    />
                    <div style="font-size: 1px; line-height: 25px"> </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                  </div>
                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      <div style="background-color: transparent">
        <div
          class="block-grid"
          style="
            min-width: 320px;
            max-width: 680px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            margin: 0 auto;
            background-color: transparent;
          "
        >
          <div
            style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px;"><![endif]-->
            <div
              class="col num12"
              style="
                min-width: 320px;
                max-width: 680px;
                display: table-cell;
                vertical-align: top;
                width: 680px;
              "
            >
              <div class="col_cont" style="width: 100% !important">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                  style="
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    padding-top: 15px;
                    padding-bottom: 15px;
                    padding-right: 0px;
                    padding-left: 0px;
                  "
                >
                  
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    class="social_icons"
                    role="presentation"
                    style="
                      table-layout: fixed;
                      vertical-align: top;
                      border-spacing: 0;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                    "
                    valign="top"
                    width="100%"
                  >
                    <tbody>
                      <tr style="vertical-align: top" valign="top">
                        <td
                          style="
                            word-break: break-word;
                            vertical-align: top;
                            padding-top: 10px;
                            padding-right: 10px;
                            padding-bottom: 10px;
                            padding-left: 10px;
                          "
                          valign="top"
                        >
                          <table
                            align="center"
                            cellpadding="0"
                            cellspacing="0"
                            class="social_table"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-tspace: 0;
                              mso-table-rspace: 0;
                              mso-table-bspace: 0;
                              mso-table-lspace: 0;
                            "
                            valign="top"
                          >
                            <tbody>
                              <tr
                                align="center"
                                style="
                                  vertical-align: top;
                                  display: inline-block;
                                  text-align: center;
                                "
                                valign="top"
                              >
                                <td
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    padding-bottom: 0;
                                    padding-right: 10px;
                                    padding-left: 10px;
                                  "
                                  valign="top"
                                >
                                 
                                </td>
                                <td
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    padding-bottom: 0;
                                    padding-right: 10px;
                                    padding-left: 10px;
                                  "
                                  valign="top"
                                >
                                 
                                <td
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    padding-bottom: 0;
                                    padding-right: 10px;
                                    padding-left: 10px;
                                  "
                                  valign="top"
                                >
                              
                                </td>
                                <td
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    padding-bottom: 0;
                                    padding-right: 10px;
                                    padding-left: 10px;
                                  "
                                  valign="top"
                                >
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      
      
    </td>
  </tr>
</tbody>
</table>

</body>
        `, 
      });
      res.redirect(302, `${process.env.NEXT_PUBLIC_HOST}/components/Events/Eventconf?id=${order._id}`);
        }
      else{
         order =await Revent.findOneAndUpdate({orderid:req.body.razorpay_order_id},{paymentstatus:"pending",paymentid:req.body.razorpay_payment_id});
      }
}
export default connectDb(handler);