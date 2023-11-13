import React, { useEffect, useState } from 'react'

import { BsFillPeopleFill,BsFillCalendar2EventFill} from 'react-icons/bs';
import { MdReviews} from 'react-icons/md';
import { IoSchool} from 'react-icons/io5';;
import { motion, stagger } from 'framer-motion';
const Stats = () => {
  const [data1, setData1] = useState(1000);
  const [data2, setData2] = useState(0);
  const [data3, setData3] = useState(0);
  const [data4, setData4] = useState(0);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
  const [isAnimationCompleted1, setIsAnimationCompleted1] = useState(false);
  const [isAnimationCompleted2, setIsAnimationCompleted2] = useState(false);
  const [isAnimationCompleted3, setIsAnimationCompleted3] = useState(false);
  useEffect(() => {
    if (!isAnimationCompleted) {
      let sum = 0;
      let sum2 = 0;
      const intervalId = setInterval(() => {
        if (sum < 1999) {
          setData1((prevData) => {
            const newValue = prevData + 1;
            sum = newValue;
            return newValue;
          });
        } 
        else {
          setIsAnimationCompleted(true);
          clearInterval(intervalId);
        }
      }, 1);

      return () => clearInterval(intervalId);
    }
  }, [isAnimationCompleted])
  useEffect(() => {
    if (!isAnimationCompleted1) {
      let sum = 0;
      const intervalId = setInterval(() => {
        if (sum < 1000) {
          setData2((prevData) => {
            const newValue = prevData + 1;
            sum = newValue;
            return newValue;
          });
        } 
        else {
          setIsAnimationCompleted1(true);
          clearInterval(intervalId);
        }
      }, 1);

      return () => clearInterval(intervalId);
    }
  }, [isAnimationCompleted1])
  useEffect(() => {
    if (!isAnimationCompleted2) {
      let sum = 0;
      const intervalId = setInterval(() => {
        if (sum < 599) {
          setData3((prevData) => {
            const newValue = prevData + 1;
            sum = newValue;
            return newValue;
          });
        } 
        else {
          setIsAnimationCompleted2(true);
          clearInterval(intervalId);
        }
      }, 1);

      return () => clearInterval(intervalId);
    }
  }, [isAnimationCompleted2])
  useEffect(() => {
    if (!isAnimationCompleted3) {
      let sum = 0;
      const intervalId = setInterval(() => {
        if (sum < 199) {
          setData4((prevData) => {
            const newValue = prevData + 1;
            sum = newValue;
            return newValue;
          });
        } 
        else {
          setIsAnimationCompleted3(true);
          clearInterval(intervalId);
        }
      }, 1);

      return () => clearInterval(intervalId);
    }
  }, [isAnimationCompleted3])
  return (
    <div>
      <style jsx global>
{
    `
    @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@600&display=swap');
    .fontstat{
        font-family: 'Kanit', sans-serif;
    }
    `
}
      </style>
      <section className="text-gray-200 font-poppins bg-gradient-to-t from-slate-900 via-purple-900 to-gray-900">
  <div className="container px-5 py-4 mx-auto ">
  <h1 className='font-bold text-4xl text-white mx-2 my-12 fontstat'>
            Numbers Say It All
            <div className='h-2 w-56 bg-purple-600 rounded-full my-2'></div>
        </h1>
     
    <div className="flex flex-wrap -m-4 text-center">
      <motion.div className="p-4 md:w-1/4 sm:w-1/2 w-full " whileInView={isAnimationCompleted} viewport={{once: true}}>
        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
            <BsFillPeopleFill className='text-4xl text-yellow-500 mb-3 inline-block sm:text-4xl md:text-4xl lg:text-6xl'/>
          <h2 className="title-font font-medium text-3xl text-white fontstat">{data1}+</h2>
          <p className="leading-relaxed fontstat">Members</p>
        </div>
      </motion.div>
      <motion.div className="p-4 md:w-1/4 sm:w-1/2 w-full" whileInView={isAnimationCompleted1}>
        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
            <MdReviews className='text-4xl text-yellow-500 mb-3 inline-block sm:text-4xl md:text-4xl lg:text-6xl'/>
          <h2 className="title-font font-medium text-3xl text-white fontstat">{data2}+</h2>
          <p className="leading-relaxed fontstat">Reviews</p>
        </div>
      </motion.div>
      <motion.div className="p-4 md:w-1/4 sm:w-1/2 w-full" whileInView={isAnimationCompleted2}>
        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
            <BsFillCalendar2EventFill className='text-4xl text-yellow-500 mb-3 inline-block sm:text-4xl md:text-4xl lg:text-6xl'/>
          <h2 className="title-font font-medium text-3xl text-white fontstat">{data3}+</h2>
          <p className="leading-relaxed fontstat">Events</p>
        </div>
      </motion.div>
      <motion.div className="p-4 md:w-1/4 sm:w-1/2 w-full" whileInView={isAnimationCompleted3}>
        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
            <IoSchool className='text-4xl text-yellow-500 mb-3 inline-block sm:text-4xl md:text-4xl lg:text-6xl'/>
          <h2 className="title-font font-medium text-3xl text-white fontstat">{data4}+</h2>
          <p className="leading-relaxed fontstat">Colleges</p>
        </div>
      </motion.div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Stats
