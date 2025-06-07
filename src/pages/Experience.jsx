import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const container = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const Experience = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h1
        className="my-20 text-center text-4xl"
        variants={container(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Experience
      </motion.h1>

      {EXPERIENCES.map((experience, index) => (
        <motion.div
          key={index}
          className="mb-8 flex flex-wrap lg:justify-center"
          variants={container(index * 0.2 + 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Year */}
          <div className="w-full lg:w-1/4">
            <p className="mb-2 text-sm text-neutral-400">{experience.year}</p>
          </div>

          {/* Details */}
          <div className="w-full max-w-xl lg:w-3/4">
            <h6 className="mb-2 font-semibold">
              {experience.role} -{" "}
              <span className="text-sm text-purple-900 font-bold">
                {experience.company}
              </span>
            </h6>

            <p className="mb-4 text-neutral-400">{experience.description}</p>

            {/* Technologies */}
            <div className="flex flex-wrap">
              {experience.technologies.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className="mr-4 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800"
                  variants={container(techIndex * 0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Experience; 