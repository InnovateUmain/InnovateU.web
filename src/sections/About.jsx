"use client";

import { motion } from "framer-motion";
import { TypingText, TitleText } from "../components";
import { FaDiscord } from "react-icons/fa6";
import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => {
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

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <div className="gradient-02 z-0" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <TypingText title="| About InnovateU" textStyles="text-center" />
        <TitleText title={<>What we do </>} textStyles="text-center" />
        <motion.p
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-gray-300"
        >
          <span className="font-extrabold text-white">InnovateU</span> is your
          go-to hub for{" "}
          <span className="font-extrabold text-white">
            open-source collaboration,
          </span>{" "}
          where software development thrives on innovation, transparency, and
          inclusivity. Whether you are a seasoned developer or just starting,
          join our{" "}
          <span className="font-extrabold text-white">dynamic community</span>{" "}
          for expert guidance, global opportunities, and hands-on training.
          Elevate your skills through weekly events, free mentorship, and a
          commitment to collective problem-solving. Let`s{" "}
          <span className="font-extrabold text-white">shape</span> the future of
          open source together!
        </motion.p>

        <motion.img
          variants={fadeIn("up", "tween", 0.3, 1)}
          src="/arrow-down.svg"
          alt="arrow down"
          className="w-[18px] h-[28px] object-contain mt-[28px]"
        />
      </motion.div>
      <br></br>
      <div className="z-10 space-x-6 flex items-center justify-center gap-10 flex-wrap">
        <motion.button
          className=" rounded-md font-medium border-red-700  py-7.5 px-6  text-red-700 transition-colors hover:text-black"
          whileHover={{
            scale: 1.1,
          }}
        >
        <a href="#"
    class="inline-flex items-center py-2 px-4 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white rounded-md transition duration-300">
    <svg class="w-8 h-8 fill-current mr-2" viewBox="0 0 24 24">
        <path
            d="M21.9 5.9c-.2-.7-.7-1.2-1.4-1.4C18.3 4 12 4 12 4s-6.3 0-8.5.5c-.7.2-1.2.7-1.4 1.4C2 8.1 2 12 2 12s0 3.9.5 5.1c.2.7.7 1.2 1.4 1.4 2.2.5 8.5.5 8.5.5s6.3 0 8.5-.5c.7-.2 1.2-.7 1.4-1.4.5-1.2.5-5.1.5-5.1s0-3.9-.5-5.1zM9.5 15.5V8.5l6.5 3z" />
    </svg>
    <span className="font-bold text-[18px] hover:text-black">
            YouTube{" "}
          </span>
</a>
         

          <div className="button-before"></div>
        </motion.button>

        <motion.button
          className="relative rounded-md border-2 font-medium  bg-white py-2 px-5  text-blue-600 transition-colors hover:text-black flex justify-center items-center"
          whileHover={{
            scale: 1.1,
          }}
        >
         <svg class="w-5 h-5 fill-current text-blue-600" role="img" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <g><path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path></g>
          </svg>
          <span className="font-bold text-[18px] mx-2">Linkedin</span>
          <div className="button-before"></div>
        </motion.button>
        <motion.button
          className="relative rounded-md border-2 font-medium border-purple-600 bg-white py-2 px-5  text-purple-600 transition-colors hover:text-black flex justify-center items-center"
          whileHover={{
            scale: 1.1,
          }}
        >
          <FaDiscord className="mx-2 text-purple-600 text-2xl"/>
          <span className="font-bold text-[18px]">Discord</span>
          <div className="button-before"></div>
        </motion.button>
      </div>
    </section>
  );
};

export default About;
