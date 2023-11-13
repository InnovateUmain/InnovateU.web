import React from 'react'

import { BsFillPeopleFill,BsFillCalendar2EventFill} from 'react-icons/bs';
import { MdReviews} from 'react-icons/md';
import { IoSchool} from 'react-icons/io5';;
import { motion, stagger } from 'framer-motion';

const Stats = () => {
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
      <section className="text-gray-200 font-poppins ">
  <div className="container px-5 py-4 mx-auto ">
  <h1 className='font-bold text-4xl text-white mx-2 my-12 fontstat'>
            Numbers Say It All
            <div className='h-2 w-56 bg-purple-600 rounded-full my-2'></div>
        </h1>
     
    <div className="flex flex-wrap -m-4 text-center">
      <motion.div className="p-4 md:w-1/4 sm:w-1/2 w-full " initial={{x:-200,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:1}}>
        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
            <BsFillPeopleFill className='text-6xl text-yellow-500 mb-3 inline-block sm:text-4xl md:text-4xl lg:text-6xl'/>
          <h2 className="title-font font-medium text-3xl text-white fontstat">1999+</h2>
          <p className="leading-relaxed fontstat">Members</p>
        </div>
      </motion.div>
      <motion.div className="p-4 md:w-1/4 sm:w-1/2 w-full" initial={{x:-200,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:1
    , delay:0.3
    }}>
        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
            <MdReviews className='text-6xl text-yellow-500 mb-3 inline-block sm:text-4xl md:text-4xl lg:text-6xl'/>
          <h2 className="title-font font-medium text-3xl text-white fontstat">2000+</h2>
          <p className="leading-relaxed fontstat">Reviews</p>
        </div>
      </motion.div>
      <motion.div className="p-4 md:w-1/4 sm:w-1/2 w-full" initial={{x:-200,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:1,delay:0.5}}>
        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
            <BsFillCalendar2EventFill className='text-6xl text-yellow-500 mb-3 inline-block sm:text-4xl md:text-4xl lg:text-6xl'/>
          <h2 className="title-font font-medium text-3xl text-white fontstat">200+</h2>
          <p className="leading-relaxed fontstat">Events</p>
        </div>
      </motion.div>
      <motion.div className="p-4 md:w-1/4 sm:w-1/2 w-full" initial={{x:-200,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:1,delay:0.8}}>
        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
            <IoSchool className='text-6xl text-yellow-500 mb-3 inline-block sm:text-4xl md:text-4xl lg:text-6xl'/>
          <h2 className="title-font font-medium text-3xl text-white fontstat">46+</h2>
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
