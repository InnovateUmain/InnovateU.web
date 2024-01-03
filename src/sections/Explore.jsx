"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import styles from "../styles";
import { exploreWorlds } from "../constants";
import { staggerContainer } from "../utils/motion";
import { ExploreCard, TitleText, TypingText } from "../components";

const Explore = () => {
  const [active, setActive] = useState("world-2");

  return (
    // <section className={`${styles.paddings}`} id="explore">
    //   <motion.div
    //     variants={staggerContainer}
    //     initial="hidden"
    //     whileInView="show"
    //     viewport={{ once: false, amount: 0.25 }}
    //     className={`${styles.innerWidth} mx-auto flex flex-col`}
    //   >
    //     <TypingText title="| The World" textStyles="text-center" />
    //     <TitleText
    //       title={<>Choose the world you want <br className="md:block hidden" /> to explore</>}
    //       textStyles="text-center"
    //     />
    //     <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
    //       {exploreWorlds.map((world, index) => (
    //         <ExploreCard
    //           key={world.id}
    //           {...world}
    //           index={index}
    //           active={active}
    //           handleClick={setActive}
    //         />
    //       ))}
    //     </div>
    //   </motion.div>
    // </section>
    <div className="section" id="contact">
      <br className="md:block hidden" />
      <br className="md:block hidden" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Newsroom" textStyles="text-center" />
        <TitleText
          title={<>Subscribe to our NewsLater</>}
          textStyles="text-center"
        />
      </motion.div>
      <div className="text-center max-w-[600px] mx-auto">
        <p className="text-sm leading-7 text-gray-100">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, eaque
          praesentium voluptatem possimus magnam veniam repellendus suscipit
          reiciendis quidem tenetur illo amet veritatis ipsa eius distinctio
          quia voluptatibus sint est.
        </p>
        <motion.form
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-5"
        >
          <input
            type="text"
            placeholder="Enter your email address"
            className="sm:p-3 p-2 outline-none text-sm shadow-md sm:w-72 w-60"
          ></input>
          <button className="text-sm sm:p-3 p-2 shadow-md text-black bg-purple-600 font-bold">
            Subscribe
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Explore;
