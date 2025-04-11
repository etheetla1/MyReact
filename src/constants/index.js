import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `I’m a ver full stack developer and cloud enthusiast passionate about building secure, scalable web apps and automation solutions. With real-world experience in AWS, Node.js, React.js, and Microsoft Power Automate, I’m driven to create efficient systems that merge business logic with technical excellence.`;

export const ABOUT_TEXT = `I'm currently pursuing my Master's in Computer Science at Georgia State University, after completing a Bachelor's in Computer Information Systems. My experience spans software engineering, DevOps, automation, and data analytics — including internships at Swivl, Paces Ferry Wealth Advisors, and Georgia State. I specialize in developing cloud-native applications and streamlining workflows using tools like AWS, React.js, Node.js, Python, and Power Platform. Outside of coding, I enjoy exploring new tech, contributing to open source, and building tools that simplify everyday life.`;

export const EXPERIENCES = [
  {
    year: "Apr 2023 - Present",
    role: "Software Engineering Intern",
    company: "Swivl",
    description: `Built a secure authentication system with AWS Cognito. Optimized Node.js APIs, deployed apps on AWS EC2, and implemented CI/CD pipelines using Bitbucket. Focused on security, scalability, and monitoring.`,
    technologies: ["Node.js", "AWS Cognito", "Bitbucket Pipelines", "EC2"],
  },
  {
    year: "Aug 2024 - Dec 2024",
    role: "Process Automation Intern",
    company: "Paces Ferry Wealth Advisors",
    description: `Automated internal workflows at a $289M asset management firm using Microsoft Power Automate and Zapier. Built custom scripts in Python and JavaScript to optimize data accuracy and back-office performance.`,
    technologies: ["Python", "JavaScript", "Power Automate", "Zapier"],
  },
  {
    year: "Aug 2024 - Dec 2024",
    role: "Graduate Administrative Assistant",
    company: "GSU Office of Sponsored Programs",
    description: `Created advanced reports and managed data using Power BI and Microsoft Access. Improved decision-making through efficient reporting systems and optimized data storage solutions.`,
    technologies: ["Power BI", "Microsoft Access", "Data Visualization"],
  },
  {
    year: "Feb 2022 - May 2024",
    role: "Student Data Analyst",
    company: "GSU Office of Development",
    description: `Engineered data pipelines and generated reports for a $100M fundraising portfolio. Utilized SQL, Python, and Power BI to deliver strategic insights and improve system performance by 35–45%.`,
    technologies: ["SQL", "Python", "Power BI"],
  },
];

export const PROJECTS = [
  {
    title: "Mobile App Dev (iOS/Android)",
    image: project1,
    description:
      "Developed cross-platform mobile applications using Java, Swift, Core Data, and SQLite. Led CI/CD setup, testing, debugging, and store deployment.",
    technologies: ["Java", "Swift", "Xcode", "SQLite", "CI/CD"],
  },
  {
    title: "Bazaar – Healthy Food Everywhere",
    image: project2,
    description:
      "Created a full-stack app for locating healthy food options. Used HTML, CSS, Bootstrap for UI and optimized backend performance with Node.js and MongoDB.",
    technologies: ["HTML", "CSS", "Node.js", "MongoDB", "Express.js"],
  },
  {
    title: "Automation Workflow System",
    image: project3,
    description:
      "Designed automation workflows using Microsoft Power Automate and Zapier for internal operations. Integrated Python/JavaScript scripts for dynamic task handling.",
    technologies: ["Power Automate", "Zapier", "Python", "JavaScript"],
  },
  {
    title: "CI/CD + AWS App Deployment",
    image: project4,
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