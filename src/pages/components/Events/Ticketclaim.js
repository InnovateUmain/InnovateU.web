import React, { useEffect, useState } from 'react'
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import { motion } from 'framer-motion';
import toast,{ Toaster } from 'react-hot-toast';
import Spinner from '../Spinner';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { IoTicketSharp } from "react-icons/io5";
import QrReader from 'react-qr-scanner'
import { IoMdCloseCircle } from "react-icons/io";
import Link from 'next/link';
import Box from '@mui/material/Box';
const Ticketclaim = () => {
  const [width,setWidth] = useState(0);
  const [data,setData] = useState({});
  useEffect(()=>{
    var w = window.innerWidth;
   if(w>=500){
    setWidth(500);
   }
   else{
    setWidth(350);
   }
    
   },[])
   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {width},
    bgcolor: 'background.paper',
    border: '2px solid purple',
    boxShadow: 24,
    borderRadius: "6px",
    p: 4,
  };
    const previewStyle = {
        height: 240,
        width: 320,
        borderRadius:'10px',
    }
    const constraints = {
        facingMode: {exact: "environment" },
      };
      const handleScan = (data) => {
        let a = document.getElementById('rightaudio');
        if (data) {
          console.log(data.text)
          setTicket(data.text);
          setDelay(false);
          a.play();
        }
      }
      const handleError = (err) => {
        let a = document.getElementById('wrongaudio');
        a.play();
        console.log(err);
      }
    const router = useRouter();
    const [ticket,setTicket] = useState("");
    const [delay,setDelay] = useState(false);
    const [open,setOpen]=useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{ 
setTimeout(()=>{
setDelay(true);
},2000)
    },[])
    const handleChange=(e)=>{  
        if(e.target.name=="ticket"){
            setTicket(e.target.value);
        }
    }
    const handleOpen=()=>{
      setOpen(true);
      
         }
         const handleClose=()=>{
          setOpen(false);
        }
    const handleSubmit=async()=>{
        setLoading(true);
        const data = {ticketid:ticket};

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/ticketclaim`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const response=await res.json();
          setLoading(false);
          if(response.success){
              toast.success(response.message);
              setData(response.data);
              setTicket('');
              setDelay(true);
              handleOpen();
          }
          else{
            setDelay(true)
            setTicket('');
              toast.error(response.message);
          }
    }
  return (
    <div className='min-h-screen relative top-20'>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <div className='absolute top-2 right-2 text-purple-600' onClick={handleClose}>
    <IoMdCloseCircle className='text-4xl'/>
    </div>
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-tickScale inline-block bg-green-600 rounded-full">
    
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>
        
        <h1 className="lg:text-4xl md:text-4xl sm:text-2xl font-semibold text-gray-800 mb-4 font text-2xl">Congratulations!</h1>
        <p className="text-lg text-gray-600 mb-4 font">Congratulations! You have successfully claimed {data.name} Ticket.</p>
        <p className="text-lg text-gray-600 mb-2 font">Name: - <span className='font-bold text-green-600'>{data.name}</span>.</p>
        <p className="text-lg text-gray-600 mb-2 font">Email: - <span className='font-bold text-green-600'>{data.email}</span>.</p>
        <p className="text-lg text-gray-600 mb-2 font">Ticket id: - <span className='font-bold text-green-600'>{data.ticketid}</span>.</p>
        <motion.button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full inline-block mx-2 my-4 "
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 ,rotate:1}}
        onClick={handleClose}
        >Go Back</motion.button>
    
    </div>
  </Box>
</Modal>
        <Toaster position="top-center" reverseOrder={false}/>
      {loading?<div className='flex justify-center '><Spinner/></div>:<>
      
  {/* ========== MAIN CONTENT ========== */}
  <main
    id="content"
    role="main"
    className="relative max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto w-full h-full before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element-dark.svg')] before:bg-no-repeat before:bg-top before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 mb-10"
  >
    <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
      <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png" alt="" className='w-20 sm:w-28 h-auto mx-auto mb-4 sm:mb-8'/>
      <h1 className="text-2xl text-white sm:text-4xl">
        Claim tickets for Devcon 2k24
      </h1>
      <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
        <span className="bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-400 text-transparent">
          Ticket Claim
        </span>
      </h2>
    <div>
        <audio src="/qrrightaudio.mp3" id='rightaudio'></audio>
        <audio src="/qrwrongaudio.mp3" id='wrongaudio'></audio>
    {delay&&<div className='flex justify-center my-4 rounded-lg'><QrReader
          style={previewStyle}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          key="environment"
          constraints={{
          audio: false,
          video: { facingMode: "environment" }}}
          />
          </div>}
    </div>
    
      <div>
        <div className="mt-8 space-y-4">
         
          <div>
            <label
              htmlFor="hs-cover-with-gradient-form-email-1"
              className="sr-only"
            >
              Ticket ID
            </label>
            <div className="relative">
              <input
                type="text"
                name='ticket'
                onChange={handleChange}
                value={ticket}
                id="hs-cover-with-gradient-form-email-1"
                className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-lg text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                placeholder="Ticket ID"
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                <IoTicketSharp className="flex-shrink-0 h-4 w-4 text-gray-400"/>
               
              </div>
            </div>
          </div>
          
          <div className="grid">
            <button
              type="submit"
              className="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={handleSubmit}
            >
              Claim Ticket
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>

</>}

    </div>
  )
}

export default Ticketclaim
