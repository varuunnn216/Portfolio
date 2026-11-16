import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  FileText,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  FEATURED_PROJECTS,
  MORE_PROJECTS,
  PROFILE,
  SKILL_GROUPS,
} from "./data/portfolio";
import { RagDiagram, SdlcDiagram } from "./components/ArchitectureDiagrams";

const HAS_RESUME = typeof __HAS_RESUME__ !== "undefined" && __HAS_RESUME__;

function handleCardMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
}

function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (prefersReduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    nodes.forEach((n) => {
      const rect = n.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        n.classList.add("is-visible");
      } else {
        n.classList.add("reveal-init");
      }
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    nodes.forEach((n) => {
      if (n.classList.contains("reveal-init")) observer.observe(n);
    });
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [theme, setTheme] = useState("dark");

  useScrollReveal();

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setTheme(current);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const routeToId = {
      "/projects": "projects",
      "/about": "experience",
      "/skills": "skills",
      "/contact": "contact",
    };
    const targetId = routeToId[window.location.pathname];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <div id="top" className="min-h-screen bg-bg text-ink selection:bg-accent selection:text-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-ink focus:ring-2 focus:ring-accent"
      >
        Skip to content
      </a>

      {/* Sticky Minimal Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6"
        >
          <a
            href="#top"
            className="text-sm font-semibold tracking-tight text-ink hover:text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            {PROFILE.name}
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#projects"
              className="text-sm text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="text-sm text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-sm text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Contact
            </a>
            {HAS_RESUME && (
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-ink hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Resume
              </a>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted hover:text-ink hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* 1. Hero */}
        <section aria-labelledby="hero-heading" className="pt-14 pb-16 sm:pt-20 sm:pb-20 border-b border-border">
          <p className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
            AI Engineer · Forward Deployed Engineer
          </p>
          <h1
            id="hero-heading"
            className="hero-name-animate text-3xl sm:text-5xl font-bold tracking-tight text-ink"
          >
            {PROFILE.name}
          </h1>
          <p className="mt-3 text-xl sm:text-2xl font-medium tracking-tight text-accent">
            {PROFILE.headline}
          </p>
          <p className="mt-3 max-w-2xl text-base text-muted leading-relaxed">
            {PROFILE.subline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              View projects
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact
            </a>
            <div className="flex items-center gap-4 pl-1 sm:pl-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </div>

          <p className="mt-6 flex items-start sm:items-center gap-2 text-sm text-muted">
            <span
              className="mt-1.5 sm:mt-0 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span>{PROFILE.availability}</span>
          </p>
        </section>

        {/* 2. Featured Projects */}
        <section id="projects" aria-labelledby="projects-heading" className="py-16 border-b border-border">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2 id="projects-heading" className="text-2xl font-bold tracking-tight text-ink">
              Featured Projects
            </h2>
            <span className="font-mono text-xs text-muted">Live systems &amp; evals</span>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {FEATURED_PROJECTS.map((project) => (
              <article
                key={project.id}
                data-reveal
                onMouseMove={handleCardMouseMove}
                className="spotlight-card rounded-xl border border-border bg-surface overflow-hidden transition-colors hover:border-muted/50"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Screenshot */}
                  <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border bg-surface-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                      aria-label={`Open live ${project.title} deployment`}
                    >
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        width={1200}
                        height={750}
                        loading="eager"
                        decoding="async"
                        className="h-56 sm:h-64 lg:h-full w-full object-cover object-top"
                      />
                    </a>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-xl font-bold tracking-tight text-ink">
                            {project.title}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                            {project.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-bg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            Live demo
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink hover:border-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            <Github className="h-3.5 w-3.5" aria-hidden="true" />
                            Repo
                          </a>
                        </div>
                      </div>

                      <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Tech tags */}
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                        {project.tech.map((t) => (
                          <li
                            key={t}
                            className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>

                      {/* Verified Eval Metrics (if present) */}
                      {project.metrics.length > 0 && (
                        <div className="mt-5 rounded-lg border border-border bg-bg p-4">
                          <p className="font-mono text-xs text-muted mb-3">
                            {project.evalLabel}
                          </p>
                          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {project.metrics.map((m) => (
                              <div key={m.label}>
                                <dt className="text-xs text-muted">{m.label}</dt>
                                <dd className="mt-0.5 font-mono text-sm font-semibold text-ink">
                                  {m.value}
                                  {m.note && (
                                    <span className="block text-[11px] font-normal text-muted">
                                      {m.note}
                                    </span>
                                  )}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )}
                    </div>

                    {/* Expandable How it works */}
                    <details className="group rounded-lg border border-border bg-bg">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-2/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg">
                        <span>How it works &amp; what I would improve</span>
                        <ChevronDown
                          className="h-4 w-4 text-muted transition-transform duration-200 group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <div className="border-t border-border p-4 space-y-4">
                        <div className="overflow-x-auto">
                          {project.id === "rag-workbench" ? <RagDiagram /> : <SdlcDiagram />}
                        </div>
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                            What I would improve
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted">
                            {project.improvements.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Smaller Project Cards */}
          <h3 className="mt-12 mb-5 text-lg font-semibold tracking-tight text-ink">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MORE_PROJECTS.map((project) => (
              <article
                key={project.title}
                data-reveal
                onMouseMove={handleCardMouseMove}
                className="spotlight-card flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-muted/50"
              >
                <div>
                  {project.image && (
                    <div className="mb-4 overflow-hidden rounded-lg border border-border bg-surface-2">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        width={1200}
                        height={750}
                        loading="lazy"
                        decoding="async"
                        className="h-40 w-full object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-semibold text-ink">{project.title}</h4>
                    <div className="flex shrink-0 items-center gap-2.5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                        >
                          Live
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        Repo
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.title} stack`}>
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Experience */}
        <section id="experience" aria-labelledby="experience-heading" className="py-16 border-b border-border">
          <h2 id="experience-heading" className="text-2xl font-bold tracking-tight text-ink mb-8">
            Experience &amp; Education
          </h2>

          <div className="space-y-8 border-l border-border pl-6">
            {EXPERIENCE.map((job) => (
              <div key={`${job.company}-${job.period}`} data-reveal className="relative">
                <span
                  className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-border bg-surface-2"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-ink">
                    {job.role} · {job.company}
                    {job.location ? `, ${job.location}` : ""}
                  </h3>
                  <span className="font-mono text-xs text-muted">{job.period}</span>
                </div>
                {job.points.length > 0 && (
                  <ul className="mt-2.5 space-y-1.5 text-sm text-muted leading-relaxed list-disc pl-4">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div data-reveal className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                Education
              </h3>
              <p className="text-sm font-semibold text-ink">{EDUCATION.degree}</p>
              <p className="mt-1 text-sm text-muted">
                {EDUCATION.institution} · {EDUCATION.year}
              </p>
            </div>

            <div data-reveal className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                Certifications
              </h3>
              <ul className="space-y-1.5 text-sm text-muted">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.name} className="flex flex-wrap justify-between gap-2">
                    <span className="text-ink">{cert.name}</span>
                    <span className="font-mono text-xs text-muted">{cert.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Skills */}
        <section id="skills" aria-labelledby="skills-heading" className="py-16 border-b border-border">
          <h2 id="skills-heading" className="text-2xl font-bold tracking-tight text-ink mb-8">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.group}
                data-reveal
                className="rounded-xl border border-border bg-surface p-5"
              >
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
                  {group.group}
                </h3>
                <ul className="space-y-1.5 text-sm text-ink">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="py-16">
          <div
            data-reveal
            className="rounded-xl border border-border bg-surface p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div>
              <h2 id="contact-heading" className="text-2xl font-bold tracking-tight text-ink">
                Get in touch
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted">
                Best reached by email for AI Engineer or Forward Deployed Engineer roles.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {PROFILE.email}
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink hover:border-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink hover:border-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 text-sm text-muted">
          <p>
            {PROFILE.name} · 2026
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${PROFILE.email}`}
              className="hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Email
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
