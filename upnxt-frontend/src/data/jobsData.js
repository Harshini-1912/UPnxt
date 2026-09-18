export const JOBS = [
  {
    id: "1",
    company: "Nova Systems",
    industry: "Technology",
    initial: "N",
    title: "Backend Engineer",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "3–5 years",
    salary: "₹12L – ₹18L",
    match: 92,
    posted: "2 days ago",
    applicants: "48 applicants",

    description:
      "Nova Systems is looking for a Backend Engineer to help build reliable, scalable, and high-performance services powering modern digital products.",

    overview: [
      "Design, develop, and maintain scalable backend services and APIs.",
      "Build clean and maintainable solutions using modern engineering practices.",
      "Collaborate with frontend engineers, product managers, and designers.",
      "Improve application performance, reliability, and security.",
    ],

    responsibilities: [
      "Design and develop robust REST APIs and backend services.",
      "Write clean, efficient, and maintainable production-quality code.",
      "Collaborate with cross-functional teams to deliver new features.",
      "Optimize databases, services, and application performance.",
      "Participate in code reviews and technical discussions.",
    ],

    requirements: [
      "Strong knowledge of Java and object-oriented programming.",
      "Experience with Spring Boot and REST API development.",
      "Understanding of SQL databases and data modeling.",
      "Knowledge of Git and collaborative development workflows.",
      "Strong problem-solving and debugging skills.",
    ],

    skills: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "SQL",
      "MySQL",
      "Git",
      "Microservices",
    ],

    benefits: [
      "Competitive compensation",
      "Flexible work environment",
      "Learning and development budget",
      "Health and wellness benefits",
      "Career growth opportunities",
    ],

    visual: {
      node1: "SERVER",
      node2: "DATABASE",
      node3: "API",
      node4: "JAVA",
      center: "BACKEND",
    },
  },

  {
    id: "2",
    company: "Arc Labs",
    industry: "AI & Data",
    initial: "A",
    title: "Software Engineer",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "1–3 years",
    salary: "₹10L – ₹16L",
    match: 86,
    posted: "1 day ago",
    applicants: "36 applicants",

    description:
      "Arc Labs is looking for a Software Engineer to build intelligent products and scalable engineering solutions.",

    overview: [
      "Develop reliable software solutions for intelligent digital products.",
      "Write clean and maintainable application code.",
      "Work closely with product and engineering teams.",
      "Improve application quality, performance, and scalability.",
    ],

    responsibilities: [
      "Develop and maintain software applications.",
      "Design reusable and maintainable components.",
      "Collaborate with engineering and product teams.",
      "Debug issues and improve application performance.",
      "Participate in code reviews and technical discussions.",
    ],

    requirements: [
      "Strong programming fundamentals.",
      "Knowledge of Java, Python, or similar languages.",
      "Understanding of databases and APIs.",
      "Familiarity with Git and software development workflows.",
      "Good problem-solving skills.",
    ],

    skills: [
      "Java",
      "Python",
      "REST APIs",
      "SQL",
      "Git",
      "Data Structures",
      "Cloud",
    ],

    benefits: [
      "Competitive compensation",
      "Hybrid work environment",
      "Learning opportunities",
      "Health benefits",
      "Career development",
    ],

    visual: {
      node1: "AI",
      node2: "DATA",
      node3: "API",
      node4: "PYTHON",
      center: "SOFTWARE",
    },
  },

  {
    id: "3",
    company: "Vertex",
    industry: "Product",
    initial: "V",
    title: "Frontend Engineer",
    location: "Remote",
    type: "Full-time",
    experience: "2–4 years",
    salary: "₹9L – ₹15L",
    match: 84,
    posted: "3 days ago",
    applicants: "29 applicants",

    description:
      "Vertex is looking for a Frontend Engineer to create polished user experiences and scalable interfaces for modern web products.",

    overview: [
      "Build responsive and accessible user interfaces.",
      "Create reusable frontend components.",
      "Collaborate with designers and backend engineers.",
      "Improve application performance and user experience.",
    ],

    responsibilities: [
      "Develop modern React-based user interfaces.",
      "Translate designs into production-ready experiences.",
      "Build reusable UI components.",
      "Optimize frontend performance.",
      "Collaborate with product and engineering teams.",
    ],

    requirements: [
      "Strong knowledge of HTML, CSS, and JavaScript.",
      "Experience with React.",
      "Understanding of responsive web design.",
      "Knowledge of Git and frontend development workflows.",
      "Good UI problem-solving skills.",
    ],

    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "REST APIs",
      "Git",
      "Responsive Design",
    ],

    benefits: [
      "Remote work",
      "Flexible schedule",
      "Learning budget",
      "Health benefits",
      "Growth opportunities",
    ],

    visual: {
      node1: "REACT",
      node2: "BROWSER",
      node3: "UI",
      node4: "CSS",
      center: "FRONTEND",
    },
  },

  {
    id: "4",
    company: "Elevate Technologies",
    industry: "Cloud",
    initial: "E",
    title: "Java Developer",
    location: "Pune, India",
    type: "Full-time",
    experience: "0–2 years",
    salary: "₹7L – ₹12L",
    match: 81,
    posted: "Today",
    applicants: "22 applicants",

    description:
      "Elevate Technologies is looking for a Java Developer to develop reliable enterprise applications and cloud-ready services.",

    overview: [
      "Develop Java-based enterprise applications.",
      "Build maintainable backend services.",
      "Work with databases and APIs.",
      "Support application performance and reliability.",
    ],

    responsibilities: [
      "Develop Java and Spring-based applications.",
      "Create and maintain REST APIs.",
      "Work with SQL databases.",
      "Debug and resolve application issues.",
      "Collaborate with development teams.",
    ],

    requirements: [
      "Knowledge of Core Java and OOP.",
      "Understanding of Spring Boot.",
      "Basic SQL knowledge.",
      "Familiarity with REST APIs.",
      "Good problem-solving skills.",
    ],

    skills: [
      "Java",
      "Spring Boot",
      "SQL",
      "REST APIs",
      "MySQL",
      "Git",
      "OOP",
    ],

    benefits: [
      "Competitive salary",
      "Training programs",
      "Career growth",
      "Health benefits",
      "Learning opportunities",
    ],

    visual: {
      node1: "JAVA",
      node2: "DATABASE",
      node3: "API",
      node4: "SPRING",
      center: "JAVA DEV",
    },
  },
];

export const getJobById = (id) => {
  return (
    JOBS.find(
      (job) => String(job.id) === String(id)
    ) || null
  );
};