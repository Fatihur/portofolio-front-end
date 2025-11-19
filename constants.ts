
import { Project, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Financial Dashboard",
    category: "Web Application",
    description: "A high-performance analytics dashboard for real-time financial data visualization.",
    longDescription: "A comprehensive financial analytics platform designed for high-frequency trading firms. The challenge was to render thousands of data points in real-time without compromising UI performance. utilized Web Workers for data processing and D3.js for canvas-based rendering to achieve 60fps updates.",
    client: "FinTech Global",
    year: "2023",
    image: "https://picsum.photos/800/600?random=1",
    gallery: [
        "https://picsum.photos/800/600?random=10",
        "https://picsum.photos/800/600?random=11",
        "https://picsum.photos/800/600?random=12"
    ],
    technologies: ["React", "TypeScript", "D3.js", "Tailwind"],
    link: "#"
  },
  {
    id: 2,
    title: "E-Commerce Core",
    category: "System Architecture",
    description: "Headless commerce solution built for scalability and speed.",
    longDescription: "Re-architected the frontend layer for a major fashion retailer. Moved from a monolithic architecture to a composable commerce setup using Next.js and GraphQL. This resulted in a 40% increase in page load speed and a 15% uplift in conversion rates during the first quarter of launch.",
    client: "Vogue Retail",
    year: "2022",
    image: "https://picsum.photos/800/600?random=2",
    gallery: [
        "https://picsum.photos/800/600?random=20",
        "https://picsum.photos/800/600?random=21"
    ],
    technologies: ["Next.js", "GraphQL", "Node.js", "Redis"],
    link: "#"
  },
  {
    id: 3,
    title: "AI Content Generator",
    category: "AI Integration",
    description: "Generative text and image platform leveraging large language models.",
    longDescription: "An internal tool developed for a marketing agency to automate ad copy and asset generation. Integrated Gemini API for text reasoning and stable diffusion models for image placement. Features include context-aware prompting and a drag-and-drop canvas editor.",
    client: "AdCreate Agency",
    year: "2024",
    image: "https://picsum.photos/800/600?random=3",
    gallery: [
        "https://picsum.photos/800/600?random=30",
        "https://picsum.photos/800/600?random=31",
        "https://picsum.photos/800/600?random=32",
        "https://picsum.photos/800/600?random=33"
    ],
    technologies: ["Gemini API", "React", "Python", "FastAPI"],
    link: "#"
  },
  {
    id: 4,
    title: "Architectural Portfolio",
    category: "Design Implementation",
    description: "Minimalist portfolio site focusing on heavy imagery and typography.",
    longDescription: "A portfolio website for an award-winning architect. The design philosophy followed 'Swiss Style' principles—grid-based layouts, sans-serif typography, and whitespace. Implemented custom smooth scrolling and complex page transitions using GSAP.",
    client: "Studio Archi",
    year: "2021",
    image: "https://picsum.photos/800/600?random=4",
    gallery: [
        "https://picsum.photos/800/600?random=40",
        "https://picsum.photos/800/600?random=41"
    ],
    technologies: ["Vue.js", "GSAP", "SCSS", "Prismic"],
    link: "#"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "TechFlow Solutions",
    period: "2021 - Present",
    description: "Leading the frontend team in migrating legacy architecture to modern React stack. Improved performance by 40%."
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Creative Pulse",
    period: "2019 - 2021",
    description: "Developed interactive marketing campaigns and high-fidelity web applications for global brands."
  },
  {
    id: 3,
    role: "UI/UX Designer & Dev",
    company: "Freelance",
    period: "2017 - 2019",
    description: "Bridged the gap between design and code, delivering pixel-perfect implementation for startups."
  }
];

export const NAV_LINKS = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];
