import { useEffect, useMemo, useRef, useState } from "react";

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Completed", value: "15+" },
  { label: "Technologies", value: "15+" }
];

const capabilities = [
  {
    title: "Programming & Data",
    text: "Python, SQL, R, and C for analytics, automation, and data modeling."
  },
  {
    title: "Data Engineering",
    text: "Apache Spark, Hadoop, ETL pipelines, and data warehousing for reliable delivery."
  },
  {
    title: "AI/ML & Cloud",
    text: "TensorFlow, LangChain, LangGraph, Crew AI, AWS, and Snowflake for AI solutions."
  }
];

const projects = [
  {
    title: "Azure Ticket Dispatcher (Automated Load Balancing)",
    summary:
      "Designed and deployed a standalone Azure Function App to automate ticket assignment in ConnectWise with intelligent load balancing and real-time dashboards.",
    tags: ["Azure Functions", "Python", "ConnectWise API", "Load Balancing"],
    timeline: "2025 · Production"
  },
  {
    title: "ConnectWise API Automation",
    summary:
      "Built Python-based service integrating ConnectWise workflows with OpenAI-powered analysis for intelligent ticket automation and categorization.",
    tags: ["Python", "OpenAI API", "ConnectWise", "RESTful APIs"],
    timeline: "2025 · Production"
  },
  {
    title: "Generative AI Solutions & RAG Systems",
    summary:
      "Built custom Generative AI solutions using LangGraph, LangChain, and Crew AI with RAG systems for enhanced knowledge retrieval.",
    tags: ["LangGraph", "LangChain", "Crew AI", "RAG"],
    timeline: "2024 · Ongoing"
  },
  {
    title: "Expedia Recon Database Maintenance",
    summary:
      "Retrieved data from Splunk Data Lake to production databases and transformed data with PySpark for analysis.",
    tags: ["PySpark", "PostgreSQL", "Tableau"],
    timeline: "2023 · 6 months"
  },
  {
    title: "Rxsense ETL Pipeline Documentation",
    summary:
      "Developed and managed Matillion pipelines, integrating Python and SQL scripts for automated workflows.",
    tags: ["Matillion", "Python", "SQL"],
    timeline: "2023 · 4 months"
  }
];

const timeline = [
  {
    role: "Master's in Data Science and Engineering – Data Science and Analytics",
    org: "Florida Atlantic University, Boca Raton, FL",
    period: "Jan 2024 – May 2025",
    detail:
      "Coursework includes Machine Learning, LLMs, Deep Learning, Data Mining, Hadoop Systems, and Cloud Computing (AWS)."
  },
  {
    role: "Associate Data Engineer",
    org: "Nexturn India Pvt.Ltd",
    period: "Jun 2022 – Dec 2023",
    detail:
      "Designed data pipelines with Matillion, Python, and SQL while delivering dashboards in Tableau and Power BI."
  }
];

const skills = [
  "Python",
  "SQL",
  "R",
  "Apache Spark",
  "Hadoop",
  "ETL Pipelines",
  "Data Warehousing",
  "TensorFlow",
  "LangChain",
  "LangGraph",
  "Crew AI",
  "AWS",
  "Snowflake",
  "Tableau",
  "Power BI"
];

