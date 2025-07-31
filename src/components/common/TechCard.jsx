import { motion } from "framer-motion";
import { useAnimations } from "../../hooks/useAnimations";
import { theme } from "../../styles/theme";
import { cn } from "../../lib/utils";

export const TechCard = ({ 
  icon, 
  label, 
  color, 
  index = 0,
  className = "",
  ...props 
}) => {
  const animations = useAnimations();

  return (
    <motion.div
      custom={index}
      variants={animations.itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className={cn("group relative", className)}
      {...props}
    >
      <div className={cn(
        "flex flex-col items-center space-y-4",
        theme.spacing.card,
        theme.components.card
      )}>
        <div 
          className={cn(
            "text-4xl lg:text-5xl transition-all duration-300",
            theme.animations.hover.scaleSmall
          )}
          style={{ color }}
        >
          {icon}
        </div>
        <span className={cn(
          theme.typography.bodySmall,
          "group-hover:text-white transition-colors duration-300 tracking-wider text-center"
        )}>
          {label}
        </span>
      </div>
    </motion.div>
  );
};
