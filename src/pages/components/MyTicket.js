import React from 'react'
import { IoTicket } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";

import { motion } from 'framer-motion';
const MyTicket = () => {
  return (
    <div className='min-h-screen flex justify-center'>
<style jsx global>
{`
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@600&display=swap');
.fontevent{
  font-family: 'Cabin', sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.tcom {
	height: 100vh;
	display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
	font-family: "Staatliches", cursive;
	// background: #d83565;
	color: black;
	font-size: 14px;
	letter-spacing: 0.1em;
}

.ticket {
	margin: auto;
	display: flex;
    background:white;
    border-radius:4px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}

.left {
	display: flex;
}

.image {
	height: 250px;
	width: 250px;
	background-image: url("https://media.pitchfork.com/photos/60db53e71dfc7ddc9f5086f9/1:1/w_1656,h_1656,c_limit/Olivia-Rodrigo-Sour-Prom.jpg");
	background-size: contain;
	opacity: 0.85;
}

.admit-one {
	position: absolute;
	color: darkgray;
	height: 250px;
	padding: 0 10px;
	letter-spacing: 0.15em;
	display: flex;
	text-align: center;
	justify-content: space-around;
	writing-mode: vertical-rl;
	transform: rotate(-180deg);
}

.admit-one span:nth-child(2) {
	color: white;
	font-weight: 700;
}

.left .ticket-number {
	height: 250px;
	width: 250px;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	padding: 5px;
}

.ticket-info {
	padding: 10px 30px;
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: space-between;
	align-items: center;
}

.date {
    margin-top:6px;
	border-top: 1px solid gray;
	border-bottom: 1px solid gray;
	padding: 5px 0;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.date span {
	width: 100px;
}

.date span:first-child {
	text-align: left;
}

.date span:last-child {
	text-align: right;
}

.date .june-29 {
	color: #d83565;
	font-size: 20px;
}

.show-name {
	font-size: 32px;
	font-family: "Nanum Pen Script", cursive;
	color: #d83565;
}

.show-name h1 {
	font-size: 48px;
	font-weight: 700;
	letter-spacing: 0.1em;
	color: #4a437e;
}

.time {
	padding: 10px 0;
	color: #4a437e;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 10px;
	font-weight: 700;
}

.time span {
	font-weight: 400;
	color: gray;
}

.left .time {
	font-size: 16px;
}


.location {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	padding-top: 8px;
	border-top: 1px solid gray;
}

.location .separator {
	font-size: 20px;
}

.right {
	width: 180px;
	border-left: 1px dashed #404040;
}

.right .admit-one {
	color: darkgray;
}

.right .admit-one span:nth-child(2) {
	color: gray;
}

.right .right-info-container {
    margin-top:6px;
	height: 250px;
	padding: 10px 10px 10px 35px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}

.right .show-name h1 {
	font-size: 18px;
}

.barcode {
	height: 100px;
}

.barcode img {
	height: 100%;
}

.right .ticket-number {
	color: gray;
}
/* Add your existing CSS here */

/* Responsive Styles */
@media only screen and (max-width: 1200px) {
    /* Adjust styles for larger screens */
    .tcom {
        font-size: 12px;
    }

    .ticket {
        flex-direction: row;
    }

    .left, .right {
        width: 50%;
        border-left: 1px dashed #404040;
    }

    .right .right-info-container {
        padding: 10px 35px;
    }

    .right .show-name h1 {
        font-size: 18px;
    }

    .barcode img {
        height: 80px; /* Adjust as needed */
    }
}

@media only screen and (max-width: 992px) {
    /* Adjust styles for medium-sized screens */
    .tcom {
        font-size: 11px;
    }

    .ticket {
        flex-direction: column;
    }

    .left, .right {
        width: 100%;
        border-left: none;
        border-top: 1px dashed #404040;
    }

    .right .right-info-container {
        padding: 10px;
    }

    .right .show-name h1 {
        font-size: 16px;
    }

    .barcode img {
        height: 110px; /* Adjust as needed */
    }
}

@media only screen and (max-width: 768px) {
    /* Adjust styles for tablets */
    .tcom {
        font-size: 10px;
    }

    .ticket {
        flex-direction: column;
    }

    .left, .right {
        width: 100%;
        border-left: none;
        border-top: 1px dashed #404040;
    }

    .right .right-info-container {
        padding: 10px;
    }

    .right .show-name h1 {
        font-size: 16px;
    }

    .barcode img {
        height: 110px; /* Adjust as needed */
    }
}

@media only screen and (max-width: 680px) {
    /* Adjust styles for mobile devices */
    .tcom {
        font-size: 9px;
    }

    .ticket {
        flex-direction: column;
    }

    .image, .left .ticket-number {
        height: auto;
        display:hidden;
        background-repeat:no-repeat;
        width: 100%;
    }

    .admit-one {
        height: auto;
        writing-mode: horizontal-tb;
        transform: rotate(0deg);
    }

    .left .ticket-number {
        justify-content: center;
        align-items: center;
    }

    .date span {
        width: auto;
    }

    .date .june-29 {
        font-size: 14px;
    }

    .show-name {
        font-size: 20px;
    }

    .show-name h1 {
        font-size: 28px;
    }

    .time {
        font-size: 12px;
    }

    .location {
        flex-direction: column;
        align-items: flex-start;
    }

    .location .separator {
        display: none;
    }
}

`}
</style>

       
    <div className='bg-black min-h-screen text-white relative top-20'>
    <div className='flex flex-col justify-center  my-4 items-center'>
    <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl'>My Ticket (1) </h1>
                  <div className='h-2 w-56 bg-purple-600 rounded-full my-4'></div>
        </div>
        <div className='h-auto w-[90vw] bg-slate-800 rounded-md '>
            <div className='tcom'>
        <div className="ticket created-by-anniedotexe ">
	<div className="left">
		<div className="image">
			<p className="admit-one">
				<span>DEVCON 2K24</span>
				<span>DEVCON 2K24</span>
                <span>DEVCON 2K24</span>
			</p>
			<div className="ticket-number">
				<p>
					#20030220
				</p>
			</div>
		</div>
		<div className="ticket-info">
			<p className="date">
				<span>TUESDAY</span>
				<span className="june-29">JANUARY 15TH</span>
				<span>2024</span>
			</p>
			<div className="show-name">
				<h1>DEVCON 2K24</h1>
				<h2>Basir Khan</h2>
			</div>
			<div className="time">
				<p>8:00 PM <span>TO</span> 11:00 PM</p>
				<p>DOORS <span>@</span> 7:00 PM</p>
			</div>
			<p className="location"><span>CUTM PKD CAMPUS</span>
				<span className="separator"><i className="far fa-smile"></i></span><span>Salt Lake City, Utah</span>
			</p>
		</div>
	</div>
	<div className="right">
		<p className="admit-one">
        <span>DEVCON 2K24</span>
        <span>DEVCON 2K24</span>
        <span>DEVCON 2K24</span>
		</p>
		<div className="right-info-container">
			<div className="show-name">
				<h1>Starts From</h1>
			</div>
			<div className="time">
				<p>8:00 PM <span>TO</span> 11:00 PM</p>
				<p>DOORS <span>@</span> 7:00 PM</p>
			</div>
			<div className="barcode">
				<img src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb" alt="QR code"/>
			</div>
			<p className="ticket-number">
				#20030220
			</p>
		</div>
	</div>
    
    </div>
 
</div>
<div className='flex justify-center items-center my-2 h-40'>
<motion.button className='p-2 m-2 bg-purple-600 text-white fontevent rounded-md flex justify-center items-center' whileHover={{scale:1.1}} whileTap={{scale:0.9, rotate:1}}>Event Details <MdEventNote className='mx-1'/></motion.button>
<motion.button className='p-2 m-2 bg-purple-600 text-white fontevent rounded-md flex justify-center items-center' whileHover={{scale:1.1}} whileTap={{scale:0.9, rotate:1}}>Download Now<IoTicket className='mx-1'/></motion.button>
</div>


        </div>
       
    </div>
    </div>
  )
}

export default MyTicket
