import { ABOUT_TEXT } from "../constants";
import { PageHeader, AnimatedSection, OptimizedImage, Footer, SEOHead } from "./common";
import { S3_IMAGES, S3_DOCUMENTS } from "../constants/s3";
import { theme } from "../styles/theme";
import { cn } from "../lib/utils";
import DocumentCardSimple from "./DocumentCardSimple";

const About = () => {
  // Split the about text into paragraphs for better formatting
  const paragraphs = ABOUT_TEXT.split('\n\n');

  return (
    <>
      <SEOHead 
        title="About Me"
        description="Learn about Elisha Theetla, a full-stack developer and cloud engineer with expertise in AWS, React, Node.js, Python, and AI-powered solutions. Currently pursuing Master's in Computer Science at Georgia State University."
        keywords="About Elisha Theetla, Full Stack Developer Background, Cloud Engineer Experience, Georgia State University, Computer Science, AWS Expert"
        url="/about"
      />
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

        {/* Documents & Credentials */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <h3 className={cn(theme.typography.heading, "mb-4 text-center text-white")}>
            Documents & Credentials
          </h3>
          <p className={cn(theme.typography.bodySmall, "mb-12 text-center max-w-2xl mx-auto")}>
            Professional qualifications and detailed background information
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Resume Card - Outline Button Style */}
            <DocumentCardSimple
              title="Professional Resume"
              description="Comprehensive overview of my experience, skills, and achievements in software development and cloud engineering."
              documentUrl={S3_DOCUMENTS.resume}
              fileName="ElishaTheetla-Resume-2024.pdf"
              type="resume"
              buttonStyle="outline"
            />
            
            {/* AWS Certification Card - Outline Button Style */}
            <DocumentCardSimple
              title="AWS Cloud Practitioner"
              description="Official AWS certification demonstrating foundational cloud computing knowledge and best practices."
              documentUrl={S3_DOCUMENTS.awsCertification}
              fileName="AWS-Cloud-Practitioner-Certificate.pdf"
              type="certificate"
              buttonStyle="outline"
            />
          </div>
        </div>

        {/* Education & Background */}
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
    </>
  );
};

export default About;
