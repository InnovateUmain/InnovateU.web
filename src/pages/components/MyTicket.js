
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion';
import { FaFilePdf ,FaImage} from "react-icons/fa6";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";
const MyTicket = () => {
    const [event,setEvent] = useState({});
    const[url,setUrl]= useState("");
    const fetchEventDetails=async(email)=>{
        const userdata = { email,estatus:"getdataviaemail"};
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
		console.log(userresult)
        if(userresult.data!=null){
            setEvent(userresult.data);
            setUrl(userresult.url);
        }
        else{
        setEvent(null);
        }
    }
    useEffect(()=>{
		const data = JSON.parse(localStorage.getItem('innovateUuser')).email;
  fetchEventDetails(data);
  
    },[])
    const captureImage = async () => {
      try {
        const dataUrl = await htmlToImage.toPng(document.getElementById('ticket'), { quality: 0.95 });
  
        var link = document.createElement('a');
        link.download = 'EventTicket.png';
  
        // You may want to append the link to the body before triggering the download
        // document.body.appendChild(link);
  
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    };
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
  return (
    <div className='min-h-screen flex justify-center'>
<style jsx global>
{`
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@600&display=swap');
.fontevent{
  font-family: 'Cabin', sans-serif;
}
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

       
    <div className='bg-black min-h-screen text-white relative top-24 mb-10 '>
    <div className='flex flex-col justify-center  my-4 items-center'>
    <h1 className='text-white navfont lg:text-5xl md:text-4xl text-4xl'>My Ticket (1) </h1>
                  <div className='h-2 w-56 bg-purple-600 rounded-full my-4'></div>
        </div>
		{event==null?<div className='flex justify-center items-center'><div className="bg-white p-8 rounded-lg shadow-lg text-center w-4/5">
        <div className="animate-tickScale inline-block bg-green-600 rounded-full">
    
           <img src="/oops.jpg" alt="no data img" className="h-52 w-52"/>
        </div>
        
        <h1 className="lg:text-4xl md:text-4xl sm:text-2xl font-semibold text-gray-800 mb-4 font text-2xl">OOPS ! 🤭🤭🤭</h1>
        <p className="text-lg text-gray-600 mb-4 font"> You have not register for any event.</p>
        <p className="text-lg text-gray-600 mb-2 font">If you wish to see your ticket please register for an event. Ongoing event is<Link href={"/Event"}><span className='font-bold text-green-600'> DEVCON 2K24</span></Link>.</p>
        <Link href="/Event" className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full inline-block mx-2 my-4 ">Register for an Event </Link>
        <br/>
       
    </div></div>:<>
  <div className="m-ticket" id="ticket">
    <p className="m">DEVCON 2K24</p>
    <div className="movie-details">
      <img
        src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png"
        className="poster"
      />
      <div className="movie">
        <h4 className='text-black font'>{event.name}</h4>
        <p>Jan 15th - Jan 20th</p>
        <p>Thu, 15 Jan | 10:00 AM</p>
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
        <b className='font text-black'>DEVCON 2K24</b>
        <p>Venue: Aryabhat</p>
        <h6 className='text-gray-600 font'>TICKET ID: {event.ticketid}</h6>
      </div>
    </div>
    <div className="info-cancel">Cancellation not available for this venue</div>
    <div className="total-amount">
      <p className='text-black font'>Total Amount</p>
      <p className='text-black font'>Rs. ₹{event.paymentamount}</p>
    </div>
  </div>
  <div className='flex justify-center items-center my-6'>
<motion.button className='p-2 m-2 bg-purple-600 text-white fontevent rounded-md flex justify-center items-center' whileHover={{scale:1.1}} whileTap={{scale:0.9, rotate:1}} onClick={captureImage}>Download Photo <FaImage className='mx-1'/></motion.button>
<motion.button className='p-2 m-2 bg-purple-600 text-white fontevent rounded-md flex justify-center items-center' whileHover={{scale:1.1}} whileTap={{scale:0.9, rotate:1}} onClick={capturePdf}>Download Pdf<FaFilePdf  className='mx-1'/></motion.button>
</div>
  {/*-m-ticket end--*/}
</>}
        </div>
       
    </div>
  )
}

export default MyTicket
