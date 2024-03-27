import React, { useRef } from 'react'
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import toast, { Toaster } from "react-hot-toast";
import BlogSkeleton from '../skeleton/BlogSkeleton';
import Webcam from 'react-webcam';
import Head from 'next/head';
import Spinner from '../Spinner';
import { get, set } from 'mongoose';
import Link from 'next/link';
const TestPage = () => {
  const router = useRouter();
  //all the states
  const [testid,setTestid] = useState("");
  const [testQuestions,setTestQuestions] = useState([]);
  const [loading,setLoading] = useState(false);
  const [img , setImg] = useState("");
  const [isEligibleStartTest, setIsEligibleStartTest] = useState(false);
  const [currentSatge,setCurrentStage] = useState(0);
  const [allAnswers,setAllAnswers] = useState([]);
  const [email,setEmail] = useState("");
  const [question1Answer,setQuestion1Answer] = useState({});
  const [question2Answer,setQuestion2Answer] = useState({});
  const [question3Answer,setQuestion3Answer] = useState({});
  const [question4Answer,setQuestion4Answer] = useState({});
  const [imgarr,setImgarr] = useState([]);

  const [isStart,setIsStart] = useState(false);

const webcamRef = useRef("");
//fetch request for getting the test questions'
const getQuestion = async()=>{
  setLoading(true);
  const data ={testid:router.query.id};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testquestion`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization":"innovateUAutho@7542@909@open@script@design"
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    setLoading(false);
    if(result.success){
      setTestQuestions(result.data);
    }
    else{
    toast.error(result.message);
    }

}
//getting user submit the test or not
let targetDate ;
  useEffect(()=>{
getQuestion();
let question1 = JSON.parse(localStorage.getItem("question1Answer"));
let question2 = JSON.parse(localStorage.getItem("question2Answer"));
let question3 = JSON.parse(localStorage.getItem("question3Answer"));
let question4 = JSON.parse(localStorage.getItem("question4Answer"));
let imgarr = JSON.parse(localStorage.getItem("imgarr"));
//retriving all cahes data from local storage
if(imgarr!=null){
  setImgarr(imgarr);
}

if(question3!=null){
  setQuestion3Answer(question3);
}
if(question4!=null){
  setQuestion4Answer(question4);
}
if(question1!=null){
  setQuestion1Answer(question1);
}
if(question2!=null){
  setQuestion2Answer(question2);
}
if(localStorage.getItem("inispermit")=="true"){
  setIsEligibleStartTest(true);
}
//if exam is started then set the current stage
if(localStorage.getItem("isstart")=="true"){
  setCurrentStage(1);
}
if(localStorage.getItem("IsFinish")=="true"){
setIsEligibleStartTest(false);
}
if(localStorage.getItem("innovateUuser")){
  let a = JSON.parse(localStorage.getItem("innovateUuser")).email;
  setEmail(a);
}
//TEST API DATA
(async()=>{
  setLoading(true);
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`);
  const data = await res.json();
  if(data.tests.length!=0){
    targetDate = new Date(data.tests[0].testenddate).getTime();
  }
})()
//handle r
// Function to handle the event
const handleRightClick = (event) => {
  event.preventDefault();
};

// Adding the event listener
document.addEventListener('contextmenu', handleRightClick);

// Cleanup function to remove the event listener
return () => {
  document.removeEventListener('contextmenu', handleRightClick);
};
//right click disable
  },[router.query])
  ///all aplication handle changes
