import React, { useState, useCallback, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import {
  FiGithub, FiLinkedin, FiMail, FiBriefcase,
  FiBookOpen, FiTool, FiAward, FiSun, FiMoon, FiX,
  FiSend, FiArrowUp, FiMessageSquare
} from "react-icons/fi";
import "./App.css";

import profileImg from "./assets/profile1.jpg";

import neupcThumb from "./assets/neupc-thumb.jpg?url";
import neupcImg1 from "./assets/neupc-1.jpg?url";
import neupcImg2 from "./assets/neupc-2.jpg?url";

import osdPortalThumb from "./assets/osd-portal-thumb.jpg?url";
import osdPortalImg1 from "./assets/osd-portal-1.jpg?url";
import osdPortalImg2 from "./assets/osd-portal-2.jpg?url";

import osdCamThumb from "./assets/osd-cam-thumb.jpg?url";
import osdCamImg1 from "./assets/osd-cam-1.jpg?url";
import osdCamImg2 from "./assets/osd-cam-2.jpg?url";

const DEFAULT_IMG = "https://placehold.co/600x400/png?text=Image+Not+Found";
const getImage = (img) => (img && typeof img === "string" ? img : DEFAULT_IMG);

/* ── Typing hook ─────────────────────────────────────────── */
const useTyped = (strings, typeSpeed = 50, backSpeed = 30, delay = 1500) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentString = strings[index % strings.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentString.substring(0, displayText.length - 1));
      }, backSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentString.substring(0, displayText.length + 1));
      }, typeSpeed);
    }

    if (!isDeleting && displayText === currentString) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, strings, typeSpeed, backSpeed, delay]);

  return displayText;
};

/* ── Section entrance animation hook ─────────────────────── */
const useFadeIn = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

