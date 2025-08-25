import { EXPERIENCES } from "../constants";
import { PageHeader, AnimatedSection, Footer } from "./common";
import { theme } from "../styles/theme";
import { cn } from "../lib/utils";

const Experience = () => {
  return (
    <div className={theme.layout.page}>
      <div className={theme.layout.container}>
        <PageHeader
          title="Experience"
          subtitle="My professional journey in software development and cloud engineering"
        />

        <div className="space-y-12">
          {EXPERIENCES.map((experience, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.2}
              direction={index % 2 === 0 ? "slideLeft" : "slideRight"}
            >
              <div className={cn(
                "relative p-8 rounded-lg",
                theme.components.card,
                "hover:scale-[1.02] transition-transform duration-300"
              )}>
                {/* Timeline indicator */}
                <div className="absolute -left-4 top-8 w-8 h-8 bg-white rounded-full border-4 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>

                {/* Experience Header */}
                <div className="mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                    <h3 className={cn(theme.typography.subheading, "text-white")}>
                      {experience.role}
                    </h3>
                    <span className={cn(
                      "text-sm font-medium px-3 py-1 rounded-full",
                      "bg-white/10 text-gray-300 border border-white/20"
                    )}>
                      {experience.year}
                    </span>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <h4 className={cn(theme.typography.body, "text-gray-300 font-medium")}>
                      {experience.company}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {experience.location}
                    </span>
                  </div>
                </div>

                {/* Experience Description */}
                <div className="mb-6">
                  {experience.description.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className={cn(theme.typography.body, "mb-3 leading-relaxed")}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Technologies */}
                <div>
                  <h5 className={cn(theme.typography.bodySmall, "text-white mb-3")}>
                    Technologies & Tools:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={cn(
                          "px-3 py-1 text-xs font-medium rounded-full",
                          "bg-white/5 text-gray-400 border border-white/10",
                          "hover:bg-white/10 hover:text-gray-300 transition-all duration-300"
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent ml-4 hidden lg:block" />
        
        <Footer />
      </div>
    </div>
  );
};

export default Experience;
