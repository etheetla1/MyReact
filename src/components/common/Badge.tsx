import { cn } from "../../lib/utils";
import { theme } from "../../styles/theme";

export const Badge = ({ 
  children, 
  variant = "outline", 
  className = "",
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "filled":
        return "bg-white text-black";
      case "ghost":
        return "bg-white/5 text-gray-300";
      default:
        return theme.components.badge;
    }
  };

  return (
    <div 
      className={cn(getVariantStyles(), className)}
      {...props}
    >
      {children}
    </div>
  );
};