export default function App() {
  const [status, setStatus] = useState("Ready for new projects");
  const [formStatus, setFormStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const heroRef = useRef(null);

  const projectsGrid = useMemo(
    () => projects.map((project) => ({ ...project, id: project.title })),
    []
  );

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-animate]");
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

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;

    fetch("/api/status")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setStatus(data.status || status);
      })
      .catch(() => { });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setFormStatus("");

    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormStatus("Message received. I will reply shortly.");
      event.target.reset();
    } catch (error) {
      setFormStatus("Unable to send right now. Please email me directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="page">
      <div className="background">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="orb orb-three" />
      </div>

      <header className="nav">
        <div className="container nav-inner">
          <div className="logo">JG</div>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#badges">Badges</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-cta" href="resume.html">
            Resume
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home" ref={heroRef}>
          <div className="container hero-grid">
            <div className="hero-copy" data-animate>
              <p className="eyebrow">Data Engineer & Data Scientist</p>
              <h1>Hi, I'm Jaswanth Gaddam.</h1>
              <p className="lead">
                I design and develop efficient data pipelines, create insightful
                visualizations, and build machine learning solutions. Passionate
                about data-driven decision making and continuous learning.
              </p>
              <div className="hero-badges">
                <span>Data platforms</span>
                <span>AI automation</span>
                <span>Analytics delivery</span>
              </div>
              <div className="hero-actions">
                <a className="btn primary" href="#projects">
                  View My Work
                </a>
                <a className="btn ghost" href="resume.html">
                  Download Resume
                </a>
              </div>
              <div className="stat-grid">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="stat-card"
                    data-animate
                    style={{ "--delay": `${index * 0.08}s` }}
                  >
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual" data-animate>
              <div className="portrait-card">
                <img src="/Profesional Pic.png" alt="Jaswanth Gaddam" />
                <div className="portrait-meta">
                  <div className="availability">
                    <span className="status-dot" aria-hidden="true" />
                    <span className="badge">Available</span>
                  </div>
                  <span className="status">{status}</span>
                </div>
              </div>
              <div className="signal-card">
                <p>Signal stack</p>
                <div className="signal-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="signal-grid">
                  {skills.slice(0, 6).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Skills marquee">
          <div className="marquee-track">
            {[...skills, ...skills].map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <div className="section-header" data-animate>
              <h2>About Me</h2>
              <p>
                A highly motivated and results-driven Data Science and
                Engineering master's student with a strong foundation in
                Generative AI, machine learning, deep learning, and LLMs.
              </p>
            </div>
            <div className="capability-grid">
              {capabilities.map((item, index) => (
                <article
                  key={item.title}
                  className="capability-card"
                  data-animate
                  style={{ "--delay": `${index * 0.1}s` }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="projects">
          <div className="container">
            <div className="section-header" data-animate>
              <h2>Featured Projects</h2>
              <p>Built for scale, quality, and measurable business impact.</p>
            </div>
            <div className="project-grid">
              {projectsGrid.map((project, index) => (
                <article
                  className="project-card"
                  key={project.id}
                  data-animate
                  style={{ "--delay": `${index * 0.08}s` }}
                >
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span>{project.timeline}</span>
                  </div>
                  <p>{project.summary}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="container">
            <div className="section-header" data-animate>
              <h2>Experience & Education</h2>
              <p>Professional experience alongside ongoing graduate studies.</p>
            </div>
            <div className="timeline">
              {timeline.map((item, index) => (
                <div
                  key={item.role}
                  className="timeline-item"
                  data-animate
                  style={{ "--delay": `${index * 0.12}s` }}
                >
                  <div className="timeline-meta">
                    <span>{item.period}</span>
                  </div>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="org">{item.org}</p>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="badges">
          <div className="container badges">
            <div className="section-header" data-animate>
              <h2>Certifications & Badges</h2>
              <p>Curated highlights from my technical learning journey.</p>
            </div>
            <figure className="badge-frame" data-animate>
              <img src="/badges.webp" alt="Technical badges and certifications" />
              <figcaption>Selected badges and certifications</figcaption>
            </figure>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-animate>
              <h2>Get In Touch</h2>
              <p>
                I'm always interested in new opportunities and exciting
                projects. Feel free to reach out if you'd like to collaborate or
                just want to say hello.
              </p>
              <div className="contact-details">
                <span>jaswanthnani02@icloud.com</span>
                <span>Boca Raton, FL</span>
                <span>+1 (561) 617-4480</span>
                <a href="https://www.linkedin.com/in/gaddamjaswanth/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn Profile
                </a>
              </div>
            </div>
            <form className="contact-form" data-animate onSubmit={handleSubmit}>
              <label>
                Name
                <input name="name" type="text" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Project details
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell me about your goals."
                />
              </label>
              <button className="btn primary" type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Send message"}
              </button>
              <p className="form-note">{formStatus}</p>
              <p className="form-note">
                Prefer email? Reach out via
                <a href="mailto:jaswanthnani02@icloud.com"> jaswanthnani02@icloud.com</a>.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2024 Jaswanth Gaddam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
