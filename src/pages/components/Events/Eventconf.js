import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Confetti from 'react-confetti'
import { useDispatch } from 'react-redux'
import { addUserData } from '@/appstore/userData'
import { useReactToPrint } from 'react-to-print'
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";
import Spinner from '../Spinner'
import Error from '@/pages/Error'
const Eventconf = () => {
    const ref = useRef();
    const refticket = useRef();
    const router = useRouter();
    const dispatch = useDispatch();
    const id = router.query.id;
    const [event,setEvent] = useState({});
    const[url,setUrl]= useState("");
    const[width,setWidth]=useState(0);
    const[loading,setLoading]=useState(false);
const[con,setCon]= useState(true);
const capturePdf= async () => {
  try {
    const dataUrl = await htmlToImage.toPng(document.getElementById('ticket'), { quality: 0.95 });
    const pdf = new jsPDF();
      const imgProps= pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0,pdfWidth, pdfHeight);
      pdf.save("EventTicket.pdf");
  } catch (error) {
    console.error('Error capturing image:', error);
  }
};
const capturePdfInvoice= async () => {
  try {
    const dataUrl = await htmlToImage.toPng(document.getElementById('invoice'), { quality: 0.95 });
    const pdf = new jsPDF();
      const imgProps= pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0,pdfWidth, pdfHeight);
      pdf.save("Invoice.pdf");
  } catch (error) {
    console.error('Error capturing image:', error);
  }
};

