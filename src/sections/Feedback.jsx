"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { fadeIn, staggerContainer, zoomIn } from "../utils/motion";
import { InsightCard, TitleText, TypingText } from '../components';


const Feedback = () => (
  <section className={`${styles.paddings}`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| Testimonials" textStyles="text-center" />
      <TitleText title={<>Word from our users</>} textStyles="text-center" />
    </motion.div>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-10`}
    >

      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-[0.5] lg:max-w-[400px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
      >
        <div className="feedback-gradient" />
        <div>
          <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-white">
            Josh Tyson
          </h4>
          <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22.68px] leading-[16.68px] text-white">
            Product Manager <br /> Capsule
          </p>
        </div>
        <motion.div
          variants={zoomIn(0.4, 1)}
          className="lg:block hidden absolute -right-[-6%] top-[3%]"
        >
          <img
            src="/person-1.webp"
            alt="stamp"
            className="w-[121px] h-[121px] object-contain rounded-full"
          />
        </motion.div>
        <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-white">
          “The innovationU website is a collaborative oasis! The platform links developers all over the world with ease. Learning and sharing are enjoyable because of the encouraging group and the worthwhile projects I was able to participate in.”
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-[0.5] lg:max-w-[400px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
      >
        <div className="feedback-gradient" />
        <div>
          <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-white">
            Luisa
          </h4>
          <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22.68px] leading-[16.68px] text-white">
          Senior Director of <br/> Operations | Redhat
          </p>
        </div>
        <motion.div
          variants={zoomIn(0.4, 1)}
          className="lg:block hidden absolute -right-[-6%] top-[3%]"
        >
          <img
            src="/person-2.webp"
            alt="stamp"
            className="w-[121px] h-[121px] object-contain rounded-full"
          />
        </motion.div>
        <p className="mt-[24px] font-normal sm:text-[20px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-white">
          “Excellent work on the open-source community webpage! There are a ton of projects and prospects for collaboration there. Both novice and seasoned developers are encouraged to participate and progress together by the friendly environment and diversified community.”
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-[0.5] lg:max-w-[400px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
      >
        <div className="feedback-gradient" />
        <div>
          <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-white">
          Alisa Williams
          </h4>
          <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22.68px] leading-[16.68px] text-white">
          Entrepreneur <br/> Happy customer
          </p>
        </div>
        <motion.div
          variants={zoomIn(0.4, 1)}
          className="lg:block hidden absolute -right-[-6%] top-[3%]"
        >
          <img
            src="/person-3.webp"
            alt="stamp"
            className="w-[121px] h-[121px] object-contain rounded-full"
          />
        </motion.div>
        <p className="mt-[24px] font-normal sm:text-[20px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-white">
          “For me, finding this open-source community website was pivotal. The projects span a wide range of interests, and the collaborative spirit is contagious. This platform offers an ideal environment for learning and contributing, regardless of your level of experience.”
        </p>
      </motion.div>

    </motion.div>
  </section>
);

export default Feedback;
