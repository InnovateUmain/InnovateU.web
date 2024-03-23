import React from 'react'
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import Head from 'next/head';
import { IoMdCloseCircle } from "react-icons/io";
const CodeCraft = () => {
  const [timeUp , setTimeUp] = useState(false);
  //for modal code start here
  const [width,setWidth]= useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      //end here
  const targetDate = new Date("2024-04-22T23:40:59").getTime();
  const [countDownTime, setCountDownTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  let timerInterval;

  const getTimeDifference = () => {
    const currentTime = new Date().getTime();
    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
      // The countdown has ended
      clearInterval(timerInterval);
      setCountDownTime({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      handleCountdownEnd();
    } else {
      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000)).toString().padStart(2, '0');
      const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000).toString().padStart(2, '0');

      setCountDownTime({
        days,
        hours,
        minutes,
        seconds,
      });
    }
  };

  const handleCountdownEnd = () => {
    console.log("Time's up!"); 
    setTimeUp(true);
    handleOpen();
    // You can replace this with any action you want to perform when the countdown ends
  };

  const startCountDown = useCallback(() => {
    getTimeDifference(); // Initial call to set the countdown
    timerInterval = setInterval(getTimeDifference, 1000);

    return () => {
      clearInterval(timerInterval); // Cleanup the interval on unmount
    };
  }, []);

  useEffect(() => {
    startCountDown();
    return () => clearInterval(timerInterval); // Cleanup the interval on unmount
  }, [startCountDown]);

  return (
    <div className='min-h-screen text-white  bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900'>
      <Head>
        <title>Code Craft - for Developers</title>
      </Head>
      <div className='mt-20'>
      <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
    <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
      <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
        <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
          <h1 className="text-4xl font-bold leading-tight text-white navfont sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
            Code Craft - for Developers
          </h1>
         
          <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
          {/* <Timer /> */}
          <section>
          <div className="">
      <div className="flex flex-col items-center justify-center w-full h-full gap-4">
       
        <div className="flex justify-center gap-3 sm:gap-8">
          <div className="flex flex-col gap-5 relative">
            <div className="lg:h-20 lg:w-20  md:h-20 md:w-20 h-16 w-16 flex justify-between items-center bg-green-600 rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className="lg:text-4xl sm:text-4xl md:text-3xl text-2xl font-semibold text-white">
                {countDownTime?.days}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#868be9] text-xs sm:text-xl text-center capitalize">
              {countDownTime?.days == 1 ? "Day" : "Days"}
            </span>
          </div>
          <div className="flex flex-col gap-5 relative">
            <div className="lg:h-20 lg:w-20  md:h-20 md:w-20 h-16 w-16  flex justify-between items-center bg-purple-600 rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className="lg:text-4xl sm:text-4xl md:text-3xl text-2xl font-semibold text-white">
                {countDownTime?.hours}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#9a9ee8] text-xs sm:text-xl text-center font-medium">
              {countDownTime?.hours == 1 ? "Hour" : "Hours"}
            </span>
          </div>
          <div className="flex flex-col gap-5 relative">
            <div className="lg:h-20 lg:w-20  md:h-20 md:w-20 h-16 w-16 flex justify-between items-center bg-[#291241] rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className="lg:text-4xl sm:text-4xl md:text-3xl text-2xl font-semibold text-white">
                {countDownTime?.minutes}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#8b8fe6] text-xs sm:text-xl text-center capitalize">
              {countDownTime?.minutes == 1 ? "Minute" : "Minutes"}
            </span>
          </div>
          <div className="flex flex-col gap-5 relative">
            <div className="lg:h-20 lg:w-20  md:h-20 md:w-20 h-16 w-16  flex justify-between items-center bg-[#291241] rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className="lg:text-4xl sm:text-4xl md:text-3xl text-2xl font-semibold text-white">
                {countDownTime?.seconds}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#868be8] text-xs sm:text-xl text-center capitalize">
              {countDownTime?.seconds == 1 ? "Second" : "Seconds"}
            </span>
          </div>
        </div>
      </div>
    </div>
          </section>
        
            {/* <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
              <img
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://d33wubrfki0l68.cloudfront.net/3bfa6da479d6b9188c58f2d9a8d33350290ee2ef/301f1/images/hero/3/avatar-male.png"
                alt=""
              />
              <img
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://d33wubrfki0l68.cloudfront.net/b52fa09a115db3a80ceb2d52c275fadbf84cf8fc/7fd8a/images/hero/3/avatar-female-1.png"
                alt=""
              />
              <img
                className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                src="https://d33wubrfki0l68.cloudfront.net/8a2efb13f103a5ae2909e244380d73087a9c2fc4/31ed6/images/hero/3/avatar-female-2.png"
                alt=""
              />
            </div> */}
            {/* <p className="mt-4 text-lg text-white lg:mt-0 lg:ml-4 font-pj">
              Join with <span className="font-bold">4600+ Developers</span> and
              start getting feedbacks right now
            </p> */}
          </div>
          
        </div>
        
        <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
          {!timeUp&&<button
            className="inline-flex items-center lg:px-8 md:px-8 px-4 py-4 lg:text-lg text-md font-bold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600 lg:mx-0 mx-2 my-2"
           onClick={handleOpen}
          >
            
            Enroll Now 
            <AiOutlineLogin className='mx-2'/>
          </button>}
          {timeUp&&<button
            className="inline-flex items-center lg:px-8 md:px-8 px-4 py-4 lg:text-lg text-md font-bold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600 lg:mx-0 mx-2 my-2"
            role="button"
          >
            
            Start Test
            <AiOutlineLogin className='mx-2'/>
          </button>}
          <button
            className="inline-flex items-center  lg:px-8 md:px-8 px-4 py-4 lg:text-lg text-md font-bold text-white transition-all duration-200 bg-purple-600 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600 mx-2 my-2"
           
          >
            
           Explore More
          </button>
        </div>
      </div>
     
      <div className="xl:col-span-3">
        <img
          className="lg:w-[40vw] md:w-[50vw] sm:w-[50vw] w-[70vw] mx-auto scale-110"
          src="/v2.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</section>
<section>
<>
  {/* Features */}
  <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    {/* Grid */}
    <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
      <div>
        <img
          className="rounded-xl"
          src="/imgv.jpg"
          alt="Image Description"
        />
      </div>
      {/* End Col */}
      <div className="mt-5 sm:mt-10 lg:mt-0">
        <div className="space-y-6 sm:space-y-8">
          {/* Title */}
          <div className="space-y-2 md:space-y-4">
            <h2 className="font-bold text-3xl lg:text-4xl text-white navfont">
              Why you should choose Code Craft?
            </h2>
            <p className="text-white navfont">
            At Code Craft, we offer more than just a developer test; we provide an unparalleled experience tailored to meet the needs of both budding and seasoned developers aiming to join InnovateU. Here is why you should opt for Code Craft:
            </p>
          </div>
          {/* End Title */}
          {/* List */}
          <ul role="list" className="space-y-2 sm:space-y-4">
            <li className="flex space-x-3">
              <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                <svg
                  className="flex-shrink-0 size-3.5"
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-sm sm:text-base text-white navfont">
                <span className="font-bold">Easy &amp; fast</span> designing
              </span>
            </li>
            <li className="flex space-x-3">
              <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                <svg
                  className="flex-shrink-0 size-3.5"
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-sm sm:text-base text-white navfont">
                Powerful <span className="font-bold">features</span>
              </span>
            </li>
            <li className="flex space-x-3">
              <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                <svg
                  className="flex-shrink-0 size-3.5"
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-sm sm:text-base text-white navfont">
                User Experience Design
              </span>
            </li>
          </ul>
          {/* End List */}
        </div>
      </div>
      {/* End Col */}
    </div>
    {/* End Grid */}
  </div>
  {/* End Features */}
</>

</section>

      </div>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <div className='absolute top-2 right-2 text-purple-600' onClick={handleClose}>
    <IoMdCloseCircle className='text-4xl' onClick={handleClose}/>
    </div>
    <div className="bg-white p-8 rounded-lg  text-center">
        <div className="animate-tickScale inline-block rounded-full">
    
        <img src="/v1.svg" alt="svg" className='w-60'/>
        </div>
        
        <h1 className="lg:text-4xl md:text-4xl sm:text-2xl font-semibold text-green-600 mb-4 font text-2xl navfont">Test is live now</h1>
       
      
        <p className="text-lg text-gray-600 mb-2 navfont">Test is live now . Click on the Start the test button to continue.</p>
        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full block mx-2 my-4 ">Start the Test</Link>
       
    </div>
  </Box>
</Modal>
    </div>
  )
}

export default CodeCraft
