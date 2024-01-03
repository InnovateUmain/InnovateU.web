"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BsChevronDown } from "react-icons/bs";
import { fadeIn } from "../utils/motion";
import { useState } from "react";

const InsightCard = ({ id, title, index, ans }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (id) => {
    setActiveIndex(id === activeIndex ? null : id);
  };
  return (
    <div>
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 1)}
        className="flex md:flex-row flex-col gap-4"
      >
        <div className="mt-12 max-w-[700px] mx-auto">
          <div className="pb-8">
            <div className="flex items-center justify-between">
              <div className="sm:text-xl text-base font-bold text-white">
                {title}
              </div>
              <BsChevronDown
                className={`${
                  id === activeIndex ? "rotate-180" : "rotate-0"
                } cursor-pointer transition-all duration-300 text-yellow-100 ml-10 font-bold`}
                onClick={() => handleClick(id)}
              />
            </div>
            <AnimatePresence>
              {id === activeIndex && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                  className="pt-4"
                >
                  <p className="text-yellow-100">
                    {ans}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsightCard;
