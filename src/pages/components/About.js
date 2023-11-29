/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className='bg-gradient-to-t from-slate-900 via-purple-900 to-gray-900' id='about'>
            <section className="flex items-center  font-poppins ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <motion.div className="px-4 mb-10 md:text-center md:mb-20" initial={{y:200,opacity:0}} whileInView={{y:0,opacity:1}}
            transition={{duration:1}}
            >
                <p className="mb-2 text-lg font-semibold text-yellow-500 dark:text-gray-400">
                    About Us
                </p>
                <h2 className="pb-2 text-2xl font-bold md:text-4xl text-gray-300">
                    What we do
                </h2>
                <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded md:mx-auto md:mb-14">
                    <div className="flex-1 h-2 bg-yellow-200">
                    </div>
                    <div className="flex-1 h-2 bg-yellow-400">
                    </div>
                    <div className="flex-1 h-2 bg-yellow-300">
                    </div>
                </div>
            </motion.div>
            <div className="flex flex-wrap ">
                <motion.div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0" initial={{x:-200,opacity:0}} whileInView={{x:0,opacity:1}} 
                transition={{duration:1}}
                >
                    <img src="https://wemakedevs.org/static/media/aboutus.02f2915b9ae736e9ef8a.png" alt=""
                        className="relative z-40 object-cover w-full h-96" />
                </motion.div>
                <motion.div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 " initial={{x:200,opacity:0}} whileInView={{x:0,opacity:1}} 
                transition={{duration:1}}>
                    <h2
                        className="py-3 pl-2 mb-4 text-2xl font-bold  border-l-4 border-yellow-500 dark:border-yellow-400 text-gray-200">
                        We are providing a better facility
                    </h2>
                    <p className="mb-4 text-base leading-7 text-gray-200">
                    We as an open-source community collaboratively develop, share, and improve software, fostering innovation, transparency, and collective problem-solving in a collaborative and inclusive environment
                    </p>
                    <ul className="mb-10">
                        <li className="flex items-center mb-4 text-base text-gray-200">
                            <span className="mr-3 text-yellow-500 dark:text-yellow-400 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                </svg>
                            </span>
                            Get expert guidance with career, Open Source, and internships, jobs around the world.
                        </li>
                        <li className="flex items-center mb-4 text-base text-gray-200">
                            <span className="mr-3 text-yellow-500 dark:text-yellow-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                </svg>
                            </span>
                            We are also having various events weekly or monthly. Do participate in those events to make your skills enhance.
                        </li>
                        <li className="flex items-center mb-4 text-base text-gray-200">
                            <span className="mr-3 text-yellow-500 dark:text-yellow-400 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                </svg>
                            </span>
                            We provide hands-on training, mentorship for FREE and have an inclusive community.
                        </li>
                    </ul>
                    <a href="#"
                        className="px-4 py-3 text-white bg-purple-600 transition-all transform   hover:bg-purple-800     hover:text-gray-100 rounded">
                        Discover more
                    </a>
                </motion.div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default About
