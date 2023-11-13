import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { FaUserAlt } from 'react-icons/fa';
import { motion}  from 'framer-motion';
const Navbar = () => {
  const[isOpen, setIsOpen] = useState(false)
  const handleclick = () => {
    setIsOpen(!isOpen)
  }
  return (
   <>
   <style jsx >
{
  `
  @import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap')
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
  .herofont{
    font-family: 'Lilita One', sans-serif;
  }
  .font{
    font-family: 'Kanit', sans-serif;
  }
  .border{
    border-radius:10px 100px / 120px 100px; 
    border: 2px solid #FFFFFF;
  }
  .border2{
    border-radius:32px 64px; 
    border: 2px solid #FFFFFF;
  }
  `
}
   </style>
   <nav className=" bg-black mx-2 border my-4 fixed top-0 z-50 w-[97vw]">
    <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
            <motion.div className="flex items-center justify-between"
            initial={{opacity:0 ,x:-100}}
            animate={{opacity:1 ,x:0}}
            transition={{type:'spring',stiffness:100}}
            >
                <Link href={"/"}>
                    <h1 className='text-4xl sm:text-2xl lg:text-4xl text-white font-bold herofont'> Innovate<span className='text-yellow-600 herofont'>U</span></h1>
     

                </Link>

                <div className="flex lg:hidden">
                    <button onClick={handleclick} type="button" className={`text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400 `} aria-label="toggle menu">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={`w-10 h-10 ${isOpen==false?"block":"hidden"}`} >
  <rect width="80" height="10" x="10" y="20" rx="5" fill="#FFFFFF"/>
  <rect width="80" height="10" x="10" y="45" rx="5" fill="#FFFFFF"/>
  <rect width="80" height="10" x="10" y="70" rx="5" fill="#FFFFFF"/>
</svg>
                
                        <svg  xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10 ${isOpen==true?"block":"hidden"}`} fill="#FFFFFF" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
       

                    </button>
                </div>
            </motion.div>

            
            <div className={` ${isOpen==true ? 'translate-x-0 opacity-100 border2' : 'opacity-0 -translate-x-full'} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
            >
                <motion.div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8"
                initial={{opacity:0 ,y:-100}}
                animate={{opacity:1 ,y:0}}
                transition={{type:'spring',stiffness:100}}
                >
                    <Link href={"/components/About"}><motion.li  className=" list-none px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-gray-200 hover:bg-gray-700 navfont"
                    whileTap={{scale:0.9,rotate:1}}
                    transition={{type:'spring',stiffness:400}}
                    >About</motion.li></Link>
                    <Link href={"/"}>
                    <motion.li  className="list-none px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 text-gray-200 hover:bg-gray-700 navfont" whileTap={{scale:0.9,rotate:1}} transition={{type:'spring',stiffness:400}}>Our Speakers</motion.li></Link>
                    <Link href={"/"}><motion.li  className="px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-gray-200 hover:bg-gray-700 navfont list-none " whileTap={{scale:0.9,rotate:1}}   transition={{type:'spring',stiffness:400}} >TimeLine</motion.li></Link>
                    <Link href={"/"}><motion.li className="px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-gray-200 hover:bg-gray-700 navfont list-none"   whileTap={{scale:0.9,rotate:1}}
                    transition={{type:'spring',stiffness:400}}>Prizes</motion.li></Link>
                    <Link href={"/"}><motion.li className="px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-gray-200 hover:bg-gray-700 navfont list-none"  whileTap={{scale:0.9,rotate:1}}
                    transition={{type:'spring',stiffness:400}}>Contact Us</motion.li></Link>
                </motion.div>

                <motion.div className=" mx-3 mt-2 py-2 flex items-center lg:mt-0 justify-center text-gray-200 hover:bg-gray-700 navfont px-4 rounded-xl" whileTap={{scale:0.9,rotate:1}}
                    transition={{type:'spring',stiffness:400}}>
                    
                    <Link href={"/Signup"}><li className="   transition-colors duration-300 transform rounded-md lg:mt-0  list-none"  >Log in</li> </Link>
                    <Link href={"/Signup"}><FaUserAlt className='mx-2 text-2xl text-white hover:text-yellow-300 transition-all'/></Link>
                   
                </motion.div>
            </div>
        </div>
    </div>
</nav>
   </>
  )
}

export default Navbar
