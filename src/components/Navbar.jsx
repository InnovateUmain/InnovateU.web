"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles";
import { navVariants } from "../utils/motion";
import { Navigation } from "./Particle";
import { useState } from "react";

const Navbar = () => {
  const [isClick, setisClick] = useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };
  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <>
        <nav className="bg-gray-600 are used rounded-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a href="/" className="text-white">
                    {/* <img src="logo.jpg" className="w-10 h-15 mx-auto"></img> */}
                    <img
                      src="/search.svg"
                      alt="search"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center space-x-4">
                  <a
                    href="/"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    About
                  </a>
                  <a
                    href="/"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Events
                  </a>
                  <a
                    href="/"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Our Speakers
                  </a>
                  <a
                    href="/"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Teams
                  </a>
                  <a
                    href="/"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    New Room
                  </a>
                  <a
                    href="/"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Join
                  </a>
                  <button
                    type="button"
                    className="flex items-center h-[12px] py-4 px-4 bg-purple-600
                    rounded-[32px] gap-[10px]"
                  >
                    <img
                      src="/partner-logo.png"
                      alt="headset"
                      className="w-[30px] h-[30px] object-contain"
                    />
                    <span className="font-bold text-[18px] text-white">
                      Partner
                    </span>
                  </button>
                </div>
              </div>
              <div className="md:hidden flex items-center">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-white  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleNavbar}
                >
                  {isClick ? (
                    <svg
                      className="h-6 w-6"
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {isClick && (
            <div className="md:hidden">
              <div className="">
                <a
                  href="/"
                  className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                >
                  About
                </a>
                <a
                  href="/"
                  className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                >
                  Events
                </a>
                <a
                  href="/"
                  className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                >
                  Our Speakers
                </a>
                <a
                  href="/"
                  className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                >
                  Teams
                </a>
                <a
                  href="/"
                  className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                >
                  New Room
                </a>
                <a
                  href="/"
                  className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                >
                  Join
                </a>
                <button
                    type="button"
                    className="flex items-center h-[12px] py-4 px-4 bg-purple-600
                    rounded-[32px] gap-[10px]"
                  >
                    <img
                      src="/partner-logo.png"
                      alt="headset"
                      className="w-[30px] h-[30px] object-contain"
                    />
                    <span className="font-bold text-[18px] text-white">
                      Partner
                    </span>
                  </button>
              </div>
            </div>
          )}
        </nav>
      </>
      {/* //   <div className="absolute w-[50%] inset-0 gradient-01" /> */}
      {/* //   <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}> */}
      {/* //     <img */}
      {/* //       src="/search.svg"
    //       alt="search"
    //       className="w-[24px] h-[24px] object-contain"
    //     />
    //     <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
    //       WELCOME INNOVATORS
    //     </h2>
    //     <a href="">
    //       <img */}
      {/* //         src="/menu.svg"
    //         alt="menu"
    //         className="w-[24px] h-[24px] object-contain"
    //       />
    //     </a>
    //   </div> */}
    </motion.nav>
  );
};

export default Navbar;
