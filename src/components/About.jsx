import { ABOUT_TEXT } from "../constants";
import { PageHeader, AnimatedSection, OptimizedImage, Footer } from "./common";
import { S3_IMAGES } from "../constants/s3";
import { theme } from "../styles/theme";
import { cn } from "../lib/utils";

const About = () => {
  // Split the about text into paragraphs for better formatting
  const paragraphs = ABOUT_TEXT.split('\n\n');

  return (
    <div className={theme.layout.page}>
      <div className={theme.layout.container}>
        <PageHeader
          title="About Me"
          subtitle="Get to know the person behind the code"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text Content */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                direction="slideLeft"
              >
                <p className={cn(theme.typography.body, "leading-relaxed")}>
                  {paragraph}
                </p>
              </AnimatedSection>
            ))}

            {/* Skills Highlight */}
            <AnimatedSection delay={0.8} direction="slideLeft">
              <div className="pt-8">
                <h3 className={cn(theme.typography.heading, "mb-6 text-white")}>
                  Core Expertise
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Full-Stack Development",
                    "Cloud Architecture",
                    "DevOps & Automation",
                    "AI/ML Integration",
                    "System Design",
                    "Performance Optimization"
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg",
                        theme.components.card
                      )}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className={theme.typography.bodySmall}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Image */}
          <AnimatedSection delay={0.4} direction="slideRight">
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <OptimizedImage
                  src={S3_IMAGES.profile}
                  alt="Elisha Theetla - About"
                  className={cn(
                    "w-80 h-96 lg:w-96 lg:h-[500px] object-cover rounded-lg",
                    "grayscale hover:grayscale-0",
                    theme.animations.transitionSlow
                  )}
                />
                {/* Decorative border */}
                <div className="absolute -inset-4 border border-white/20 rounded-lg -z-10" />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Education & Certifications */}
        <AnimatedSection delay={1.0}>
          <div className="mt-20 pt-16 border-t border-white/10">
            <h3 className={cn(theme.typography.heading, "mb-8 text-center text-white")}>
              Education & Background
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className={cn("p-6 rounded-lg", theme.components.card)}>
                <h4 className={cn(theme.typography.subheading, "text-white mb-2")}>
                  Master's in Computer Science
                </h4>
                <p className={theme.typography.bodySmall}>
                  Georgia State University
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Current
                </p>
              </div>
              <div className={cn("p-6 rounded-lg", theme.components.card)}>
                <h4 className={cn(theme.typography.subheading, "text-white mb-2")}>
                  BBA in Computer Information Systems
                </h4>
                <p className={theme.typography.bodySmall}>
                  Georgia State University
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Completed
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <Footer />
      </div>
    </div>
  );
};

export default About;
