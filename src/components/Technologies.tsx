import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiReactjsLine, RiJavascriptFill, RiHtml5Fill, RiCss3Fill,
} from "react-icons/ri";
import {
  TbBrandNextjs, TbBrandKotlin,
} from "react-icons/tb";
import {
  SiMongodb, SiTypescript, SiPython, SiTailwindcss, SiMicrosoftazure,
  SiFramer, SiRedux, SiGraphql, SiRadixui, SiShadcnui
} from "react-icons/si";
import { DiRedis, DiJava } from "react-icons/di";
import { FaNodeJs, FaAws, FaTools } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";

import { PageHeader, AnimatedSection, TechCard, Footer } from "./common";
import { theme } from "../styles/theme";
import { cn } from "../lib/utils";

const techCategories = {
  Frontend: {
    description: "Modern frontend frameworks and libraries for building responsive, interactive web applications",
    technologies: [
      { icon: <RiReactjsLine />, label: "React", color: "#61DBFB" },
      { icon: <TbBrandNextjs />, label: "Next.js", color: "#FFFFFF" },
      { icon: <SiTypescript />, label: "TypeScript", color: "#3178C6" },
      { icon: <RiJavascriptFill />, label: "JavaScript", color: "#F0DB4F" },
      { icon: <RiHtml5Fill />, label: "HTML5", color: "#E34C26" },
      { icon: <RiCss3Fill />, label: "CSS3", color: "#2965F1" },
      { icon: <SiTailwindcss />, label: "TailwindCSS", color: "#38BDF8" },
      { icon: <SiFramer />, label: "Framer Motion", color: "#0055FF" },
      { icon: <SiRedux />, label: "Redux", color: "#764ABC" },
      { icon: <SiGraphql />, label: "GraphQL (Client)", color: "#E10098" },
      { icon: <SiRadixui />, label: "Radix UI", color: "#FFFFFF" },
      { icon: <SiShadcnui />, label: "Shadcn UI", color: "#FFFFFF" },
    ]
  },
  Backend: {
    description: "Server-side technologies and frameworks for building scalable, secure backend systems",
    technologies: [
      { icon: <FaNodeJs />, label: "Node.js", color: "#3C873A" },
      { icon: <SiPython />, label: "Python", color: "#3572A5" },
      { icon: <DiJava />, label: "Java", color: "#EA2D2E" },
      { icon: <TbBrandKotlin />, label: "Kotlin", color: "#FA7343" },
      { icon: <DiRedis />, label: "Redis", color: "#D82C20" },
    ]
  },
  "AI/ML": {
    description: "Artificial Intelligence and Machine Learning tools for building intelligent applications",
    technologies: [
      { icon: <SiPython />, label: "Python", color: "#3572A5" },
      { icon: <FaTools />, label: "TensorFlow", color: "#FF6F00" },
      { icon: <FaTools />, label: "PyTorch", color: "#EE4C2C" },
      { icon: <FaTools />, label: "OpenAI API", color: "#412991" },
    ]
  },
  Database: {
    description: "Database technologies for efficient data storage and retrieval",
    technologies: [
      { icon: <GrMysql />, label: "MySQL", color: "#00758F" },
      { icon: <SiMongodb />, label: "MongoDB", color: "#47A248" },
      { icon: <BiLogoPostgresql />, label: "PostgreSQL", color: "#336791" },
    ]
  },
  "Cloud/DevOps": {
    description: "Cloud platforms and DevOps tools for deployment and infrastructure management",
    technologies: [
      { icon: <FaAws />, label: "AWS", color: "#FF9900" },
      { icon: <SiMicrosoftazure />, label: "Azure", color: "#0089D6" },
      { icon: <FaTools />, label: "Docker", color: "#2496ED" },
      { icon: <FaTools />, label: "CI/CD", color: "#FFFFFF" },
    ]
  },
  Tools: {
    description: "Development tools and utilities for enhanced productivity",
    technologies: [
      { icon: <FaTools />, label: "Git", color: "#F05032" },
      { icon: <FaTools />, label: "VS Code", color: "#007ACC" },
      { icon: <FaTools />, label: "Figma", color: "#F24E1E" },
      { icon: <FaTools />, label: "Postman", color: "#FF6C37" },
    ]
  },
};

const Technologies = () => {
  const [activeTab, setActiveTab] = useState("Frontend");

  return (
    <div className={theme.layout.page}>
      <div className={theme.layout.container}>
        <PageHeader
          title="Tech Stack"
          subtitle="My expertise across the full technology spectrum as a Cloud-Native Full Stack Developer"
        />

        {/* Tab Navigation */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(techCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={cn(
                  theme.components.button.tab,
                  activeTab === category
                    ? theme.components.button.tabActive
                    : theme.components.button.tabInactive
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Active Category Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={theme.layout.centerContent}
        >
          {/* Category Description */}
          <AnimatedSection delay={0.4}>
            <div className="mb-12 text-center">
              <h2 className={cn(theme.typography.heading, "mb-4 text-white")}>
                {activeTab} Technologies
              </h2>
              <p className={cn(theme.typography.body, "leading-relaxed max-w-4xl mx-auto")}>
                {techCategories[activeTab].description}
              </p>
            </div>
          </AnimatedSection>

          {/* Technology Grid */}
          <div className={theme.layout.grid.responsive}>
            {techCategories[activeTab].technologies.map((tech, index) => (
              <TechCard
                key={`${activeTab}-${index}`}
                icon={tech.icon}
                label={tech.label}
                color={tech.color}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        <Footer />
      </div>
    </div>
  );
};

export default Technologies;
