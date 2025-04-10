import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `I'm a full stack developer passionate about building cloud-native applications, with hands-on experience in AWS, Node.js, React, automation, and scalable systems. My mission is to create secure, efficient solutions that merge innovation with user-focused design.`;

export const ABOUT_TEXT = `I am a dedicated full stack developer and cloud enthusiast currently pursuing my Master's in Computer Science at Georgia State University. With a BBA in Computer Information Systems and hands-on internship experience in software engineering, automation, and DevOps, I have built and deployed secure, scalable systems using tools like AWS, React.js, Node.js, and Power Automate. My academic and professional journey has been shaped by a passion for problem-solving, efficiency, and innovation. When I’m not building things, I enjoy exploring tech trends, contributing to open source, and working on side projects.`;

export const EXPERIENCES = [
  {
    year: "2024 - Present",
    role: "Process Automation Intern",
    company: "Paces Ferry Wealth Advisors",
    description: `Automated internal processes using Zapier and Microsoft Power Automate to improve operational efficiency for a $289M asset management firm. Developed scripts in Python and JavaScript to streamline reporting workflows and improve data accuracy.`,
    technologies: ["Python", "JavaScript", "Power Automate", "Zapier"],
  },
  {
    year: "2024 - Present",
    role: "Graduate Administrative Assistant",
    company: "GSU Office of Sponsored Programs",
    description: `Managed reporting and data infrastructure projects using Power BI and Microsoft Access to optimize decision-making and ensure data integrity.`,
    technologies: ["Power BI", "Microsoft Access", "Data Analysis"],
  },
  {
    year: "2023",
    role: "Software Engineering Intern",
    company: "Swivl",
    description: `Built secure user authentication with AWS Cognito, optimized Node.js APIs, and implemented CI/CD pipelines using Bitbucket. Deployed scalable applications on AWS EC2, ensuring high availability and performance.`,
    technologies: ["AWS", "Node.js", "CI/CD", "Cognito"],
  },
  {
    year: "2022 - 2024",
    role: "Student Data Analyst",
    company: "GSU Office of Development",
    description: `Created data pipelines and analytics dashboards for a $100M fundraising portfolio using SQL, Power BI, and Python. Enhanced system performance and donor strategy with data-driven insights.`,
    technologies: ["SQL", "Power BI", "Python"],
  },
];

export const PROJECTS = [
  {
    title: "Mobile App Dev (iOS/Android)",
    image: project1,
    description:
      "Led cross-platform mobile app development using Java, Swift, and SQLite. Managed complete CI/CD pipeline and deployed production-ready builds.",
    technologies: ["Java", "Swift", "Xcode", "SQLite"],
  },
  {
    title: "Bazaar – Healthy Food Everywhere",
    image: project2,
    description:
      "A full-stack web app with a Bootstrap front-end and optimized Node.js/Express backend, enabling seamless access to healthy food resources.",
    technologies: ["HTML", "CSS", "MongoDB", "Node.js", "Express.js"],
  },
  {
    title: "3D Printed Homes Business Model",
    image: project3,
    description:
      "Pitched a working business model for 3D printed homes at Columbia’s innovation program. Integrated technical and user requirements into app mockups.",
    technologies: ["Business Dev", "Pitching", "Agile", "Prototyping"],
  },
  {
    title: "CI/CD & AWS Integration",
    image: project4,
    description:
      "Built CI/CD pipelines and deployed secure apps on AWS EC2. Leveraged AWS services for auth, performance monitoring, and scalability.",
    technologies: ["CI/CD", "AWS EC2", "Cognito", "Bitbucket Pipelines"],
  },
];

export const CONTACT = {
  address: "Atlanta, GA",
  phoneNo: "470-507-9314",
  email: "etheetla1@student.gsu.edu",
};