"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { newFeatures } from "../constants";
import { NewFeatures, TitleText, TypingText } from "../components";
import { planetVariants, staggerContainer, fadeIn } from "../utils/motion";

const WhatsNew = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8 `}
    >
      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-[0.95] flex justify-center flex-col "
      >
        <TypingText title="| Events" />
        <TitleText title={<>What is new?</>} />
        <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
          {newFeatures.map((feature) => (
            <NewFeatures key={feature.title} {...feature} />
          ))}
        </div>
        <br />
        <div className="z-10 space-x-6">
          <button className="relative border-2 font-medium border-purple-600 bg-transparent py-2.5 px-5 uppercase text-purple-600 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-purple-600 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100">
            Ongoing Event
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={planetVariants("right")}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <img
          src="/whats-new.png"
          alt="get-started"
          className="w-[90%] h-[90%] object-contain"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default WhatsNew;
