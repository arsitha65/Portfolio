import { useEffect, useState, useRef } from "react";
import { FaAws, FaDocker, FaGithub, FaJava, FaLinkedin, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiAngular, SiCplusplus, SiCss3, SiHtml5, SiJavascript, SiKubernetes, SiMongodb, SiMysql, SiPostgresql, SiSpring, SiTypescript } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FiMoon, FiSun, FiChevronLeft, FiChevronRight, FiArrowLeft, FiFileText } from "react-icons/fi";
import { HiArrowUp } from "react-icons/hi";
import awsCcpBadge from "./assets/aws_CCP_image.png";
import awsSaBadge from "./assets/solution_architect_image.png";

const projects = [
  {
    title: "Clip Lens",
    category: "Full Stack",
    summary:
      "ClipLearn is a multi-agent AI app that transforms any YouTube lecture into a complete study environment. Paste a URL and get a timestamped outline, smart summaries, flashcards, and semantic search powered by 5 specialized AI agents. Built with FastAPI, OpenAI API, and ChromaDB.",
    tech: ["Python", "FastAPI", "SSE Streaming", "aiohttp", "ChromaDB", "OpenAI GPT-4o", "yt-dlp", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/arsitha65/clipLearn",
  },
  {
    title: "Abstractive Text Summarization",
    category: "Languages",
    summary:
      "NLP project using mT5 fine-tuning on Telugu text with custom preprocessing and ROUGE-based evaluation.",
    tech: ["Python", "Transformers", "NLP", "Deep Learning"],
    link: "https://github.com/arsitha20/CS678-Abstractive-Text-Summarization-Telugu",
  },
  {
    title: "Voice Bot",
    category: "Full Stack",
    summary:
      "A real-time, browser-based voice assistant with a cascading STT → LLM → TTS pipeline, featuring barge-in interruption support, provider-agnostic speech and LLM integration, and containerized deployment on Azure Container Apps.",
    tech: ["Python", "Next.js", "Docker", "Azure"],
    link: "https://github.com/arsitha65/Voice-Bot",
  },
  {
    title: "Portfolio",
    category: "Frontend",
    summary:
      "Personal Portfolio website that is Responsive and Interactive to Showcase my Projects and Skills.",
    tech: ["React", "JavaScript", "Vite"],
    link: "https://github.com/arsitha65/Portfolio",
  },
];

const skills = [
  { name: "Python", icon: <FaPython />, group: "Languages" },
  { name: "JavaScript", icon: <SiJavascript />, group: "Languages" },
  { name: "TypeScript", icon: <SiTypescript />, group: "Languages" },
  { name: "Java", icon: <FaJava />, group: "Languages" },
  { name: "C++", icon: <SiCplusplus />, group: "Languages" },
  { name: "React", icon: <FaReact />, group: "Frontend" },
  { name: "Angular", icon: <SiAngular />, group: "Frontend" },
  { name: "HTML", icon: <SiHtml5 />, group: "Frontend" },
  { name: "CSS", icon: <SiCss3 />, group: "Frontend" },
  { name: "Spring Boot", icon: <SiSpring />, group: "Backend" },
  { name: "Node.js", icon: <FaNodeJs />, group: "Backend" },
  { name: "FastAPI", icon: <FaPython />, group: "Backend" },
  { name: "PostgreSQL", icon: <SiPostgresql />, group: "Databases" },
  { name: "MySQL", icon: <SiMysql />, group: "Databases" },
  { name: "MongoDB", icon: <SiMongodb />, group: "Databases" },
  { name: "AWS", icon: <FaAws />, group: "Cloud" },
  { name: "Docker", icon: <FaDocker />, group: "Cloud" },
  { name: "Kubernetes", icon: <SiKubernetes />, group: "Cloud" },
];

function App() {
  const [theme, setTheme] = useState("light");
  const [copied, setCopied] = useState(false);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [view, setView] = useState("home");
  const [skillFilter, setSkillFilter] = useState("All");
  const sliderRef = useRef(null);

  const scrollProjects = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 340 : window.innerWidth * 0.8;
      sliderRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTopArrow(window.scrollY > 280);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const email = "sathuarsitha@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      setCopied(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredSkills =
    skillFilter === "All" ? skills : skills.filter((skill) => skill.group === skillFilter);

  const homeProjects = projects.slice(0, 3);
  const homeSkills = skills.slice(0, 8);

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="top-nav__brand">Arsitha Sathu</div>
        <nav className="top-nav__links">
          <button onClick={() => setView("home")}>About</button>
          <button onClick={() => setView("projects")}>Projects</button>
          <button onClick={() => setView("skills")}>Skills</button>
          <button onClick={() => setView("certifications")}>Certifications</button>
        </nav>
        <button
          className="theme-switch"
          onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>
      </header>

      <main>
        {view === "home" && (
          <>
            <section className="hero-section content-wrap">
              <div className="hero-section__left">
                <div className="avatar-circle">
                  <span>AS</span>
                </div>
              </div>
              <div className="hero-section__right">
                <h1>ARSITHA SATHU</h1>
                <h2>SOFTWARE ENGINEER</h2>
                <p>
                  Passionate about creating scalable, user-focused applications using full-stack development, cloud infrastructure, and AI technologies.
                </p>
                <div className="hero-contact-row">
                  <button className="email-copy-wrapper tooltip-container" onClick={copyEmail} aria-label="Copy Email">
                    <MdEmail />
                    <span className="email-text">{email}</span>
                    <span className="tooltip">{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <div className="hero-socials">
                  <a className="social-icon-link social-icon-link--linkedin" href="https://www.linkedin.com/in/arsitha-sathu-a412a3405" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a className="social-icon-link social-icon-link--github" href="https://github.com/arsitha65" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                </div>
                <a
                  href={`${import.meta.env.BASE_URL}Arsitha_Resume.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button"
                >
                  <FiFileText className="cta-icon" />
                  <span>View Resume</span>
                </a>
              </div>
            </section>

            <section className="content-wrap section-block">
              <h3 className="section-title">PROJECTS</h3>
              <div className="slider-container">
                <button className="slider-arrow slider-arrow--left" onClick={() => scrollProjects("left")} aria-label="Previous Project">
                  <FiChevronLeft />
                </button>
                <div className="project-slider" ref={sliderRef}>
                  {projects.map((project) => (
                    <article key={project.title} className="project-card">
                      <div className="project-card__banner">{project.title}</div>
                      <div className="project-card__body">
                        <h4>{project.title}</h4>
                        <p>{project.summary}</p>
                        <div className="chip-list">
                          {project.tech.map((tag) => (
                            <span key={tag} className="chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a href={project.link} target="_blank" rel="noreferrer" className="card-link">
                          View Project
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
                <button className="slider-arrow slider-arrow--right" onClick={() => scrollProjects("right")} aria-label="Next Project">
                  <FiChevronRight />
                </button>
              </div>
            </section>

            <section className="content-wrap section-block skills-block">
              <h3 className="section-title">SKILLS</h3>
              <div className="skills-grid">
                {homeSkills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-item__icon">{skill.icon}</div>
                    <div className="skill-item__name">{skill.name}</div>
                  </div>
                ))}
              </div>
              <div className="section-action">
                <button className="section-button" onClick={() => setView("skills")}>View All Skills</button>
              </div>
            </section>

            <section className="content-wrap section-block certifications-block">
              <h3 className="section-title">CERTIFICATIONS</h3>
              <div className="cert-row">
                <a
                  className="cert-badge cert-badge--link"
                  href="https://www.credly.com/earner/earned/badge/575e3d43-0cd7-4d36-b964-7c1acf0c1435"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="AWS Cloud Practitioner Badge"
                >
                  <img
                    src={awsCcpBadge}
                    alt="AWS Cloud Practitioner"
                    className="cert-badge__image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const next = e.currentTarget.nextElementSibling;
                      if (next) next.style.display = "block";
                    }}
                  />
                  <small className="cert-badge__fallback">AWS Cloud Practitioner</small>
                </a>
                <a
                  className="cert-badge cert-badge--link"
                  href="https://www.credly.com/earner/earned/badge/3a4fb28f-4e2c-4b9c-8d89-c7accd4c3ede"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="AWS Solutions Architect Badge"
                >
                  <img
                    src={awsSaBadge}
                    alt="AWS Solutions Architect"
                    className="cert-badge__image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const next = e.currentTarget.nextElementSibling;
                      if (next) next.style.display = "block";
                    }}
                  />
                  <small className="cert-badge__fallback">AWS Solutions Architect</small>
                </a>
              </div>
            </section>
          </>
        )}

        {view === "projects" && (
          <section className="content-wrap section-block all-page">
            <button className="icon-back-btn" onClick={() => setView("home")} aria-label="Back to Home"><FiArrowLeft /></button>
            <h3 className="section-title">ALL PROJECTS</h3>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card">
                  <div className="project-card__banner">{project.title}</div>
                  <div className="project-card__body">
                    <h4>{project.title}</h4>
                    <p>{project.summary}</p>
                    <div className="chip-list">
                      {project.tech.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noreferrer" className="card-link">
                      View Project
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {view === "skills" && (
          <section className="content-wrap section-block all-page">
            <button className="icon-back-btn" onClick={() => setView("home")} aria-label="Back to Home"><FiArrowLeft /></button>
            <h3 className="section-title">SKILLS</h3>
            <div className="skills-filter-row">
              {["All", "Languages", "Frontend", "Backend", "Databases", "Cloud"].map((item) => (
                <button
                  key={item}
                  className={`filter-chip ${skillFilter === item ? "is-active" : ""}`}
                  onClick={() => setSkillFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="skills-grid skills-grid--all">
              {filteredSkills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-item__icon">{skill.icon}</div>
                  <div className="skill-item__name">{skill.name}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {view === "certifications" && (
          <section className="content-wrap section-block all-page">
            <button className="icon-back-btn" onClick={() => setView("home")} aria-label="Back to Home"><FiArrowLeft /></button>
            <h3 className="section-title">CERTIFICATIONS</h3>
            <div className="cert-row">
              <a
                className="cert-badge cert-badge--link"
                href="https://www.credly.com/earner/earned/badge/575e3d43-0cd7-4d36-b964-7c1acf0c1435"
                target="_blank"
                rel="noreferrer"
                aria-label="AWS Cloud Practitioner Badge"
              >
                <img
                  src={awsCcpBadge}
                  alt="AWS Cloud Practitioner"
                  className="cert-badge__image"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const next = e.currentTarget.nextElementSibling;
                    if (next) next.style.display = "block";
                  }}
                />
                <small className="cert-badge__fallback">AWS Cloud Practitioner</small>
              </a>
              <a
                className="cert-badge cert-badge--link"
                href="https://www.credly.com/earner/earned/badge/3a4fb28f-4e2c-4b9c-8d89-c7accd4c3ede"
                target="_blank"
                rel="noreferrer"
                aria-label="AWS Solutions Architect Badge"
              >
                <img
                  src={awsSaBadge}
                  alt="AWS Solutions Architect"
                  className="cert-badge__image"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const next = e.currentTarget.nextElementSibling;
                    if (next) next.style.display = "block";
                  }}
                />
                <small className="cert-badge__fallback">AWS Solutions Architect</small>
              </a>
            </div>
          </section>
        )}
      </main>

      <footer className="page-footer">
        <p>
          © {new Date().getFullYear()} Arsitha Sathu. All rights reserved.
        </p>
      </footer>

      {showTopArrow && (
        <button className="scroll-top" onClick={scrollToTop} aria-label="Back to top">
          <HiArrowUp />
        </button>
      )}
    </div>
  );
}

export default App;
