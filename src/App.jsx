import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function App() {
  // global scroll-reveal for elements with .reveal-on-scroll
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        {/* <Certifications /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__logo">Arsitha Sathu</div>
      <nav className="navbar__links">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
        <a href="#certifications">Certifications</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  const roles = [
    "Software Development Engineer",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "AI Engineer",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && charIndex === currentRole.length) {
      const pause = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(pause);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const speed = isDeleting ? 70 : 120;

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  const currentText = roles[roleIndex].slice(0, charIndex);

  return (
    <section id="about" className="section hero">
      <div className="container hero__content">
        <div className="hero__text">
          <p className="hero__tagline">I&apos;m Arsitha Sathu</p>

          <h1 className="hero__title hero__role">
            {currentText}
            <span className="hero__cursor">|</span>
          </h1>

          <p className="hero__subtitle">
            I am a Software Engineer with over 2 years of experience in the full software development lifecycle, from concept to deployment. I specialize in building scalable web applications using Java, Spring Boot, Angular, and TypeScript.
          </p>
          <p className="hero__subtitle">
            My recent work focuses on developing conversational voice agents and intelligent automation tools. I utilize technologies like Python, Azure AI, and RAG to create systems that improve user engagement and operational efficiency.
          </p>
          <p className="hero__subtitle">
            I am committed to writing clean, maintainable code and optimizing system performance, ensuring that every solution I deliver is secure and production-ready.
          </p>

          <div className="hero__actions">
            <a
              href="/Arsitha_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- EXPERIENCE ----------------------- */

function Experience() {
  const items = [
    {
      role: "Software Engineer(Remote)",
      company: "Blue Horse Digital",
      location: "Richmond, VA",
      period: "July 2025 – present",
      bullets: [
        "Architected a low-latency, voice agent using Python (aiohttp) and Azure AI Services (Speech/GPT-4o), optimizing client-side audio with a custom JavaScript Audio Worklet (resampling/anti-aliasing) and implementing barge-in interruption for sub-second, natural responsiveness.",
        "Built a custom Agentic Workflow (MCP-based) and Retrieval-Augmented Generation (RAG) engine leveraging Azure OpenAI Embeddings to autonomously execute complex reasoning, query USDA policies, and provide accurate, citation-backed answers.",
        "Engineered a hands-free PDF Form Filling system that dynamically inspects schemas (using pypdf) to map conversational data into applications in real-time, auto-generating and emailing completed forms without manual input.",
        "Deployed the scalable, containerized application to Azure Container Apps using Docker multi-stage builds, ensuring secure API key management and robust production infrastructure."
      ],
    },
    {
      role: "Fullstack Developer ",
      company: "Infosys Limited ",
      location: "India",
      period: "Oct 2021 – July 2023",
      bullets: [
        "Developed production REST APIs and microservices using Java, Spring Boot, Angular, and PostgreSQL, supporting enterprise applications across multiple client projects.",
        "Optimized database queries and API endpoints, improving response times by 25-30% through strategic indexing and query refactoring.",
        "Built a reusable Angular component library (dynamic tables, filters, role-based controls) adopted across development teams, reducing UI development time by 30%.",
        "Resolved high-priority production bottlenecks with over 90% test coverage using JUnit while driving continuous integration and code quality within an Agile Scrum methodology.",
      ],
    },
  ];

  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <SectionTitle>Work Experience</SectionTitle>

        <div className="timeline">
          {items.map((item) => (
            <TimelineRow key={item.role} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ role, company, location, period, bullets }) {
  return (
    <div className="timeline-row reveal-on-scroll">
      <div className="timeline-row__line">
      </div>
      <article className="timeline-card">
        <div className="timeline-card__header">
          <div>
            <h3 className="timeline-card__role">{role}</h3>
            <p className="timeline-card__company">
              {company} — {location}
            </p>
          </div>
          <span className="timeline-card__period">{period}</span>
        </div>
        <ul className="timeline-card__list">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

/* ----------------------- PROJECTS ----------------------- */

function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      title: "AI Log Analysis Dashboard",
      period: "2025",
      points: [
        "Built a full-stack AI system that ingests and parses logs using Spring Boot and PostgreSQL.",
        "Integrated a FastAPI microservice using GPT-4o-mini to cluster errors and generate debugging insights.",
        "Designed a React dashboard for one-click analysis and visualizing error clusters.",
      ],
      tech: ["React", "Spring Boot", "PostgreSQL", "LLM"],
      codeLink: "https://github.com/arsitha20/AI-Log-Analysis-Dashboard",
    },
    {
      title: "Abstractive text summarization",
      period: "2024",
      points: [
        "Fine-tuned an mT5 transformer on a custom Telugu dataset for abstractive summarization..",
        "Implemented preprocessing pipelines for tokenization and normalization.",
        "Evaluated summaries using ROUGE metrics to measure quality.",
      ],
      tech: ["React", "Spring Boot", "FastAPI", "PostgreSQL"],
      codeLink: "https://github.com/arsitha20/CS678-Abstractive-Text-Summarization-Telugu",
    },
    {
      title: "Smart Resume Screener",
      period: "2024",
      points: [
        "Built a web platform to evaluate resume-job fit, featuring resume uploads and JWT-based login.",
        "Developed frontend in React and backend in Spring Boot, PostgreSQL to manage users, files, and APIs.",
        "Created a Python microservice using BERT to compute match scores and integrated OPENAI GPT for candidate fit analysis.",
      ],
      tech: ["React", "TailwindCSS", "HTML", "CSS", "Spring Boot", "postgreSQL", "Python", "BERT", "OpenAI GPT"],
      codeLink: "",
    },
    {
      title: "Departmental Connect",
      period: "2021",
      points: [
        "Rebuilt a static departmental site into a dynamic React and Node.js platform.",
        "Added searchable course content, faculty pages, announcements, and admin tools.",
        "Improved navigation through optimized queries and modular backend endpoints.",
      ],
      tech: ["Azure", "Node.js", "WebSockets", "Docker"],
      codeLink: "https://github.com/arsitha28/CSE-Department-Website",
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle>Projects</SectionTitle>

        <div className="cards-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
              onDetails={() => setActiveProject(project)}
            />
          ))}
        </div>

        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </div>
    </section>
  );
}

function ProjectCard({ title, period, points, tech, onDetails, codeLink }) {
  return (
    <article className="card project-card reveal-on-scroll">
      <div className="project-card__header">
        <div className="card__period">Period: {period}</div>
        <button className="pill-btn" onClick={onDetails}>
          Details
        </button>
      </div>

      <h3 className="card__title">{title}</h3>

      <ul className="card__list">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <div className="project-tech">
        {tech.map((t) => (
          <span key={t} className="project-tech__chip">
            {t}
          </span>
        ))}
      </div>

      <div className="project-card__footer">
        {codeLink && (
          <a
            href={codeLink}
            target="_blank"
            rel="noreferrer"
            className="project-btn project-btn--primary"
          >
            <span className="project-btn__icon">
              <FaGithub />
            </span>
            <span className="project-btn__label">View Code</span>
          </a>
        )}
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h3>{project.title}</h3>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="modal__period">{project.period}</p>

        <ul className="modal__list">
          {project.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <div className="modal__footer">
          <a
            href={project.codeLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-small"
          >
            View Code
          </a>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- SKILLS ----------------------- */

function Skills() {
  const categories = [
    {
      title: "Programming Languages",
      skills: ["Java", "Python", "C", "SQL", "HTML", "CSS", "JavaScript", "TypeScript", "JSON", "Bash", "Shell Scripting"],
    },
    {
      title: "Frameworks & Libraries",
      skills: ["Spring Boot", "Node.js", "React", "Angular", "FastAPI", "PyTorch", "OpenAI SDK", "LangChain (Agentic Workflows)", "PyPDF"],
    },
    {
      title: "Data & Infrastructure",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "REST API", "Microservices", "WebSockets", "AWS (EC2, S3)", "Azure", "AI Foundry", "Speech Services", "Container Apps", "OpenAI (GPT-4o)", "Azure Key Vault", "Docker", "Kubernetes", "Jenkins", "CI/CD", "RAG", "MCP", "AudioWorklet"],
    },
    {
      title: "Development Tools",
      skills: ["Git", "Postman", "Swagger", "JUnit", "JIRA", "SonarQube", "VS Code", "IntelliJ IDEA", "ChatGPT", "Claude", "GitHub Copilot", "Cursor", "Gemini", "Figma (UI/UX)"],
    },
    {
      title: "Domain Knowledge",
      skills: ["Data Structures & Algorithms", "Operating Systems", "Embedded Systems", "NLP", "LLMs", "Data Mining", "Networking Fundamentals", "TCP/IP Model", "UDP", "HTTP/HTTPS"],
    }
  ];

  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <SectionTitle>Technical Skills</SectionTitle>

        <div className="skills-grid">
          {categories.map((cat) => (
            <div key={cat.title} className="skills-column reveal-on-scroll">
              <h3>{cat.title}</h3>
              <div className="skills-column__bar" />
              <div className="skills-column__chips">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ----------------------- EDUCATION ----------------------- */

function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionTitle>Education</SectionTitle>

        <div className="edu-card reveal-on-scroll">
          <h3>Master of Science in Computer Science</h3>
          <p>George Mason University — Fairfax, VA</p>
          <p className="edu-card__period">2023 – 2025</p>
        </div>

        <div className="edu-card reveal-on-scroll">
          <h3>Bachelors in Computer Science</h3>
          <p>Jawaharlal Technological University — India</p>
          <p className="edu-card__period">2017 – 2021</p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- CERTIFICATIONS ----------------------- */

function Certifications() {
  return (
    <section id="certifications" className="section section--alt">
      <div className="container">
        <SectionTitle>Certifications</SectionTitle>

        <div className="cert-grid">
          <CertCard
            title="AWS Certified Developer – Associate"
            org="Amazon Web Services"
            period="2024 – 2027"
            link="/cert-aws-developer.pdf"
          />
          <CertCard
            title="AWS Certified Cloud Practitioner"
            org="Amazon Web Services"
            period="2023 – 2027"
            link="/cert-aws-cloud-practitioner.pdf"
          />
          <CertCard
            title="GitHub Foundations"
            org="GitHub"
            period="2025 – 2028"
            link="/cert-github-foundations.pdf"
          />
        </div>
      </div>
    </section>
  );
}

function CertCard({ title, org, period, link }) {
  return (
    <article className="cert-card reveal-on-scroll">
      <h3 className="cert-card__title">{title}</h3>
      <p className="cert-card__org">{org}</p>
      <p className="cert-card__period">{period}</p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="cert-card__link"
        >
          View Certificate
        </a>
      )}
    </article>
  );
}

/* ----------------------- CONTACT ----------------------- */

function Contact() {
  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <SectionTitle>Get In Touch</SectionTitle>

        <div className="contact-card reveal-on-scroll">
          <p className="contact__text">
            Feel free to contact me for any work or suggestions below.
          </p>

          <div className="contact-items">
            <div className="contact-item">
              <MdEmail className="contact-icon" />
              <a href="mailto:sathuarsitha@gmail.com">
                sathuarsitha@gmail.com
              </a>
            </div>

            <div className="contact-item">
              <FaLinkedin className="contact-icon" />
              <a
                href="https://www.linkedin.com/in/arsitha-sathu/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/arsitha-sathu/
              </a>
            </div>

            <div className="contact-item">
              <FaGithub className="contact-icon" />
              <a
                href="https://github.com/arsitha20"
                target="_blank"
                rel="noreferrer"
              >
                github.com/arsitha20
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- FOOTER ----------------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <p className="footer__name">Arsitha Sathu</p>
        <p className="footer__copy">
          © {new Date().getFullYear()} Arsitha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SectionTitle({ children }) {
  return <h2 className="section__title">{children}</h2>;
}

export default App;
