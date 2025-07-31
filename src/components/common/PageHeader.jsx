import { AnimatedSection } from "./AnimatedSection";
import { theme } from "../../styles/theme";
import { cn } from "../../lib/utils";

export const PageHeader = ({ 
  title, 
  subtitle, 
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  ...props 
}) => {
  return (
    <AnimatedSection 
      delay={0}
      className={cn("mb-16", className)}
      {...props}
    >
      <h1 className={cn(
        theme.typography.hero,
        "mb-8 text-center",
        titleClassName
      )}>
        {title}
      </h1>
      {subtitle && (
        <p className={cn(
          theme.typography.body,
          "text-center max-w-3xl mx-auto",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
};
