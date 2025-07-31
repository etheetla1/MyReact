import { motion } from "framer-motion";
import { S3_IMAGES } from "../constants/s3";
import { AnimatedSection, Badge, OptimizedImage, Footer } from "./common";
import { useAnimations } from "../hooks/useAnimations";
import { theme } from "../styles/theme";
import { cn } from "../lib/utils";

const Hero = () => {
  const animations = useAnimations();

  const handleGetInTouch = () => {
    window.location.href = 'mailto:elishasuhas1221@gmail.com';
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className={theme.layout.container}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="space-y-8">
              {/* Experience Badge */}
              <AnimatedSection delay={0}>
                <Badge>
                  +4 YEARS OF EXPERIENCE
                </Badge>
              </AnimatedSection>

              {/* Name */}
              <AnimatedSection delay={0.2} direction="container">
                <h1 className={cn(theme.typography.hero, "leading-tight")}>
                  Elisha Theetla
                </h1>
              </AnimatedSection>

              {/* Title */}
              <AnimatedSection delay={0.4} direction="container">
                <h2 className={cn(theme.typography.heading, "text-gray-300")}>
                  Cloud-Native Full Stack Developer
                </h2>
              </AnimatedSection>

              {/* Subtext */}
              <AnimatedSection delay={0.6} direction="container">
                <p className={cn(theme.typography.body, "max-w-2xl leading-relaxed")}>
                  Creative full stack developer mainly working on cloud-native solutions, DevOps automation, AI-driven applications, and serverless architectures.
                </p>
              </AnimatedSection>

              {/* Get in Touch Button */}
              <AnimatedSection delay={0.8} direction="container">
                <button
                  onClick={handleGetInTouch}
                  className={theme.components.button.primary}
                >
                  GET IN TOUCH
                  <svg 
                    className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </AnimatedSection>
            </div>

            {/* Right: Portrait Image */}
            <motion.div
              variants={animations.imageContainer}
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <OptimizedImage
                  src={S3_IMAGES.profile}
                  alt="Elisha Theetla"
                  className={cn(
                    "w-80 h-96 lg:w-96 lg:h-[500px] object-cover",
                    "grayscale hover:grayscale-0",
                    theme.animations.transitionSlow
                  )}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={theme.layout.container}>
        <Footer />
      </div>
    </div>
  );
};

export default Hero;
