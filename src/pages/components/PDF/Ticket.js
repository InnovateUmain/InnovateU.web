import React, { useRef ,useEffect} from 'react'
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
const Ticket = () => {
 

const targetRef = useRef();
    
    
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

}

`}
</style>

       
    
        
        <div className='h-auto w-[90vw] bg-slate-800 rounded-md '>
        <Document >
    <Page size="A4" style={styles.page}>
            <div className='tcom' id='ticket' ref={targetRef}>
        <div className="ticket created-by-anniedotexe " >
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
</Page>
</Document>
<button onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})} className='text-white bg-blue-600 p-2 m-2'>Download PDF</button>

        </div>
       
    </div>
   
  )
}

export default Ticket

