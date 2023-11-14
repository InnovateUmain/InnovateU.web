import React from 'react'
import { FaStar } from "react-icons/fa6";
import { motion } from 'framer-motion';
const Mentorship = () => {
        return (
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
          <style jsx>
{
  `
  @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@600&display=swap');
  .fontevent{
    font-family: 'Cabin', sans-serif;
  }
  `
}
          </style>
            <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
              <div>
                <img className="rounded-xl" src="https://wemakedevs.org/static/media/mentorship.c52b5a8810eecbce6755.png" alt="Image Description"/>
              </div>
          
          
              <div className="mt-5">
              <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl'>Mentorship</h1>
                  <div className='h-2 w-56 bg-purple-600 rounded-full my-4'></div>
                <div className="space-y-6 sm:space-y-8">
                  <ul role="list" className="space-y-2 sm:space-y-4">
                    <li className="flex space-x-3">
                     
                      <FaStar  className='flex justify-center items-center rounded-full  text-blue-600 text-4xl'/>
          
                      <span className=" text-white lg:text-xl fontevent font-bold md:text-xl text-md">
                      All of our events are completely free and open for everyone. Fun-filled events with no compromise on quality
                      </span>
                    </li>
          
                    <li className="flex space-x-3">
                    <FaStar  className='flex justify-center items-center rounded-full  text-blue-600  text-4xl '/>
          
          <span className=" text-white lg:text-xl fontevent font-bold md:text-xl text-md">
          All of our events are completely free and open for everyone. Fun-filled events with no compromise on quality
          </span>
                    </li>
          
                    <li className="flex space-x-3">
                    <FaStar  className='flex justify-center items-center rounded-full  text-blue-600  text-4xl'/>
          
          <span className=" text-white lg:text-xl fontevent font-bold md:text-xl text-md">
          Explore the plethora of events & have the opportunity to grab amazing prizes & goodies!
          </span>
                    </li>
                  </ul>
                <motion.button className='mx-4 fontevent font-bold px-4 py-2 rounded-full text-white bg-purple-600' whileTap={{scale:0.9, rotate:2}}>Learn More &gt;</motion.button>
                </div>
              </div>
          
            </div>
          
          </div>
         
        );
}

export default Mentorship