const handleChange = (e)=>{
  testQuestions.question1.map((item,index)=>{
    if(e.target.name==index){
      setQuestion1Answer({...question1Answer,
      [index]:e.target.value
    });
    let setvar = {...question1Answer,
      [index]:e.target.value};
    localStorage.setItem("question1Answer",JSON.stringify(setvar));
  }
  })
}
const handleChange2 = (e)=>{
  testQuestions.question2.map((item,index)=>{
    if(e.target.name==index){
      setQuestion2Answer({...question2Answer,
      [index]:e.target.value
    });
    let setvar = {...question2Answer,
      [index]:e.target.value};
    localStorage.setItem("question2Answer",JSON.stringify(setvar));
  }
  })
}
const handleChange3 = (e)=>{
  testQuestions.question3.map((item,index)=>{
    if(e.target.name==index){
      setQuestion3Answer({...question3Answer,
      [index]:e.target.value
    });
    let setvar = {...question3Answer,
      [index]:e.target.value};
    localStorage.setItem("question3Answer",JSON.stringify(setvar));
  }
  })
}
const handleChange4 = (e)=>{
  testQuestions.question4.map((item,index)=>{
    if(e.target.name==index){
      setQuestion4Answer({...question4Answer,
      [index]:e.target.value
    });
    let setvar = {...question4Answer,
      [index]:e.target.value};
    localStorage.setItem("question4Answer",JSON.stringify(setvar));
  }
  })
}
  //handle submit function
  const handleSubmit = async(e)=>{
    let emailuser = JSON.parse(localStorage.getItem("innovateUuser")).email;
    setLoading(true);
    if(!localStorage.getItem("isstart")){
      setLoading(false);
      setIsEligibleStartTest(false);
      return;
    }
    const data = {
      testid:router.query.id,
      email:emailuser,
      question1:question1Answer,
      question2:question2Answer,
      question3:question3Answer,
      question4:question4Answer,
      imgarr:imgarr,
      status:"submitTest"
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testreg`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    setLoading(false);
    if(result.success){
      toast.success(result.message);
      localStorage.removeItem("isstart");
      localStorage.removeItem("question1Answer");
      localStorage.removeItem("question2Answer");
      localStorage.removeItem("question3Answer");
      localStorage.removeItem("question4Answer");
      localStorage.removeItem("inispermit");
      localStorage.setItem("IsFinish",true);
      localStorage.removeItem("innovateUTestSession");
      // router.push('/dashboard');
      setCurrentStage(0);
      router.push('/components/Tests/Thankyou');
    }
    else{
      toast.error(result.message);
    }
   
  }
//TIMER FUNCTION STARTS FROM HERE;
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

const handleCountdownEnd = async() => {
  let question1Answerl = JSON.parse(localStorage.getItem("question1Answer"));
  let question2Answerl = JSON.parse(localStorage.getItem("question2Answer"));
  let question3Answerl = JSON.parse(localStorage.getItem("question3Answer"));
  let question4Answerl = JSON.parse(localStorage.getItem("question4Answer"));
let imgarrreal = JSON.parse(localStorage.getItem("imgarr"));
  let emailuser = JSON.parse(localStorage.getItem("innovateUuser")).email;
  setLoading(true);
  if(!localStorage.getItem("isstart")){
    setLoading(false);
    setIsEligibleStartTest(false);
    return;
  }
  const data = {
    testid:router.query.id,
    email:emailuser,
    question1:question1Answerl,
    question2:question2Answerl,
    question3:question3Answerl,
    question4:question4Answerl,
    imgarr:imgarrreal,
    status:"submitTest"
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/Test/testreg`,
    {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  setLoading(false);
  if(result.success){
    toast.success(result.message);
    localStorage.removeItem("isstart");
    localStorage.removeItem("question1Answer");
    localStorage.removeItem("question2Answer");
    localStorage.removeItem("question3Answer");
    localStorage.removeItem("question4Answer");
    localStorage.removeItem("inispermit");
    localStorage.setItem("IsFinish",true);
    localStorage.removeItem("innovateUTestSession");
    // router.push('/dashboard');
    setCurrentStage(0);
    router.push('/components/Tests/Thankyou');
  }
  else{
    toast.error(result.message);
  }
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
useEffect(() => {
  const intervalId = setInterval(() => {
    getScreenshot();
  }, 10000); // 10 seconds

  return () => clearInterval(intervalId); // Cleanup interval on unmount
}, []); // Run only once after initial render

const getScreenshot = () => {
  if (webcamRef.current) {
    let newImg = webcamRef.current.getScreenshot();
    setImg(newImg); // Assuming this sets the current image for display

    // Append new image to the array and update both state and localStorage
    setImgarr(prevImgarr => {
      const newImgarr = [...prevImgarr, newImg]; // Copy previous array and add new image
      localStorage.setItem("imgarr", JSON.stringify(newImgarr)); // Update localStorage
      return newImgarr; // Return updated array to update state
    });
  }
};
// setInterval(getScreenshot, 10000);
const startexam = ()=>{
  localStorage.setItem("isstart","true");
  setIsStart(true);
  if(currentSatge<4){
    setCurrentStage(currentSatge+1);
  }
}
const prev = ()=>{
  if(currentSatge>1){
    setCurrentStage(currentSatge-1);
   }
 }
 const next = ()=>{
   if(currentSatge<4){
     setCurrentStage(currentSatge+1);
   }
 }
 //handle paste functions
 const preventPaste = (e) => {
  e.preventDefault();
  toast.error("Pasting is strictly prohibited during this exam; any attempt to do so will result in immediate disqualification and your session will be terminated.");
  toast.error("Terminating the session due to malpractice")
  router.push('/CodeCraft');
};
const oncopycontent=(event)=> {
  event.preventDefault();
  toast.error("Copy and paste is strictly prohibited during this exam; any attempt to do so will result in immediate disqualification and your session will be terminated.");
  toast.error("Terminating the session due to malpractice")
  router.push('/CodeCraft');
}

//tab change event 
let once = false;

// Execute the code at least once
if (!once) {
 
}

useEffect(() => {
  const handleBlur = () => {
    toast.error("You are not allowed to change the tab during the exam; any attempt to do so will result in immediate disqualification and your session will be terminated.");
    toast.error("Terminating the session due to malpractice");
    router.push('/CodeCraft');
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && (event.key === "c" || event.key === "C" || event.key === "v" || event.key === "V" || event.key === "x" || event.key === "X")) {
      toast.error("Copy and paste is strictly prohibited during this exam; any attempt to do so will result in immediate disqualification and your session will be terminated.");
      toast.error("Terminating the session due to malpractice");
      router.push('/CodeCraft');
    }
  };

  window.addEventListener("blur", handleBlur);
  window.addEventListener("keydown", handleKeyDown);

  // Cleanup: Remove event listeners
  return () => {
    window.removeEventListener("blur", handleBlur);
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []); 

console.log(imgarr)
  return (
    <>
    <style jsx>
{`
* {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera, and Edge */
}
`}
    </style>
    <Head>
        <title>Test Page - CodeCraft</title>
        <meta name="description" content="Test Page - CodeCraft" />
        
    </Head>
         <Toaster position="top-right" reverseOrder={false} />
         {isEligibleStartTest&&<div>
    {loading?<div className='mt-20'><BlogSkeleton/></div>:<div className='min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 mt-20 '>
      <div className='lg:absolute right-0  relative flex justify-center items-center md:absolute'>
      <div className='w-52 h-52 rounded'>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <img src={img} alt="" className='w-52 h-52 rounded my-2 hidden lg:block'/>
    </div>
      </div>
    <section className='flex justify-start  sticky top-20 '>
   
          <div className="lg:absolute lg:left-0  relative top-0">
      <div className="flex flex-col items-center justify-center w-full h-full gap-4  bg-black rounded">
       
        <div className="flex justify-center mx-2 ">
          {/* <div className="flex flex-col gap-5 relative">
            <div className=" h-10 w-10 flex justify-between items-center bg-green-600 rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className=" text-xl font-semibold text-white">
                {countDownTime?.days}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#868be9] text-xs  text-center capitalize">
              {countDownTime?.days == 1 ? "Day" : "Days"}
            </span>
          </div> */}
          <div className="flex flex-col gap-5 relative mx-2">
          <div className=" h-10 w-10 flex justify-between items-center bg-green-600 rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className=" text-xl font-semibold text-white">
                {countDownTime?.hours}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#9a9ee8] text-xs text-center font-medium">
              {countDownTime?.hours == 1 ? "Hour" : "Hours"}
            </span>
          </div>
          <div className="flex flex-col gap-5 relative mx-2">
          <div className=" h-10 w-10 flex justify-between items-center bg-yellow-600 rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className=" text-xl font-semibold text-white">
                {countDownTime?.minutes}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#8b8fe6] text-xs  text-center capitalize">
              {countDownTime?.minutes == 1 ? "Minute" : "Minutes"}
            </span>
          </div>
          <div className="flex flex-col gap-5 relative mx-2">
          <div className=" h-10 w-10 flex justify-between items-center bg-purple-600 rounded-lg">
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
              <span className=" text-xl font-semibold text-white">
                {countDownTime?.seconds}
              </span>
              <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
            </div>
            <span className="text-[#868be8] text-xs text-center capitalize">
              {countDownTime?.seconds == 1 ? "Second" : "Seconds"}
            </span>
          </div>
        </div>
      </div>
    </div>
    
          </section>
    {/* start instruction */}
  {  currentSatge==0&&<div className='flex justify-center items-center py-2 mx-2 '>
    <div className="max-w-md px-8 py-12 bg-white shadow-lg rounded-lg lg:max-w-2xl md:max-w-xl">
      
        <h1 className="text-3xl font-semibold text-center mb-6 navfont">Welcome to {testQuestions&&testQuestions.testname} Exam!</h1>
        <p className="text-lg text-gray-700 mb-8 navfont">
          Before you begin, please read the instructions carefully.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 navfont">Instructions:</h2>
          <ul className="list-disc list-inside text-gray-700 navfont">
            <li>Ensure you have a stable internet connection.</li>
            <li>Do not refresh the page during the exam.</li>
            <li>Answer all questions to the best of your ability.</li>
            <li>You have 90 minutes to complete the exam.</li>
            <li>Click the Start Exam button when you are ready to begin.</li>
            <li>Maintain the highest standards of academic integrity; cheating, plagiarism, or unauthorized assistance is strictly prohibited.</li>
            <li>If any malpractice is found, then your session will be terminated if the system recognizes it.</li>
          </ul>
        </div>

        <button className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-300"
        onClick={startexam}
        >
          Start Exam
        </button>
      </div>
      
      </div>}
      {/* end of instruction */}
      


    <section className='flex justify-center items-center flex-col flex-wrap'>
   {currentSatge==1&& <div className='flex justify-center items-center'>
      <div className='lg:w-[60vw] w-[90vw]  bg-white text-black px-8 py-4 m-4 rounded-lg'>
        <h1 className='navfont text-2xl font-bold my-4 text-gray-600' >QUESTION ROUND 1</h1>
      {testQuestions&&testQuestions.question1.map((item,index)=>(<div className='bg-green-300 p-4 rounded my-4' key={index}>
      <h1 className='navfont text-2xl font-bold'>
        Q{index+1}. {item.question} 
   
       </h1>
       <div className='flex items-center my-4'>
       <input type="radio" name={index} value={`option1`} className='h-6 w-6' onChange={handleChange}
       checked={question1Answer[index]=="option1"}
       />
        <label htmlFor={index} className='navfont mx-2 text-lg font-bold' >A. {item.option1}</label>
       </div>
       <div className='flex items-center my-4'>
       <input type="radio" name={index} value={`option2`} className='h-6 w-6' onChange={handleChange}
       checked={question1Answer[index]=="option2"}
       />
        <label htmlFor={index} className='navfont mx-2 text-lg font-bold'>B. {item.option2} </label>
       </div>
       <div className='flex items-center my-4'>
       <input type="radio" name={index} value={`option3`} className='h-6 w-6' onChange={handleChange}
       checked={question1Answer[index]=="option3"}
       />
        <label htmlFor={index} className='navfont mx-2 text-lg font-bold'>C. {item.option3} </label>
       </div>
       <div className='flex items-center my-4'>
       <input type="radio" name={index} value={`option4`} className='h-6 w-6' onChange={handleChange}
       checked={question1Answer[index]=="option4"}
       />
        <label htmlFor={index} className='navfont mx-2 text-lg font-bold'>D. {item.option4}</label>
       </div>
      
      </div>))}
      </div>
      </div>}
      {/* // */}
      {currentSatge==2&&<div className='flex justify-center items-center'>
      <div className='lg:w-[60vw] w-[90vw]  bg-white text-black px-8 py-4 m-4 rounded-lg'>
        <h1 className='navfont text-2xl font-bold my-4 text-gray-600' >QUESTION ROUND 2</h1>
      {testQuestions.question2.map((item,index)=>(<div className='bg-green-300 p-4 rounded my-4' key={index}>
      <h1 className='navfont text-2xl font-bold'>
        Q{index+1}. {item.question} 
   
       </h1>
       <div className='flex items-center my-4'>
       <input type="radio" name={index} value={`option1`} className='h-6 w-6' onChange={handleChange2}
       checked={question2Answer[index]=="option1"}
       />
        <label htmlFor={index} className='navfont mx-2 text-lg font-bold' >A. {item.option1}</label>
       </div>
       <div className='flex items-center my-4'>
       <input type="radio" name={index} value={`option2`} className='h-6 w-6' onChange={handleChange2}
       checked={question2Answer[index]=="option2"}
       />
        <label htmlFor={index} className='navfont mx-2 text-lg font-bold'>B. {item.option2} </label>
       </div>
       <div className='flex items-center my-4'>
       <input type="radio" name={index} value={`option3`} className='h-6 w-6' onChange={handleChange2}
       checked={question2Answer[index]=="option3"}
       />
        <label htmlFor={index} className='navfont mx-2 text-lg font-bold'>C. {item.option3} </label>
       </div>
       <div className='flex items-center my-4'>
       <input type="radio" name={index} value={`option4`} className='h-6 w-6' onChange={handleChange2}
       checked={question2Answer[index]=="option4"}
       />
        <label htmlFor={index} className='navfont mx-2 text-lg font-bold'>D. {item.option4}</label>
       </div>
      
      </div>))}
      </div>
      </div>}
      {/* //round 3 */}
     { currentSatge==3&&<div className='flex justify-center items-center'>
      <div className='lg:w-[60vw] w-[90vw]  bg-white text-black px-8 py-4 m-4 rounded-lg'>
        <h1 className='navfont text-2xl font-bold my-4 text-gray-600' >QUESTION ROUND 3</h1>
      {testQuestions.question3.map((item,index)=>(<div className='bg-green-300 p-4 rounded ' key={index}>
      <h1 className='navfont text-2xl font-bold'>
        Q{index+1}. {item.question}
   
       </h1>
       <div className='flex flex-col my-4'>
       <label htmlFor="selectone" className='navfont mx-2 text-lg font-bold'>Answer here</label>
       <textarea name={index} id="round3" cols="110" rows="10" placeholder='Enter Your Answer Here'
       
       className='navfont text-lg  p-4' onPaste={preventPaste} onChange={handleChange3}
       value={question3Answer[index]}
       onCopy={oncopycontent}
       ></textarea>
        
       </div>
       
      
      </div>))}
      </div>
      </div>}
      {/* round 4 */}
      {currentSatge==4&&<div className='flex justify-center items-center'>
      <div className='lg:w-[60vw] w-[90vw]  bg-white text-black px-8 py-4 m-4 rounded-lg'>
        <h1 className='navfont text-2xl font-bold my-4 text-gray-600' >QUESTION ROUND 4 - CODING ROUND</h1>
      {testQuestions.question4.map((item,index)=>(<div className='bg-green-300 p-4 rounded my-4' key={index}>
      <h1 className='navfont text-2xl font-bold'>
        Q{index+1}. {item.question}
       </h1>
       <div className='flex flex-col my-4'>
       <label htmlFor="selectone" className='navfont mx-2 text-lg font-bold '>Answer here</label>
       <textarea name={index} id="round3" cols="110" rows="10" placeholder='Enter Your Answer Here'
       className='navfont text-lg  p-4 rounded' onPaste={preventPaste} onChange={handleChange4} value={question4Answer[index]}
       onCopy={oncopycontent}
       ></textarea>
        
       </div>
       
      
      </div>))}
      </div>
      </div>}
    {  currentSatge>=1&&<div className='lg:w-[60vw] w-[95vw] flex justify-end items-center flex-wrap  mb-10 '>

        <button className='w-[20vw] py-3 bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-300 mx-2 my-2 navfont
        disabled:opacity-70 disabled:bg-green-500 disabled:cursor-not-allowed'
        
        onClick={prev} disabled={currentSatge==1}
        >
          Prev
        </button>
       {currentSatge!=4&& <button className=' w-[20vw] py-3 bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-300 my-2 navfont'
        onClick={next}
        >
          Next
        </button>}
        {currentSatge==4&& <button className=' w-[29vw] lg:w-[20vw] py-3 bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-300 my-2 navfont'
        onClick={handleSubmit}
        >
          Submit Now
        </button>}
       
    
      </div>}
     
    </section>
    
    </div>}
    </div>}
  { !isEligibleStartTest&& <>
    <div className='min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 mt-20'>
    <div className='flex justify-center items-center'><div className="bg-white p-8 rounded-lg shadow-lg text-center w-full  mx-4">
        <div className="animate-tickScale inline-block bg-green-600 rounded-full">
    
           <img src="/v1.svg" alt="no data img" className="h-60 w-60"/>
        </div>
        <div className='flex flex-col justify-center items-center'>
   
        <h1 className="lg:text-4xl md:text-4xl sm:text-2xl font-semibold text-gray-800 mb-4 font text-2xl navfont">OOPS ! 🤭🤭🤭</h1>
        <p className=" text-black mb-4 font-bold navfont text-xl"> You are not permitted to start the test or you are already submit the test or Times Up</p>
        <p className="text-lg text-black mb-2 font lg:w-[70vw] md:w-[80vw] w-[80vw] ">Upon accessing the test exam page, users encounter a notification indicating that the test cannot be commenced presently and are advised to reach out to the administrator for additional support or information. This will happen due to early access of exam page or already submit the test .For more information contact us at <a href='mailto:techinnovateu@gmail.com' className='font-bold text-blue-600 navfont' target='_blank'>techinnovateu@gmail.com</a> .</p>
       
</div>
        <Link href="/" className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full inline-block mx-2 my-4 ">Go Back To Home </Link>
        <br/>
       
    </div></div>
   
    </div>
    </>}
    </>
  )
}


export default TestPage;

