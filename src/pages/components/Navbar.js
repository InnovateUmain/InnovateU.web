import React, { use, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import {
  AiFillCloseCircle,
} from "react-icons/ai";
import {
  MdManageAccounts,
  MdShoppingCart,
} from "react-icons/md";
import {  BiLogOut } from "react-icons/bi";
import { IoTicket } from "react-icons/io5";
import { BsCalendar2EventFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { set } from "mongoose";
const Navbar = ({logout,user}) => {
  const router = useRouter();
  const userinfo = useSelector((state)=>state.userData);
  const sl = userinfo.name.indexOf(" ");
  const [isOpen, setIsOpen] = useState(false);
  const [data1, setData1] = useState(false);
  const [data2, setData2] = useState(false);
  const [data3, setData3] = useState(false);
  const [data4, setData4] = useState(false);
  const [data5, setData5] = useState(false);
  const [data6, setData6] = useState(false);
  const [data7, setData7] = useState(false);
  const [dropdown,setDropdown]=useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [name,setName]= useState("IN");
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleclick = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    <>
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap")
            @import
            url("https://fonts.googleapis.com/css2?family=Lilita+One&display=swap");
          .herofont {
            font-family: "Lilita One", sans-serif;
          }
          .font {
            font-family: "Kanit", sans-serif;
          }
          .navfont {
            font-family: "Rubik", sans-serif;
          }
          /* Define the keyframes for rotation */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Apply the rotation animation to the image */
.img-rotation {

  /* Apply the animation */
  animation: rotate linear infinite;
}

/* Speed control using animation-duration */
.img-rotation-slow {
  animation-duration: 10s; /* Adjust the duration for slower rotation */
}

.img-rotation-fast {
  animation-duration: 1s; /* Adjust the duration for faster rotation */
}

        `}
      </style>
      <nav
        className={`fixed top-0 z-50 w-[100vw] h-20 flex justify-center items-center rounded ${
          scrolling ? "backdrop-blur-xl" : ""
        
        } ${isOpen == true ? "bg-black bg-opacity-80 backdrop-filter backdrop-blur-xl" : ""} `}
        id="navbar"
      >
        <div className="container px-6 py-4 mx-auto ">
          <div className="lg:flex lg:items-center lg:justify-between">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Link href={"/"}>
                <h1 className="text-4xl sm:text-2xl lg:text-4xl text-white font-bold herofont">
                  {" "}
                  <img src="https://res.cloudinary.com/dawzncoau/image/upload/v1701193584/InnovateU-removebg-preview_sgnisw.png" alt="" className="lg:w-20 lg:h-20 md:w-20 md:h-20 w-14 h-14 lg:h-20 lg:w-20 img-rotation img-rotation-slow" />
                </h1>
              </Link>

              <div className="flex lg:hidden ">
                <button
                  onClick={handleclick}
                  type="button"
                  className={`text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400 `}
                  aria-label="toggle menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className={`w-10 h-10 ${
                      isOpen == false ? "block" : "hidden"
                    }`}
                  >
                    <rect
                      width="80"
                      height="10"
                      x="10"
                      y="20"
                      rx="5"
                      fill="#FFFFFF"
                    />
                    <rect
                      width="80"
                      height="10"
                      x="10"
                      y="45"
                      rx="5"
                      fill="#FFFFFF"
                    />
                    <rect
                      width="80"
                      height="10"
                      x="10"
                      y="70"
                      rx="5"
                      fill="#FFFFFF"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-10 h-10 ${
                      isOpen == true ? "block" : "hidden"
                    }`}
                    fill="#FFFFFF"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
<div
              className={` ${
                isOpen == true
                  ? "translate-x-0 opacity-100 border2 border2 w-full h-[100vh] bg-opacity-80 backdrop-filter backdrop-blur-xl"
                  : "opacity-0 translate-x-full"
              } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-black lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
            >
              <motion.div
                className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Link href={"/#about"}>
                  <motion.li
                    className=" list-none px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-white  navfont 
                    text-lg lg:text-base md:text-base sm:text-lg
                    "
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onMouseEnter={() => {
                      setData2(true);
                    }}
                    onMouseLeave={() => {
                      setData2(false);
                    }}
                    onClick={() =>setIsOpen(false)}
                  >
                    About
                    {data2 && (
                      <motion.div
                        className="h-1 bg-purple-600 rounded-full "
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 30, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                      ></motion.div>
                    )}
                  </motion.li>
                  </Link>
                  <Link href="/Event">
                  <motion.li
                    className=" list-none px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-white  navfont 
                    text-lg lg:text-base md:text-base sm:text-lg"
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onMouseEnter={() => {
                      setData6(true);
                    }}
                    onMouseLeave={() => {
                      setData6(false);
                    }}
                    onClick={() =>setIsOpen(false)}
                  >
                   Events
                    {data6 && (
                      <motion.div
                        className="h-1 bg-purple-600 rounded-full "
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 30, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                        onClick={() =>setIsOpen(false)}
                      ></motion.div>
                    )}
                  </motion.li>
                  </Link>
                <Link href={"/components/Speaker"}>
                  <motion.li
                    className="list-none px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 text-white  navfont text-lg lg:text-base md:text-base sm:text-lg"
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onMouseEnter={() => {
                      setData1(true);
                    }}
                    onMouseLeave={() => {
                      setData1(false);
                    }}
                    onClick={() =>setIsOpen(false)}
                  >
                  Our Speakers
                   
                    {data1 && (
                      <motion.div
                        className="h-1 bg-purple-600 rounded-full "
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 60, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                      ></motion.div>
                    )}
                  </motion.li>
                </Link>

                <Link href={"/Team"}>
                  <motion.li
                    className="px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-white navfont list-none 
                    text-lg lg:text-base md:text-base sm:text-lg
                    "
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onMouseEnter={() => {
                      setData3(true);
                    }}
                    onMouseLeave={() => {
                      setData3(false);
                    }}
                    onClick={() =>setIsOpen(false)}
                  >
                    Teams
                    {data3 && (
                      <motion.div
                        className="h-1 bg-purple-600 rounded-full "
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 30, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                      ></motion.div>
                    )}
                  </motion.li>
                </Link>
               <Link  href={"/#newsroom"}>
                  <motion.li
                    className="px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-white  navfont list-none
                    text-lg lg:text-base md:text-base sm:text-lg
                    "
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onMouseEnter={() => {
                      setData4(true);
                    }}
                    onMouseLeave={() => {
                      setData4(false);
                    }}
                    onClick={() =>setIsOpen(false)}
                  >
                    News Room
                    {data4 && (
                      <motion.div
                        className="h-1 bg-purple-600 rounded-full "
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 60, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                      ></motion.div>
                    )}
                  </motion.li>
                  </Link>
                <Link href={"/CodeCraft"}>
                  <motion.li
                    className="px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-white navfont list-none
                    text-lg lg:text-base md:text-base sm:text-lg
                    "
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onMouseEnter={() => {
                      setData5(true);
                    }}
                    onMouseLeave={() => {
                      setData5(false);
                    }}
                    onClick={() =>setIsOpen(false)}
                  
                  >
                    Tests
                    {data5 && (
                      <motion.div
                        className="h-1 bg-purple-600 rounded-full "
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 20, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                      ></motion.div>
                    )}
                  </motion.li>
                  
                </Link>
                <Link href={"/Signup"}>
                  <motion.li
                    className="px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0 text-white navfont list-none
                    text-lg lg:text-base md:text-base sm:text-lg block lg:hidden
                    "
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onMouseEnter={() => {
                      setData7(true);
                    }}
                    onMouseLeave={() => {
                      setData7(false);
                    }}
                    onClick={() =>setIsOpen(false)}
                  
                  >
                    Join Now
                    {data7 && (
                      <motion.div
                        className="h-1 bg-purple-600 rounded-full "
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 20, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                      ></motion.div>
                    )}
                  </motion.li>
                  
                </Link>
              </motion.div>

                {!user&&<Link href={"/Signup"} className="mx-4">
                  <motion.button className=" rounded-full bg-purple-600 px-6 py-2 navfont text-white lg:text-xl md:text-xl hidden lg:block" whileTap={{scale:0.8}}>
                    Join &gt;
                  </motion.button>{" "}
                </Link>}
                {user&&<div className="lg:mx-10  sm:mx-2 hidden lg:block " 
                onMouseEnter={()=>{
                  setDropdown(true);
                }}
                
                >

                  {!userinfo.img&&<Avatar sx={{ bgcolor: deepPurple[500], width: 50, height: 50}}>{userinfo.name!=""?userinfo.name.charAt(0):name}{sl!=null&&userinfo.name!=""?userinfo.name.charAt(sl+1):userinfo.name.charAt(1)}</Avatar>}
                  {userinfo.img&&<Avatar sx={{ bgcolor: deepPurple[500], width: 50, height: 50 }} alt="user image" src={`${userinfo.img}`}/>}

                  </div>}
                 { dropdown && <div className="sticky top-0 z-30">
                <div className="absolute lg:right-8 bg-white shadow-lg lg:top-4 rounded-md px-5 w-44 py-4 z-30 sm:top-0 hidden lg:block" onMouseLeave={()=>{
                  setDropdown(false)
                }}>
                  <span
                    onClick={() => {
                      setDropdown(false);
                    }}
                    className="absolute top-0 right-2 cursor-pointer text-2xl text-purple-500"
                  >
                    <>
                      <AiFillCloseCircle />
                    </>
                  </span>
                  <Link href={"/components/Profile"}>
                    <li className="py-1 text-base hover:text-pink-700 list-none font-bold flex">
                      <MdManageAccounts className="mt-1 mx-2" />
                      My Profile
                    </li>
                  </Link>
                  <Link href={"/components/MyTicket"}>
                    <li className="py-1 text-base hover:text-pink-700 list-none font-bold flex">
                      
                      <IoTicket className="mt-1 mx-2"/>
                      My Tickets
                    </li>
                  </Link>

                  <Link href={"/components/MyEvent"}>
                    <li className="py-1 text-base hover:text-pink-700 list-none font-bold flex">
                      <BsCalendar2EventFill className="mt-1 mx-2"/>
                      My Events
                    </li>
                  </Link>

                  <li
                    onClick={logout}
                    className="py-1 text-base hover:text-pink-700 list-none font-bold flex"
                  >
                    <BiLogOut className="mt-1 mx-2" />
                    Logout
                  </li>
                </div>
                </div>}
               
              
             
            </div>
            
          </div>
          
        </div>
        {user&&<div className="lg:mx-10  sm:mx-2 absolute right-20 lg:hidden" 
                onMouseEnter={()=>{
                  setDropdown(true);
                }}
                
                >
                 {!userinfo.img&&<Avatar sx={{ bgcolor: deepPurple[500]}}>{userinfo.name!=""?userinfo.name.charAt(0):name}{sl!=null&&userinfo.name!=""?userinfo.name.charAt(sl+1):userinfo.name.charAt(1)}</Avatar>}
                  {userinfo.img&&<Avatar sx={{ bgcolor: deepPurple[500]}} alt="user image" src={`${userinfo.img}`}/>}
                  </div>}
                 { dropdown && <div className="sticky top-0 z-30">
                <div className="absolute right-24 bg-white shadow-lg top-4 rounded-md px-5 w-44 py-4 z-30 block lg:hidden" onMouseLeave={()=>{
                  setDropdown(false)
                }}>
                  <span
                    onClick={() => {
                      setDropdown(false);
                    }}
                    className="absolute top-0 right-2 cursor-pointer text-2xl text-purple-500"
                  >
                    <>
                      <AiFillCloseCircle />
                    </>
                  </span>
                  <Link href={"/components/Profile"}>
                    <li className="py-1 text-base hover:text-pink-700 list-none font-bold flex">
                      <MdManageAccounts className="mt-1 mx-2" />
                      My Profile
                    </li>
                  </Link>
                  <Link href={"/components/MyTicket"}>
                    <li className="py-1 text-base hover:text-pink-700 list-none font-bold flex">
                      
                      <IoTicket className="mt-1 mx-2"/>
                      My Tickets
                    </li>
                  </Link>

                  <Link href={"/components/MyEvent"}>
                    <li className="py-1 text-base hover:text-pink-700 list-none font-bold flex">
                      <BsCalendar2EventFill className="mt-1 mx-2"/>
                      My Events
                    </li>
                  </Link>

                  <li
                    onClick={logout}
                    className="py-1 text-base hover:text-pink-700 list-none font-bold flex"
                  >
                    <BiLogOut className="mt-1 mx-2" />
                    Logout
                  </li>
                </div>
                </div>}
      </nav>
      
    </>
  );
};

export default Navbar;
