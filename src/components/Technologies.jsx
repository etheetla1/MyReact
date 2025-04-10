import { motion } from "framer-motion";
import {
  RiReactjsLine, RiJavascriptFill, RiHtml5Fill, RiCss3Fill,
} from "react-icons/ri";
import {
  TbBrandNextjs, TbBrandKotlin,
} from "react-icons/tb";
import {
  SiMongodb, SiTypescript, SiPython, SiTailwindcss, SiMicrosoftazure,
} from "react-icons/si";
import { DiRedis, DiJava } from "react-icons/di";
import { FaNodeJs, FaAws } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";

const floatTransition = {
  repeat: Infinity,
  repeatType: "reverse",
  duration: 2,
  ease: "easeInOut",
};

const floatVariant = {
  animate: {
    y: [0, -10],
  },
};

const slideIn = (delay = 0) => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.5,
      type: "tween",
    },
  },
});

const categories = {
  Languages: [
    { icon: <DiJava />, label: "Java", color: "#EA2D2E" },
    { icon: <TbBrandKotlin />, label: "Swift", color: "#FA7343" },
    { icon: <SiTypescript />, label: "TypeScript", color: "#3178C6" },
    { icon: <RiJavascriptFill />, label: "JavaScript", color: "#F0DB4F" },
    { icon: <RiHtml5Fill />, label: "HTML", color: "#E34C26" },
    { icon: <RiCss3Fill />, label: "CSS", color: "#2965F1" },
    { icon: <SiPython />, label: "Python", color: "#3572A5" },
  ],
  Technologies: [
    { icon: <RiReactjsLine />, label: "React", color: "#61DBFB" },
    { icon: <TbBrandNextjs />, label: "Next.js", color: "#ffffff" },
    { icon: <FaNodeJs />, label: "Node.js", color: "#3C873A" },
    { icon: <DiRedis />, label: "Redis", color: "#D82C20" },
    { icon: <SiTailwindcss />, label: "Tailwind", color: "#38BDF8" },
  ],
  Databases: [
    { icon: <GrMysql />, label: "MySQL", color: "#00758F" },
    { icon: <SiMongodb />, label: "MongoDB", color: "#47A248" },
    { icon: <BiLogoPostgresql />, label: "PostgreSQL", color: "#336791" },
  ],
  Cloud: [
    { icon: <FaAws />, label: "AWS", color: "#FF9900" },
    { icon: <SiMicrosoftazure />, label: "Azure", color: "#0089D6" },
  ],
};

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <h1 className="my-20 text-center text-4xl">Technologies</h1>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category}>
          <h2 className="my-6 text-center text-2xl text-neutral-400">{category}</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {items.map((tech, index) => (
              <motion.div
                key={index}
                title={tech.label}
                variants={slideIn(index * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.2,
                  rotate: 3,
                  transition: {
                    delay: index * 0.06,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="rounded-2xl border-4 border-neutral-800 p-4 text-5xl cursor-pointer shadow-md hover:shadow-xl"
                style={{ color: tech.color }}
              >
                <motion.div
                  variants={floatVariant}
                  animate="animate"
                  transition={floatTransition}
                >
                  {tech.icon}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Technologies;