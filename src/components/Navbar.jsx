import logo from "../assets/logo.png";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

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
        <img className="mx-3 w-20" src={logo} alt="logo" />
      </motion.div>

      {/* Social Icons */}
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <motion.div
          initial={iconFloat(0).initial}
          animate={iconFloat(0).animate}
          transition={iconFloat(0).transition}
        >
          <FaLinkedin />
        </motion.div>
        <motion.div
          initial={iconFloat(0.1).initial}
          animate={iconFloat(0.1).animate}
          transition={iconFloat(0.1).transition}
        >
          <FaGithub />
        </motion.div>
        <motion.div
          initial={iconFloat(0.2).initial}
          animate={iconFloat(0.2).animate}
          transition={iconFloat(0.2).transition}
        >
          <FaInstagram />
        </motion.div>
        <motion.div
          initial={iconFloat(0.3).initial}
          animate={iconFloat(0.3).animate}
          transition={iconFloat(0.3).transition}
        >
          <FaSquareXTwitter />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;