/* ── Animated section wrapper ─────────────────────────────── */
const FadeCard = ({ children, className = "" }) => {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-section card ${className}`}>
      {children}
    </div>
  );
};

/* ── Nav dots ─────────────────────────────────────────────── */
const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const NavDots = () => {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observers = NAV_SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {NAV_SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`nav-dot ${active === id ? "active" : ""}`}
          onClick={() => scrollTo(id)}
          title={label}
          aria-label={`Go to ${label}`}
        />
      ))}
    </nav>
  );
};

/* ── Scroll-to-top button ─────────────────────────────────── */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      className="scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <FiArrowUp size={20} />
    </button>
  );
};

/* ── Contact form ─────────────────────────────────────────── */
const ContactForm = ({ email }) => {
  const [form, setForm] = useState({ name: "", from: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `From: ${form.name} <${form.from}>\n\n${form.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-row">
        <div className="contact-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="contact-field">
          <label htmlFor="from">Email</label>
          <input
            id="from"
            name="from"
            type="email"
            required
            placeholder="your@email.com"
            value={form.from}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="contact-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="What's on your mind?"
          value={form.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="details-btn contact-submit">
        {sent ? "✅ Opening mail client…" : <><FiSend size={16} /> Send Message</>}
      </button>
    </form>
  );
};

/* ══════════════════════════════════════════════════════════ */
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const toggleTheme = () => setDarkMode(!darkMode);
  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);
  const openLightbox = (img) => setLightboxImage(img);
  const closeLightbox = () => setLightboxImage(null);

  useEffect(() => {
    if (selectedProject || lightboxImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject, lightboxImage]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  /* ── Data ───────────────────────────────────────────────── */
  const personalInfo = {
    name: "Joshua Lumuntad",
    role: "IT Student & Aspiring Full‑Stack Developer",
    bio: "4th-year IT student passionate about building modern web apps, solving problems, and learning new technologies. Currently exploring React, Node.js, and cloud computing.",
    location: "Quezon City, Philippines",
    university: "New Era University",
    graduation: "2026",
    email: "joshualumuntad@gmail.com",
    github: "https://github.com/joshuaLumuntad",
    linkedin: "https://linkedin.com/in/joshua-lumuntad-16b726225",
  };

  const skills = [
    "JavaScript (ES6+)", "React", "Node.js", "Python",
    "MongoDB", "Git/GitHub", "HTML5/CSS3",
    "CSS Frameworks (Bootstrap, Tailwind)",
  ];

  const projects = [
    {
      id: 1,
      title: "NEU PC Simulator",
      shortDesc: "Interactive PC building and hardware simulation.",
      fullDesc:
        "A web‑based simulator that lets users assemble virtual PC components, check compatibility, and estimate performance. Built with React for the website, Godot for the 3D simulation engine, and deployed on Netlify.\n\n📖 How to use:\n1. Browse available components (CPU, GPU, RAM, storage, etc.) from the library.\n2. Drag and drop components into the build area.\n3. The system will automatically check compatibility (socket, power, size).\n4. View real‑time performance score and estimated wattage.\n5. Save your build with a name and load it later.\n6. Share your build using a generated link.",
      tech: ["React", "Godot", "Netlify"],
      thumbnail: getImage(neupcThumb),
      images: [getImage(neupcImg1), getImage(neupcImg2)],
      features: [
        "Real‑time compatibility check",
        "3D component preview",
        "Save and load custom builds",
        "Performance score estimation",
      ],
    },
    {
      id: 2,
      title: "NEU OSD Portal",
      shortDesc: "Student discipline management system – admin dashboard and reporting.",
      fullDesc:
        "A full‑stack portal for the Office of Student Development (OSD) to manage student violations, track incidents, generate reports, and handle student records. Frontend built with vanilla React framework, backend in PHP, hosted on Render.\n\n📖 How to use:\n1. Log in with your role (admin, faculty, or student).\n2. Admins: add/edit/delete student records, define violation types, and view all reports.\n3. Faculty: submit a violation by selecting a student, choosing the violation type, and adding notes/evidence.\n4. Students: view their own violation history and status.\n5. Generate PDF reports filtered by date, student, or violation type.\n6. Use the dashboard to see statistics (most common violations, trends).",
      tech: ["React", "PHP", "Render"],
      thumbnail: getImage(osdPortalThumb),
      images: [getImage(osdPortalImg1), getImage(osdPortalImg2)],
      features: [
        "Role‑based access (admin, faculty, student)",
        "Violation reporting and tracking",
        "Automated incident reports",
        "Student record management",
      ],
    },
    {
      id: 3,
      title: "OSD Violation Cam",
      shortDesc: "Live camera module for capturing violation evidence (mobile).",
      fullDesc:
        "A React Native mobile application that integrates with the OSD Portal. Uses device camera to capture violation evidence, stores data on a PHP backend, and is prepared for deployment via Workwhole (or similar platform).\n\n📖 How to use:\n1. Install the app on your Android/iOS device.\n2. Log in using your OSD Portal credentials (faculty or admin role).\n3. Point the camera at the violation scene and tap the capture button.\n4. Add optional notes and select the involved student from a list.\n5. The photo and metadata are uploaded to the backend and linked to the student's record.\n6. Works offline – captures are saved locally and synced when internet is restored.\n7. View all past captures and their status in the history tab.",
      tech: ["React Native", "PHP", "Workwhole"],
      thumbnail: getImage(osdCamThumb),
      images: [getImage(osdCamImg1), getImage(osdCamImg2)],
      features: [
        "Real‑time photo capture",
        "Evidence linked to student records",
        "Offline support (local storage)",
        "Secure upload to backend",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "New Era University",
      year: "2019 – 2026",
    },
  ];

  const experience = [
    {
      title: "Tech Support Intern",
      company: "Department of Environment",
      period: "December 2025 - February 2026",
      description:
        "Provided technical support for internal systems, assisted with software updates, and collaborated on IT projects to improve department efficiency.",
    },
  ];

  const typedStrings = [
    personalInfo.role,
    "IT Student",
    "Web Developer",
    "Problem Solver",
  ];
  const typedText = useTyped(typedStrings, 60, 30, 1500);

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: darkMode ? "#ffffff" : "#000000" },
            links: {
              color: darkMode ? "#ffffff" : "#000000",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: { enable: true, speed: 1 },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

      {/* Fixed controls */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>
      <NavDots />
      <ScrollToTop />

      <main className="container">

        {/* ── Hero ───────────────────────────────────────── */}
        <section className="hero">
          <div className="profile-wrapper">
            <img src={profileImg} alt={personalInfo.name} className="profile-img" />
          </div>
          <h1 className="glow-text">{personalInfo.name}</h1>
          <div className="typed-container">
            <span className="typed-text">{typedText}</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-bio">{personalInfo.bio}</p>
          <div className="social-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              <FiGithub size={20} /> GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
              <FiLinkedin size={20} /> LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`}>
              <FiMail size={20} /> Email
            </a>
          </div>
        </section>

        {/* ── About ──────────────────────────────────────── */}
        <FadeCard>
          <div id="about">
            <h2><FiBookOpen /> About Me</h2>
            <p>{personalInfo.bio}</p>
            <div className="info-grid">
              <p>📍 {personalInfo.location}</p>
              <p>🎓 {personalInfo.university}</p>
              <p>📅 Graduating: {personalInfo.graduation}</p>
              <p>💼 Open for internships</p>
            </div>
          </div>
        </FadeCard>

        {/* ── Skills ─────────────────────────────────────── */}
        <FadeCard>
          <div id="skills">
            <h2><FiTool /> Tech Skills</h2>
            <div className="skills-grid">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </FadeCard>

        {/* ── Education ──────────────────────────────────── */}
        <FadeCard>
          <div id="education">
            <h2><FiBookOpen /> Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="edu-item">
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <small>{edu.year}</small>
              </div>
            ))}
          </div>
        </FadeCard>

        {/* ── Experience ─────────────────────────────────── */}
        <FadeCard>
          <div id="experience">
            <h2><FiBriefcase /> Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="exp-item">
                <h3>{exp.title}</h3>
                <p>{exp.company}</p>
                <small>{exp.period}</small>
                <p className="exp-desc">{exp.description}</p>
              </div>
            ))}
          </div>
        </FadeCard>

        {/* ── Projects ───────────────────────────────────── */}
        <FadeCard>
          <div id="projects">
            <h2><FiAward /> Projects</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="project-image"
                  />
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc}</p>
                  {/* Tech pills */}
                  <div className="project-tech-pills">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                  <button onClick={() => openModal(project)} className="details-btn">
                    📖 View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FadeCard>

        {/* ── Contact ────────────────────────────────────── */}
        <FadeCard>
          <div id="contact">
            <h2><FiMessageSquare /> Get In Touch</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Have a project idea, opportunity, or just want to say hi? Fill out the form below
              and it'll open your mail client with everything pre-filled.
            </p>
            <ContactForm email={personalInfo.email} />
          </div>
        </FadeCard>

        <footer className="footer">
          <p>© {new Date().getFullYear()} {personalInfo.name} – Built with React + Vite + Particles</p>
        </footer>
      </main>

      {/* ── Project modal ──────────────────────────────────── */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><FiX size={24} /></button>
            <h2>{selectedProject.title}</h2>

            {/* Tech pills inside modal */}
            <div className="project-tech-pills" style={{ marginBottom: "1rem" }}>
              {selectedProject.tech.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>

            <div className={`modal-images ${selectedProject.id === 3 ? "modal-images-phone" : ""}`}>
              {selectedProject.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${selectedProject.title} screenshot ${idx + 1}`}
                  onClick={() => openLightbox(img)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>

            <p className="modal-desc">{selectedProject.fullDesc}</p>

            {selectedProject.features && selectedProject.features.length > 0 && (
              <>
                <h4>Key Features:</h4>
                <ul className="modal-features">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Lightbox ───────────────────────────────────────── */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <FiX size={32} />
          </button>
          <img src={lightboxImage} alt="Expanded view" className="lightbox-image" />
        </div>
      )}
    </div>
  );
}

export default App;