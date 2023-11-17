import React from 'react';
import Link from 'next/link';
import { BsFillCalendarCheckFill} from 'react-icons/bs';
import { RiTwitterXLine} from 'react-icons/ri';
import { FaMapLocationDot,FaLinkedinIn,FaInstagram } from 'react-icons/fa6';
import { motion } from 'framer-motion';
const Hero1 = () => {
  return (
    <>
    <style jsx >
{
  `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
  .herofont{
    font-family: 'Lilita One', sans-serif;
  }
  .dt{
    font-family: 'Roboto', sans-serif;
  }
  @media screen and (max-width: 416px) {
    .dt1{
        font-family: 'Roboto', sans-serif;
      font-size: 16px;
    }
  }
  `
}
    </style>
    <section className="pt-12 bg-none sm:pt-16 absolute top-14 w-[100vw] h-[80vh] flex justify-center items-center ">
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
              <p className=" herofont hero-text font-bold  text-white sm:text-4xl lg:text-9xl leading-tight text-4xl md:text-6xl herofont my-2"
            
              >
               Inspire. Educate. 
                {/* <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span> */}
                <br /><span className="herofont text-purple-600">
                  {" "}
                  Empower{" "}
                </span>
              </p>
              </motion.div>

              <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-4 lg:w-[60vw] w-[100vw] text-white">
                <div className='flex justify-center items-center  mx-2 my-2'>

<p className='lg:text-2xl text-xl dt font-bold'>This is a community which provides <span className='text-yellow-600'>free hands-on training </span>in various fields of computer science and have an inclusive community focusing on a <span className='text-yellow-600'>learn by doing</span> approach.</p>
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
                <Link href={"/components/Hero"}> <motion.button
                
                  className="inline-flex  items-center justify-center px-8 py-2 text-lg text-white transition-all duration-200 bg-purple-600 border-2 border-none sm:w-auto rounded-full  dt font-bold mx-2 my-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 ,rotate:1}}
                  transition={{ duration: 0.1 }}
                >
                  Events &gt;
                </motion.button>
                </Link>
                <motion.button
                
                className="inline-flex  items-center justify-center px-8 py-2 text-lg text-white transition-all duration-200 bg-purple-600 border-2 border-none sm:w-auto rounded-full  dt font-bold mx-2 my-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 ,rotate:1}}
                transition={{ duration: 0.1 }}
              >
                Join &gt;
              </motion.button>
                <motion.button
                
                className="inline-flex  items-center justify-center px-8 py-2 text-lg  transition-all duration-200 bg-purple-600   dt font-bold mx-2 my-2 rounded-full text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 ,rotate:1}}
                transition={{ duration: 0.1 }}
              >
                Courses &gt;
              </motion.button>
              </div>
            
            </div>
          </motion.div>

          <div className="pb-12 bg-none"></div>
        </section>  
      
    </>
  )
}

export default Hero1
