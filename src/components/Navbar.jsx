import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { S3_IMAGES } from "../constants/s3";

// Floating + entrance for logo
const logoFloat = {
  initial: { opacity: 0, x: -60, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    y: [0, -4, 0],
  },
  transition: {
    x: { duration: 0.6, ease: "easeOut" },
    opacity: { duration: 0.4 },
    scale: { type: "spring", stiffness: 300, damping: 20 },
    y: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Floating + entrance for icons
const iconFloat = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    y: [0, -4, 0],
  },
  transition: {
    x: { duration: 0.6, delay, ease: "easeOut" },
    opacity: { duration: 0.4, delay },
    y: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

const iconPulse = (color) => ({
  animate: {
    color: [color, "#ffffff", color],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      {/* Logo */}
      <motion.div
        className="flex-shrink-0 items-center"
        initial={logoFloat.initial}
        animate={logoFloat.animate}
        transition={logoFloat.transition}
      >
        <img className="mx-3 w-20" src={S3_IMAGES.logo} alt="logo" />
      </motion.div>

      {/* Name Centered */}
      <div className="flex-1 flex justify-center">
        <span className="text-4xl lg:text-6xl font-thin tracking-tight font-serif text-gray-900 select-none">
          Elisha Theetla
        </span>
      </div>

      {/* Social Icons */}
      <div className="m-8 flex items-center justify-center gap-6 text-2xl">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/elisha-theetla-22a6121b5/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            initial={iconFloat(0).initial}
            animate={{
              ...iconFloat(0).animate,
              ...iconPulse("#0077B5").animate,
            }}
            transition={{
              ...iconFloat(0).transition,
              ...iconPulse("#0077B5").transition,
            }}
            whileHover={{
              scale: 1.2,
              color: "#0077B5",
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
          >
            <FaLinkedin />
          </motion.div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            initial={iconFloat(0.1).initial}
            animate={{
              ...iconFloat(0.1).animate,
              ...iconPulse("#888").animate,
            }}
            transition={{
              ...iconFloat(0.1).transition,
              ...iconPulse("#888").transition,
            }}
            whileHover={{
              scale: 1.2,
              color: "#888",
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
          >
            <FaGithub />
          </motion.div>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/est1_221/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            initial={iconFloat(0.2).initial}
            animate={{
              ...iconFloat(0.2).animate,
              ...iconPulse("#E1306C").animate,
            }}
            transition={{
              ...iconFloat(0.2).transition,
              ...iconPulse("#E1306C").transition,
            }}
            whileHover={{
              scale: 1.2,
              color: "#E1306C",
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
          >
            <FaInstagram />
          </motion.div>
        </a>

        {/* Twitter / X */}
        <a
          href="https://x.com/ElishaSuhas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            initial={iconFloat(0.3).initial}
            animate={{
              ...iconFloat(0.3).animate,
              ...iconPulse("#1DA1F2").animate,
            }}
            transition={{
              ...iconFloat(0.3).transition,
              ...iconPulse("#1DA1F2").transition,
            }}
            whileHover={{
              scale: 1.2,
              color: "#1DA1F2",
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
          >
            <FaSquareXTwitter />
          </motion.div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;