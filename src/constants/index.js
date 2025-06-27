import { S3_IMAGES } from './s3';

export const HERO_CONTENT = `Hi! I'm a full-stack developer and cloud engineer passionate about building secure, scalable, and intelligent web solutions. With experience spanning AWS, Node.js, React.js, Python, and automation platforms like Power Automate and Zapier, I specialize in merging business logic with technical precision. From architecting CI/CD pipelines to deploying apps on EC2 and designing RAG-based AI agents, I bring a product-driven mindset and a deep enthusiasm for innovation in every line of code.`;

export const ABOUT_TEXT = `I'm currently pursuing my Master's in Computer Science at Georgia State University, after completing a Bachelor's in Computer Information Systems. My experience spans software engineering, DevOps, automation, and data analytics — including internships at Swivl, Paces Ferry Wealth Advisors, and Georgia State. I specialize in developing cloud-native applications and streamlining workflows using tools like AWS, React.js, Node.js, Python, and Power Platform. I'm also passionate about building Retrieval-Augmented Generation (RAG) pipelines and intelligent agents using AWS services for real-world applications. Outside of coding, I enjoy exploring new tech, contributing to open source, and building tools that simplify everyday life.`;

export const EXPERIENCES = [
  {
    year: "April 2023 – Present",
    role: "Software Engineering Intern",
    company: "Swivl",
    description: `Designed and integrated an authentication and authorization system using AWS Cognito, enabling secure user sign-up, sign-in, and access control.\nConducted performance analysis and optimization of Node.js APIs, reducing response times and improving backend efficiency.\nBuilt CI/CD pipelines with Bitbucket Pipelines and integrated static code analysis tools to enforce code quality and automate deployments.\nDeployed applications on AWS EC2 with best practices for high availability and monitoring.`,
    technologies: ["Node.js", "AWS Cognito", "Bitbucket Pipelines", "EC2", "AWS", "CI/CD"],
    location: "Atlanta, GA"
  },
  {
    year: "August 2024 – December 2024",
    role: "Process Automation Intern",
    company: "Paces Ferry Wealth Advisors",
    description: `Automated processes and workflows using Zapier and Microsoft Power Automate for a firm managing $289.2M in assets.\nDeveloped custom Python and JavaScript scripts to reduce manual tasks and enhance data accuracy.\nStreamlined reporting in collaboration with investment advisors to improve client service delivery.`,
    technologies: ["Python", "JavaScript", "Power Automate", "Zapier", "Automation"],
    location: "Atlanta, GA"
  },
  {
    year: "August 2024 – December 2024",
    role: "Graduate Administrative Assistant",
    company: "Georgia State University – Office of Sponsored Programs",
    description: `Built reports in Power BI and Microsoft Access to support decision-making for university-sponsored projects.\nDesigned and optimized databases to ensure reliable and efficient access to project data.`,
    technologies: ["Power BI", "Microsoft Access", "Data Visualization", "Database Design"],
    location: "Atlanta, GA"
  },
  {
    year: "February 2022 – May 2024",
    role: "Student Data Analyst – Prospect Management",
    company: "GSU Office of Development",
    description: `Created data pipelines with SQL and Python to extract cloud database info and generate weekly prospect reports.\nConducted donor portfolio analysis with Power BI to support $100M fundraising operations.\nOptimized data strategies and research workflows, improving performance by 35–45%.`,
    technologies: ["SQL", "Python", "Power BI", "Data Pipelines", "Data Analysis"],
    location: "Atlanta, GA"
  },
];

export const PROJECTS = [
  {
    title: "Knowelist - Portfolio Website (2025)",
    description: "A fully serverless React + Vite portfolio site hosted on AWS S3 and delivered via CloudFront, using Route 53 for DNS. Integrated GitHub Actions for CI/CD. Features a dynamic architecture with plans for RAG-based AI chatbot and blog agent. Implemented real-time content sync from AWS and designed for seamless scaling and extensibility.",
    image: S3_IMAGES.projects.project5,
    technologies: ["React", "TailwindCSS", "AWS", "CloudFront", "S3", "GitHub Actions"],
    link: "https://www.knowelist.com"
  },
  {
    title: "Mobile App Dev (iOS/Android)",
    image: S3_IMAGES.projects.project1,
    description:
      "Developed cross-platform mobile applications using Java, Swift, Core Data, and SQLite. Led CI/CD setup, testing, debugging, and store deployment.",
    technologies: ["Java", "Swift", "Xcode", "SQLite", "CI/CD"],
  },
  {
    title: "Bazaar – Healthy Food Everywhere",
    image: S3_IMAGES.projects.project2,
    description:
      "Created a full-stack app for locating healthy food options. Used HTML, CSS, Bootstrap for UI and optimized backend performance with Node.js and MongoDB.",
    technologies: ["HTML", "CSS", "Node.js", "MongoDB", "Express.js"],
  },
  {
    title: "Automation Workflow System",
    image: S3_IMAGES.projects.project3,
    description:
      "Designed automation workflows using Microsoft Power Automate and Zapier for internal operations. Integrated Python/JavaScript scripts for dynamic task handling.",
    technologies: ["Power Automate", "Zapier", "Python", "JavaScript"],
  },
  {
    title: "CI/CD + AWS App Deployment",
    image: S3_IMAGES.projects.project4,
    description:
      "Developed and deployed secure applications on AWS EC2 with CI/CD pipelines using Bitbucket. Integrated AWS services for monitoring and identity management.",
    technologies: ["AWS", "Bitbucket", "EC2", "CI/CD", "Cognito"],
  },
];

export const CONTACT = {
  address: "Atlanta, GA",
  phoneNo: "470-507-9314",
  email: "etheetla1@student.gsu.edu",
};