import { S3_IMAGES } from "../constants/s3";
import { motion } from "framer-motion";

const container = (delay = 0) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay },
  },
});

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35 bg-white">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[60vh]">
        {/* Left: Text Block */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center px-4 lg:px-12 py-12">
          <motion.h1
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-5xl font-bold mb-2 text-gray-900 text-left"
          >
            I don't just build software. I build systems that solve.
          </motion.h1>

          <motion.div
            variants={container(0.3)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-2 mb-4"
          >
            <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
              Full Stack Developer
            </span>
            <span className="text-2xl text-gray-400 mx-1">&bull;</span>
            <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
              Architect.
            </span>
            <span className="text-2xl text-gray-400 mx-1">&bull;</span>
            <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
              Problem Solver.
            </span>
          </motion.div>

          <motion.p
            variants={container(0.2)}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-700 mb-4 text-left max-w-2xl"
          >
            I'm Elisha Theetla — a full-stack engineer and cloud specialist who transforms ideas into scalable, secure, and smart applications. Whether it's launching AI-driven solutions, automating workflows, or deploying full-stack apps with AWS and React, I bring deep curiosity, product intuition, and technical precision to every project.
          </motion.p>
          <motion.p
            variants={container(0.3)}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-700 text-left max-w-2xl"
          >
            From startup hustle to enterprise reliability — I code, architect, and automate with purpose. Let's turn your next idea into something powerful.
          </motion.p>
        </div>

        {/* Right: Profile Image (cityscape daytime) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[300px] lg:min-h-[400px] py-8">
          <img src={S3_IMAGES.profile} alt="Elisha Theetla" className="rounded-xl object-cover max-w-sm w-full h-auto shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Hero;