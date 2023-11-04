import React from 'react';
import { BsFillCalendarCheckFill} from 'react-icons/bs';
import { RiTwitterXLine} from 'react-icons/ri';
import { FaMapLocationDot,FaLinkedinIn,FaInstagram } from 'react-icons/fa6';
import { motion } from 'framer-motion';
const Hero = () => {
  return (
    <>
    <style jsx >
{
  `
  @import url('https://fonts.googleapis.com/css2?family=Play&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
  .herofont{
    font-family: 'Lilita One', sans-serif;
  }
  .dt{
    font-family: 'Play', sans-serif;
  }
  @media screen and (max-width: 416px) {
    .dt1{
      font-family: 'Play', sans-serif;
      font-size: 16px;
    }
  }
  `
}
    </style>
    <section className="pt-12 bg-none sm:pt-16 absolute top-14 w-[100vw] h-[80vh] flex justify-center items-center">
          <motion.div className="px-4  sm:px-6 lg:px-8 "
          initial={{opacity:0 ,x:-200}}
          animate={{x:0,opacity:1}}
          whileInView={{x:0,opacity:1}}
          transition={{type:'spring',stiffness:50,when:'beforeChildren'}}
          >
            <div className=" mx-auto text-center ">
              <h1 className="px-6 text-lg text-gray-200 herofont">
                Welcome Innovators🧑‍💻
              </h1>
              <motion.div 
              drag
              dragConstraints={{left:0,right:4,top:4,bottom:4}}
              >
              <p className=" herofont hero-text font-bold  text-white sm:text-5xl lg:text-9xl leading-tight text-5xl md:text-8xl herofont"
            
              >
                DEV FEST 2023
                {/* <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span> */}
                <br /><span className="herofont text-yellow-600">
                  {" "}
                  INNOVATEU{" "}
                </span>
              </p>
              </motion.div>

              <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-4 w-[100vw]">
                <div className='flex justify-center items-center text-yellow-600  mx-2 my-2'>
<BsFillCalendarCheckFill className='text-2xl mx-2 dt1'/>
<p className='lg:text-2xl text-xl dt1'>12 DEC 2023</p>
<FaMapLocationDot className='text-2xl mx-2 dt1'/>
<p className='lg:text-2xl text-xl dt1'>CUTM, ODISHA</p>
                </div>
                
                {/* <a
                  href="#Devtools"
                  title=""
                  className="inline-flex  items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-purple-600 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Explore More
                </a> */}

              </div>
              <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-6">
                 <motion.button
                
                  className="inline-flex  items-center justify-center px-10 py-2 text-lg text-black transition-all duration-200 bg-white border-2 border-none sm:w-auto rounded-xl   focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dt font-bold mx-2 my-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 ,rotate:1}}
                  transition={{ duration: 0.1 }}
                >
                  Register Now
                </motion.button>
                <motion.button
                
                className="inline-flex  items-center justify-center px-10 py-2 text-lg text-black transition-all duration-200 bg-yellow-600 border-2 border-none sm:w-auto rounded-xl   focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dt font-bold mx-2 my-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 ,rotate:1}}
                transition={{ duration: 0.1 }}
              >
                Explore More
              </motion.button>
              </div>
              <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-10 lg:absolute lg:right-8 ">
                <div className='flex justify-center items-center text-white mx-2 my-2 '>
<FaLinkedinIn className='text-2xl mx-2 dt1 hover:text-green-600'/>

<FaInstagram className='text-2xl mx-2 dt1 hover:text-green-600'/>
<RiTwitterXLine className='text-2xl mx-2 dt1 hover:text-green-600'/>

                </div>
                </div>
            </div>
          </motion.div>

          <div className="pb-12 bg-none"></div>
        </section>  
      
    </>
  )
}

export default Hero
