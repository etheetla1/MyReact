import aboutImg from "../assets/about.jpg";
import { ABOUT_TEXT } from "../constants";
import { motion } from "framer-motion";

const container = (delay = 0) => ({
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay },
  },
});

const slideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay },
  },
});

const About = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h2
        variants={container(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="my-20 text-center text-4xl"
      >
        About <span className="text-neutral-500">Me</span>
      </motion.h2>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 lg:p-8">
          <motion.div
            variants={slideLeft(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <img className="rounded-2xl" src={aboutImg} alt="about" />
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div
            variants={slideRight(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <p className="my-2 max-w-xl py-6 text-neutral-400">{ABOUT_TEXT}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;