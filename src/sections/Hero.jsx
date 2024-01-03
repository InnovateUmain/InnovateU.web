"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import { Particle } from "../components";

const Hero = () => {
  const bgAnimate = {
    hidden: {
      clipPath: "polygon(21% 27%, 77% 26%, 77% 77%, 21% 77%)",
    },
    show: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        ease: "easeInOut",
        duration: 0.2,
        delay: 1,
      },
    },
  };
  const textAnimate1 = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
        staggerChildren: 0.4,
        delayChildren: 1,
      },
    },
  };
  const textAnimate2 = {
    hidden: {
      x: 0,
    },
    show: (i) => ({
      x: i,
      transition: {
        ease: "easeOut",
        duration: 0.8,
      },
    }),
  };
  const imageAnimate = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.6,
        delayChildren: 2.0,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };
  const imageAnimateChild = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeInOut",
      },
    },
  };
  const navAnimate = {
    hidden: {
      y: "-110%",
    },
    show: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 2,
      },
    },
  };
  const textParagraph = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 2.8,
      },
    },
  };

  return (
    <main className=" h-screen px-4 overflow-hidden">
      <motion.div
        className="absolute w-screen h-screen z-0"
        variants={bgAnimate}
        initial="hidden"
        animate="show"
      >
        <Image
          src="/planet-01.png"
          alt="background"
          fill
          sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw"
          priority={true}
          className="flex flex-col justify-center w-screen object-cover brightness-50"
        />
      </motion.div>

      <motion.nav
        className="flex justify-between items-center text-white relative z-10 pt-4"
        variants={navAnimate}
        initial="hidden"
        animate="show"
      >
        <div
          className={`text-xl text-yellow-200 font-bold underline pacifico-font`}
        >
          InnovateU
        </div>
      </motion.nav>
      <div className="relative top-[30px]">
        <motion.div
          className="relative left-[25%]"
          variants={textAnimate1}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className={`text-9xl text-[#eaeaea] lowercase tracking-tighter font-semibold z-10 pacifico-font`}
            variants={textAnimate2}
            custom={-150}
          >
            INSPIRE.EDUCATE.
          </motion.h1>
        </motion.div>

        <motion.div
          className="relative left-[25%]"
          variants={textAnimate1}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-9xl text-yellow-200 font-semibold tracking-tighter z-10"
            variants={textAnimate2}
            custom={100}
          >
            EMPOWER.
          </motion.h1>
          <motion.p
            className="absolute top-36 left-20 z-20 w-[500px] text-justify leading-5 text-[#eaeaea] text-xs font-medium"
            variants={textParagraph}
            initial="hidden"
            animate="show"
          >
            <span className="text-yellow-200">
              This is a community which provides free hands-on training in
              various fields of computer science and have an inclusive community
              focusing on a learn by doing approach.
            </span>{" "}
            Programming open-source community collaboratively develop, share,
            and improve software, fostering innovation, transparency, and
            collective problem-solving in a collaborative and inclusive
            environment
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        className="flex gap-4 absolute mt-40 right-28"
        variants={imageAnimate}
        initial="hidden"
        whileInView="show"
        animate="show"
      >
        <motion.div
          className="relative w-[300px] h-[200px]"
          variants={imageAnimateChild}
        >
          <div className="flex items-center space-x-10"></div>
          <div className="z-10 space-x-6">
            <motion.button
              className="relative rounded-md border-2 font-medium border-purple-600 bg-transparent py-5.5 px-5 uppercase text-purple-600 transition-colors hover:text-white"
              whileHover={{
                scale: 1.1,
              }}
            >
              <img
                src="/events-logo.png"
                alt="headset"
                className="w-[30px] h-[30px] object-contain mr-2"
              />
              <span className="font-bold text-[18px]">Events</span>
              <div className="button-before"></div>
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          className="relative w-[300px] h-[200px]"
          variants={imageAnimateChild}
        >
          <div className="z-10 space-x-6">
          <motion.button
              className="relative rounded-md border-2 font-medium border-purple-600 bg-transparent py-5.5 px-5 uppercase text-purple-600 transition-colors hover:text-white"
              whileHover={{
                scale: 1.1,
              }}
            >
              <img
                src="/join-logo.png"
                alt="headset"
                className="w-[30px] h-[30px] object-contain mr-2"
              />
              <span className="font-bold text-[18px]">Join</span>
              <div className="button-before"></div>
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          className="relative w-[300px] h-[200px]"
          variants={imageAnimateChild}
        >
          <div className="z-10 space-x-6">
          <motion.button
              className="relative rounded-md border-2 font-medium border-purple-600 bg-transparent py-5.5 px-5 uppercase text-purple-600 transition-colors hover:text-white"
              whileHover={{
                scale: 1.1,
              }}
            >
              <img
                src="/course-logo.png"
                alt="headset"
                className="w-[30px] h-[30px] object-contain mr-2"
              />
              <span className="font-bold text-[18px]">Courses</span>
              <div className="button-before"></div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Hero;
