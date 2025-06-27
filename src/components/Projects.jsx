import { PROJECTS } from "../constants";
import { motion } from "framer-motion";

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

const Projects = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h1
        className="my-20 text-center text-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          },
        }}
      >
        Projects
      </motion.h1>

      <div>
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="mb-12 flex flex-wrap lg:justify-center items-center gap-8"
          >
            {/* Left - Image */}
            <motion.div
              className="w-full lg:w-1/4 flex justify-center"
              variants={slideLeft(index * 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={project.image}
                width={150}
                height={150}
                alt={project.title}
                className="mb-6 rounded shadow-md"
              />
            </motion.div>

            {/* Right - Text */}
            <motion.div
              className="w-full max-w-xl lg:w-3/4"
              variants={slideRight(index * 0.2 + 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h6 className="mb-2 font-semibold">{project.title}</h6>
              <p className="mb-4" style={{ color: '#2C3E50' }}>{project.description}</p>

              <div className="flex flex-wrap">
                {project.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="mr-2 mt-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideRight(techIndex * 0.05 + 0.3)}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;