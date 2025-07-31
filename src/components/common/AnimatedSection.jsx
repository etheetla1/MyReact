import { motion } from "framer-motion";
import { useAnimations } from "../../hooks/useAnimations";

export const AnimatedSection = ({ 
  children, 
  delay = 0, 
  direction = "fadeIn", 
  className = "",
  viewport = { once: true },
  ...props 
}) => {
  const animations = useAnimations();
  
  const getVariant = () => {
    switch (direction) {
      case "slideLeft":
        return animations.slideLeft(delay);
      case "slideRight":
        return animations.slideRight(delay);
      case "container":
        return animations.container(delay);
      case "fadeInUp":
        return animations.fadeInUp(delay);
      default:
        return animations.fadeIn(delay);
    }
  };

  return (
    <motion.div
      variants={getVariant()}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