const getUser=async(token)=>{
  setLoading(true)
  console.log(token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuserdata`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });
  const result = await res.json();
  setLoading(false)
  dispatch(addUserData({name:result.data.name,email:result.data.email,img:result.data.img,linkedin:result.data.linkedin,github:result.data.github,website:result.data.website,phone:result.data.phone,bio:result.data.bio,clg:result.data.clg,title:result.data.title}))
}
    const fetchEventDetails=async()=>{
      setLoading(true);
        const userdata = { id,estatus:"getdata"};
        console.log(userdata)
        const checkuser = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/eventr`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userdata),
          }
        );
        const userresult = await checkuser.json();
        setLoading(false)
        if(userresult.data!=null){
            setEvent(userresult.data);
            setUrl(userresult.url);
        }
        else{
        setEvent(null);
        }
    }
    useEffect(()=>{
    fetchEventDetails();
    if(localStorage.getItem('innovateUuser')){
      const data = JSON.parse(localStorage.getItem('innovateUuser')).token;
  
      getUser(data);
    }
    var w = window.innerWidth;
      setWidth(w);
      setTimeout(() => {
        setCon(false);
      }, 10000);
    },[router.query.id])
    
   if(event!=null){
var rdate = new Date(event.createdAt);
   }
   //print invoice function
   const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  //print Ticket function
  const handlePrintTicket = useReactToPrint({
    content: () => refticket.current,
  });

  return (
    <>
{con&&<div className='relative top-10' > 
           <Confetti numberOfPieces={1500} width={width>=500?width:300} height={width>=500?width:1500} className='m-auto ' />
        </div>}
    {loading?<div className='min-h-screen flex justify-center items-center'><Spinner/></div>:<div className='relative top-20 mb-10'>
    
        <style jsx>
{`
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap")
    @import
    url("https://fonts.googleapis.com/css2?family=Lilita+One&display=swap");
  .herofont {
    font-family: "Lilita One", sans-serif;
  }
  .font {
    font-family: "Kanit", sans-serif;
  }
  .navfont {
    font-family: "Rubik", sans-serif;
  }

  

  
  .msg{
    position:absolute;
    top:10px;
    left:10px;
    color:#555;
    text-transform:uppercase;
    z-index:4;
  }
  
  .m-ticket{
    width:350px;
    background:#fff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 0 25px #bbb;
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    cursor:move;
  }
  
  
  .m-ticket:before{
    content:"";
    position:absolute;
    left:-10px;
    top:41%;
    background:#eee;
    box-shadow:inset 0 0 25px #bbb;
    width:17px;
    height:17px;
    border-radius:50%;
  }
  
  
  .m-ticket:after{
    content:"";
    position:absolute;
    right:-10px;
    top:41%;
    background:#eee;
    box-shadow:inset 0 0 25px #bbb;
    width:17px;
    height:17px;
    border-radius:50%;
  }
  
  
  .m{
    position:absolute;
    right:-5px;
    top:15%;
    transform:rotate(270.5deg);
    font-size:.80em;
    color:#888;
  }
  
  
  .m-ticket > .movie-details{
    display:flex;
    gap:20px;
    padding:20px 20px;
  }
  
  
  .m-ticket > .movie-details > .poster{
    width:100%;
    height:100px;
    object-fit:contain;
    border-radius:8px;
    box-shadow:0 0 10px #888;
  }
  
  .m-ticket > .movie-details > .movie > h4{
    text-transfrom:capitalize;
    font-size:1.6em;
    margin-bottom:20px;
    width:200px;
  }
  
  
  .m-ticket > .movie-details > .movie > p{
    font-size:.80em;
    line-height:19px;
    color:#777;
  }
  
  
  .m-ticket > .info{
    width:93%;
    border-radius:20px;
    background:#eee;
    padding:10px 0px;
    text-align:center;
    font-size:.72em;
  }
  
  
  
  .m-ticket > .ticket-details{
    display:flex;
    gap:20px;
    padding:20px 20px;
  }
  
  
  .m-ticket > .ticket-details > .scan{
    width:100px;
    height:100px;
  }
  
  .m-ticket > .ticket-details > .ticket{
    text-align:center;
    width:200px;
  }
  
  
  .m-ticket > .ticket-details > .ticket > p{
    font-size:.80em;
    line-height:19px;
    color:#777;
  }
  
  .m-ticket > .ticket-details > .ticket > b{
    margin-top:10px;
    display:inline-block;
    font-size:1.2em;
    font-weight:400;
  }
  
  
  .m-ticket > .ticket-details > .ticket > h6{
    text-transform:uppercase;
    font-weight:100;
    font-size:.95em;
    margin-top:10px;
  }
  
  
  .m-ticket > .info-cancel{
    width:100%;
    background:#eee;
    color:#888;
    padding:10px 0px;
    text-align:center;
    font-size:.80em;
  }
  
  
  .m-ticket > .total-amount{
    display:flex;
    justify-content:space-between;
    padding:12px 20px;
    font-weight:700;
    font-size:.90em;
    width:100%;
  }
`}
        </style>
            
      {event==null?<div className='flex justify-center items-center'><Error/></div>:<div className="bg-gradient-to-r from-black to-gray-900 min-h-screen flex items-center justify-center h-full w-full p-4">
      
            <div className="bg-white p-8 rounded-lg shadow-lg text-center  lg:w-[80vw] w-[100vw]  ">
                <div className="animate-tickScale inline-block bg-green-600 rounded-full ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-4xl font-semibold text-gray-800 mb-4 navfont">Congratulations!</h1>
                
                <p className="text-lg text-gray-600 mb-4 font">Thank you for registering for {event.eventname}. We are excited to have you join us!</p>
                
              
                
                
                {/* Event Ticket Section */}
               
                  {/* Invoice Section */}
                  {event.paymentstatus=="paid"&&<h2 className="text-xl font-semibold text-gray-800 mb-2 navfont">Invoice</h2>}
                <div className="mb-4">
                 {event.paymentstatus=="paid"&& <>
                 
  {/* Invoice */}
  <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 border-2 border-gray-100" >
    <div className="sm:w-11/12 lg:w-3/4 mx-auto " >
      {/* Card */}
      <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-800 border-2 border-gray-200" id="invoice" ref={ref}>
        {/* Grid */}
        <div className="flex justify-between">
          <div>
           <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png" alt="logo" className='h-20 w-20'/>
            <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white navfont">
              InnovateU
            </h1>
          </div>
          {/* Col */}
          <div className="text-end">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Invoice #
            </h2>
            <span className="mt-1 block text-gray-500">{event.orderid}</span>
            {/* <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
              
              <br />
              Latheronwheel
              <br />
              KW5 8NW, London
              <br />
              United Kingdom
              <br />
            </address> */}
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}
        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Bill to:
            </h3>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {event.name}
            </h3>
            <address className="mt-2 not-italic text-gray-500 font">
              Payment_id: {event.paymentid}
              <br />
              Order_id: {event.orderid}
              <br />
              Payment Status: <span className='text-green-600 font'>{event.paymentstatus}</span>
              <br />
            </address>
          </div>
          {/* Col */}
          <div className="sm:text-end space-y-2">
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Invoice date:
                </dt>
                <dd className="col-span-2 text-gray-500">{rdate.toLocaleDateString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</dd>
              </dl>
            </div>
            {/* End Grid */}
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}
        {/* Table */}
        <div className="mt-6">
          <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                Item
              </div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase">
                Qty
              </div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase">
                Rate
              </div>
              <div className="text-end text-xs font-medium text-gray-500 uppercase">
                Amount
              </div>
            </div>
            <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700" />
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <div className="col-span-full sm:col-span-2">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                  Item
                </h5>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {event.eventname}
                </p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                  Qty
                </h5>
                <p className="text-gray-800 dark:text-gray-200">1</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                  Rate
                </h5>
                <p className="text-gray-800 dark:text-gray-200">{event.paymentamount}</p>
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                  Amount
                </h5>
                <p className="sm:text-end text-gray-800 dark:text-gray-200">
                ₹{event.paymentamount}
                </p>
              </div>
            </div>
            
          </div>
        </div>
        {/* End Table */}
        {/* Flex */}
        <div className="mt-8 flex sm:justify-end">
          <div className="w-full max-w-2xl sm:text-end space-y-2">
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Subtotal:
                </dt>
                <dd className="col-span-2 text-gray-500">₹{event.paymentamount}.00</dd>
              </dl>
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Total:
                </dt>
                <dd className="col-span-2 text-gray-500">₹{event.paymentamount}.00</dd>
              </dl>
              {/* <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Tax:
                </dt>
                <dd className="col-span-2 text-gray-500">$39.00</dd>
              </dl> */}
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Amount paid:
                </dt>
                <dd className="col-span-2 text-gray-500">₹{event.paymentamount}.00</dd>
              </dl>
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Due balance:
                </dt>
                <dd className="col-span-2 text-gray-500">₹0.00</dd>
              </dl>
            </div>
            {/* End Grid */}
          </div>
        </div>

        {/* End Flex */}
        <div className="mt-8 sm:mt-12">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Thank you!
          </h4>
          <p className="text-gray-500">
            If you have any questions concerning this invoice, use the following
            contact information:
          </p>
          <div className="mt-2">
            <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              support@innovateu.org.in
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-gray-500">© 2024 InnovateU.</p>
      </div>
      
      {/* End Card */}
      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-x-3">
        <button
          className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          onClick={capturePdfInvoice}
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1={12} x2={12} y1={15} y2={3} />
          </svg>
          Invoice PDF
        </button>
        <button
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={handlePrint}
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect width={12} height={8} x={6} y={14} />
          </svg>
          Print
        </button>
      </div>
      {/* End Buttons */}
    </div>
  </div>
  {/* End Invoice */}
</>}
<h2 className="text-xl font-semibold text-gray-800 mb-2 navfont">Event Ticket</h2>
                <div className="mb-4 flex justify-center items-center flex-col">
                    <>
  <div className="m-ticket" id="ticket" ref={refticket}>
    <p className="m ">INNOVATEU</p>
    <div className="movie-details">
      <img
        src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png"
        className="poster"
      />
      <div className="movie">
        <h4 className='text-black font'>{event.name}</h4>
        <p>Date: {event.eventdate}</p>
        <p>Time| {event.eventtime}</p>
        <p>CUTM : BBSR CAMPUS</p>
      </div>
    </div>
    <div className="info text-gray-600">Tap for support, details &amp; more actions</div>
    <div className="ticket-details">
      <img
        src={`${url}`}
        className="scan"
      />
      <div className="ticket">
        <p>1-Ticket</p>
        <b className='font text-black'>{event.eventname}</b>
        <p>Venue: {event.eventvenue}</p>
        <h6 className='text-gray-600 font'>TICKET ID: {event.ticketid}</h6>
      </div>
    </div>
    <div className="info-cancel">Cancellation not available for this venue</div>
    <div className="total-amount">
      <p className='text-black font'>Total Amount</p>
      <p className='text-black font'>Rs. ₹{event.paymentamount}</p>
    </div>
  </div>
 
  {/*-m-ticket end--*/}
  <div className="mt-6 flex justify-end gap-x-3">
        <button
          className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          onClick={capturePdf}
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1={12} x2={12} y1={15} y2={3} />
          </svg>
          Ticket PDF
        </button>
        <button
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={handlePrintTicket}
          
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect width={12} height={8} x={6} y={14} />
          </svg>
          Print
        </button>
      </div>
  {/*-m-ticket end--*/}
</>

                    {/* Add more event ticket details as needed */}
                </div>

                </div>
                <Link href="/" className="bg-blue-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full inline-block my-4">Go Back to Home</Link>
            </div>
        </div>}
        
    </div>}
      </>
  )
}

export default Eventconf
