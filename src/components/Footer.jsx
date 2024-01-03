'use client';

import { motion } from 'framer-motion';
import { socials } from '../constants';
import { FaRegClipboard } from "react-icons/fa6";
import toast,{Toaster} from 'react-hot-toast';
import styles from '../styles';
import { footerVariants } from '../utils/motion';

const Footer = () => (
  
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <Toaster position='top-center'/>
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white">
          Partner With us
        </h4>
        <p className='text-white'>You can partner with us if you want to host hackathons, <br/>talks and events. Let’s help each other and grow together!</p>
        <button type="button" className="flex items-center h-fit py-2 px-4 bg-[#25618B] rounded-[32px] gap-[6px] justify-center">
         <div className='flex justify-center items-center'>
          <div className='mx-4 fontevent  border-white rounded-full my-2 text-white lg:text-lg hover:bg-black' id='myInput'>
          techinnovateu@gmail.com
         
          </div>
          <div className=' bg-purple-600 text-white rounded-full py-2 px-2 mx-6 h-16 w-16 flex justify-center items-center ' onClick={()=>{
            var copyText = document.getElementById("myInput");
            navigator.clipboard.writeText(copyText.innerText);
            toast.success("Email copied Successfully")
          }}>
          <FaRegClipboard className='lg:text-2xl sm:text-xl md:text-2xl text-xl'/>
          
          </div>
          
          
          </div>
        </button>
      </div>

      <div className="flex flex-col">
        
        <div className=" bg-white" />

       
      </div>
      <hr />
    </div>
  </motion.footer>
);

export default Footer;
