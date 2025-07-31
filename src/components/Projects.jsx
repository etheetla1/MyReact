import { PROJECTS } from "../constants";
import { PageHeader, AnimatedSection, OptimizedImage, Footer } from "./common";
import { theme } from "../styles/theme";
import { cn } from "../lib/utils";

const Projects = () => {
  return (
    <div className={theme.layout.page}>
      <div className={theme.layout.container}>
        <PageHeader
          title="Projects"
          subtitle="A showcase of my work in full-stack development, cloud architecture, and automation"
        />

        <div className="space-y-16">
          {PROJECTS.map((project, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.2}
              direction={index % 2 === 0 ? "slideLeft" : "slideRight"}
            >
              <div className={theme.layout.grid.projects}>
                {/* Project Image */}
                <div className="w-full lg:w-1/4 flex justify-center">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-40 h-40 lg:w-48 lg:h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Project Details */}
                <div className="w-full max-w-xl lg:w-3/4 space-y-4">
                  <h3 className={cn(theme.typography.subheading, "text-white mb-3")}>
                    {project.title}
                  </h3>
                  
                  <p className={cn(theme.typography.body, "leading-relaxed")}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={cn(
                          "px-3 py-1 text-xs font-medium rounded-full",
                          "bg-white/10 text-gray-300 border border-white/20",
                          "hover:bg-white/20 hover:text-white transition-all duration-300"
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Link */}
                  {project.link && (
                    <div className="pt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center text-sm font-medium",
                          "text-gray-300 hover:text-white transition-colors duration-300",
                          "border-b border-gray-600 hover:border-white"
                        )}
                      >
                        View Project
                        <svg 
                          className="ml-2 w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Projects;
