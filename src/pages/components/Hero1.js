import React from "react";
import Link from "next/link";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaMapLocationDot, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";
const Hero1 = () => {
  return (
    <div className="overflow-hidden flex justify-center">
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Lilita+One&display=swap");
          .herofont {
            font-family: "Lilita One", sans-serif;
          }
          .dt {
            font-family: "Roboto", sans-serif;
          }
          @media screen and (max-width: 416px) {
            .dt1 {
              font-family: "Roboto", sans-serif;
              font-size: 16px;
            }
          }
        `}
      </style>

      <section className=" bg-opacity-30 py-24 lg:py-24 ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <p className="text-base font-semibold tracking-wider text-yellow-400 uppercase navfont mx-4">
                A Community for learners
              </p>
              <h1 className="mt-4 text-4xl font-bold text-white lg:mt-8 sm:text-6xl xl:text-8xl navfont">
                Connect &amp; learn from the experts
              </h1>
              <p className="mt-4 text-base text-white lg:mt-8 sm:text-xl">
                Grow your career fast with right mentor.
              </p>
              <Link href={"/Signup"}>
              <motion.button
                 whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-purple-600 rounded-full lg:mt-16 hover:bg-purple-800 w-auto sm:w-auto md:w-auto lg:w-auto xl:w-auto "
                role="button"
              >
                Join Now
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.button>
              </Link>
              <Link href={"/Event"}>
              <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-purple-600 rounded-full lg:mt-16 hover:bg-purple-800  mx-4"
                role="button"
              >
                Events
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.button>
              </Link>
            </motion.div>

            <div className="overflow-hidden">
              <motion.img
               initial={{ opacity: 0, x: 300 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ type: "spring", stiffness: 100 }}
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero1;
