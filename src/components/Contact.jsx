import { CONTACT } from "../constants";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const Contact = () => {
  return (
    <div className="border-b border-neutral-900 pb-20">
      <motion.h1
        className="my-10 text-center text-4xl"
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Get in Touch
      </motion.h1>

      <motion.div
        className="text-center tracking-tighter"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p className="my-4" variants={fadeUp(0.2)}>
          {CONTACT.address}
        </motion.p>
        <motion.p className="my-4" variants={fadeUp(0.4)}>
          {CONTACT.phoneNo}
        </motion.p>
        <motion.a
          href={`mailto:${CONTACT.email}`}
          className="border-b border-neutral-500 pb-1 text-sm"
          variants={fadeUp(0.6)}
        >
          {CONTACT.email}
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Contact;