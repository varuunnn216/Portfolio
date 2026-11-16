import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import {
  CERTIFICATIONS,
  COMPACT_PROJECTS,
  EDUCATION,
  EXPERIENCE,
  FEATURED_PROJECTS,
  PROFILE,
  SCIENTIFIC_PROJECT,
  SKILL_GROUPS,
} from "./data/portfolio";
import { RagDiagram, SdlcDiagram } from "./components/ArchitectureDiagrams";
import HeroThreads from "./components/HeroThreads";
import ShinyText from "./components/reactbits/ShinyText";
import Magnet from "./components/reactbits/Magnet";
import { Accordion, BrowserFrame, CountUp, SplitText } from "./components/MotionPrimitives";

const HAS_RESUME = typeof __HAS_RESUME__ !== "undefined" && __HAS_RESUME__;

const NAV_ITEMS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

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
            const delay = entry.target.getAttribute("data-reveal-delay");
            if (delay) entry.target.style.transitionDelay = `${delay}ms`;
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
  const [activeSection, setActiveSection] = useState("projects");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroInView, setHeroInView] = useState(true);
  const [heroFade, setHeroFade] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [reachedJobs, setReachedJobs] = useState({});

  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setTheme(current);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    const updateEnv = () => {
      setIsDesktop(window.innerWidth >= 768);
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    updateEnv();
    window.addEventListener("resize", updateEnv, { passive: true });
    return () => window.removeEventListener("resize", updateEnv);
  }, []);

  // Legacy route support (/projects, /about, /skills, /contact)
  useEffect(() => {
    const routeToId = {
      "/projects": "projects",
      "/about": "about",
      "/skills": "skills",
      "/contact": "contact",
    };
    const targetId = routeToId[window.location.pathname];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Hero IntersectionObserver (unmount Threads WebGL when hero leaves viewport)
  useEffect(() => {
    const el = heroRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setHeroInView(entries.some((e) => e.isIntersecting));
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll progress bar, hero fade, ambient glow shift, and timeline draw
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(1, Math.max(0, scrollY / docHeight));
      setScrollProgress(pct);
      document.documentElement.style.setProperty("--scroll-pct", pct.toFixed(3));

      if (heroRef.current) {
        const heroH = Math.max(1, heroRef.current.offsetHeight);
        setHeroFade(Math.max(0, Math.min(1, 1 - scrollY / (heroH * 0.85))));
      }

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const viewAnchor = window.innerHeight * 0.72;
        const progress = Math.min(1, Math.max(0, (viewAnchor - rect.top) / Math.max(1, rect.height)));
        setTimelineProgress(progress);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking for sticky nav
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Experience timeline dots light up when reached
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const items = Array.from(document.querySelectorAll("[data-job-id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-job-id");
            if (id) setReachedJobs((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0.2 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // ignore storage errors
      }
    };

    if (!reducedMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  const magnetDisabled = !isDesktop || reducedMotion;

  return (
    <div id="top" className="page-fade-in relative min-h-screen bg-bg text-ink selection:bg-accent selection:text-bg">
      {/* Ambient static noise & scroll-linked radial glow */}
      <div aria-hidden="true" className="page-ambient-glow pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="page-noise-overlay pointer-events-none fixed inset-0 z-0" />

      {/* Top scroll progress bar */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none"
        >
          <div
            className="h-full bg-accent origin-left transition-transform duration-75"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      )}

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
          className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6"
        >
          <a
            href="#top"
            className="text-sm font-semibold tracking-tight text-ink hover:text-muted transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            {PROFILE.name}
          </a>

          <div className="flex items-center gap-2 sm:gap-5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative px-1.5 py-1 text-xs sm:text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded ${
                    isActive ? "text-ink font-medium" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-accent transition-all duration-200 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </a>
              );
            })}

            {HAS_RESUME && (
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-ink hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Resume
              </a>
            )}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="btn-press inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted hover:text-ink hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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

      <main id="main" className="relative z-10">
        {/* 1. Hero (full-width background, constrained content) */}
        <section
          ref={heroRef}
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-border"
        >
          <HeroThreads inView={heroInView} scrollFade={heroFade} isDark={theme === "dark"} />

          <div className="relative z-10 mx-auto max-w-5xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-12">
            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
              AI Engineer · Forward Deployed Engineer
            </p>
            <h1
              id="hero-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-ink"
            >
              {reducedMotion ? PROFILE.name : <SplitText text={PROFILE.name} />}
            </h1>
            <p className="mt-3 text-xl sm:text-2xl font-medium tracking-tight">
              <ShinyText
                text={PROFILE.headline}
                color={theme === "dark" ? "#a1a1aa" : "#52525b"}
                shineColor={theme === "dark" ? "#fafafa" : "#09090b"}
                speed={3.2}
                delay={1.2}
                disabled={reducedMotion}
              />
            </p>
            <p className="mt-3 max-w-2xl text-base text-muted leading-relaxed">
              {PROFILE.subline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Magnet padding={40} magnetStrength={4} disabled={magnetDisabled}>
                <a
                  href="#projects"
                  className="btn-press inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  View projects
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnet>
              <Magnet padding={40} magnetStrength={4} disabled={magnetDisabled}>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="btn-press inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Contact
                </a>
              </Magnet>
              <div className="flex items-center gap-4 pl-1 sm:pl-2">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>

            <p className="mt-5 flex items-start sm:items-center gap-2 text-sm text-muted">
              <span
                className="mt-1.5 sm:mt-0 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span>{PROFILE.availability}</span>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* About */}
          <section id="about" aria-labelledby="about-heading" className="py-14 border-b border-border">
            <h2
              id="about-heading"
              data-reveal
              className="font-mono text-xs uppercase tracking-wider text-muted mb-4"
            >
              About
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-8 items-start">
              <p
                data-reveal
                className="max-w-[65ch] text-base sm:text-[17px] text-ink/90 leading-[1.85]"
              >
                {PROFILE.about}
              </p>

              <aside
                aria-label="At a glance"
                data-reveal
                data-reveal-delay={90}
                className="w-full rounded-[16px] border border-border bg-surface overflow-hidden"
              >
                <dl className="grid grid-cols-1 min-[560px]:grid-cols-2 auto-rows-fr gap-px bg-border">
                  <div className="bg-surface p-5 flex flex-col justify-start">
                    <dt className="font-mono text-[11px] leading-none uppercase tracking-[0.06em] text-muted">
                      Location
                    </dt>
                    <dd className="mt-4 text-[16px] font-semibold leading-snug text-ink">
                      Hyderabad, India
                    </dd>
                  </div>

                  <div className="bg-surface p-5 flex flex-col justify-start">
                    <dt className="font-mono text-[11px] leading-none uppercase tracking-[0.06em] text-muted">
                      Experience
                    </dt>
                    <dd className="mt-4 text-[16px] font-semibold leading-snug text-ink">
                      3+ years, full-stack
                    </dd>
                  </div>

                  <div className="bg-surface p-5 flex flex-col justify-start">
                    <dt className="font-mono text-[11px] leading-none uppercase tracking-[0.06em] text-muted">
                      Current
                    </dt>
                    <dd className="mt-4 text-[16px] font-semibold leading-snug text-ink">
                      AI in SDLC team, Accenture
                      <span className="block mt-1 text-xs font-normal text-muted">
                        since Feb 2026
                      </span>
                    </dd>
                  </div>

                  <div className="bg-surface p-5 flex flex-col justify-start">
                    <dt className="font-mono text-[11px] leading-none uppercase tracking-[0.06em] text-muted">
                      Focus
                    </dt>
                    <dd className="mt-4 text-[16px] font-semibold leading-snug text-ink">
                      RAG, MCP and tool-using agents
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </section>

          {/* 2. Featured Projects */}
          <section id="projects" aria-labelledby="projects-heading" className="py-14 border-b border-border">
            <div data-reveal className="flex items-baseline justify-between gap-4 mb-8">
              <h2 id="projects-heading" className="text-2xl font-bold tracking-tight text-ink">
                Featured Projects
              </h2>
              <span className="font-mono text-xs text-muted">Live systems &amp; evals</span>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {FEATURED_PROJECTS.map((project, idx) => (
                <article
                  key={project.id}
                  data-reveal
                  data-reveal-delay={idx * 80}
                  onMouseMove={handleCardMouseMove}
                  className="spotlight-card rounded-xl border border-border bg-surface p-5 sm:p-6 transition-colors duration-150 hover:border-muted/50"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Browser Frame Screenshot */}
                    <div className="lg:col-span-5">
                      <BrowserFrame
                        domain={project.domain}
                        src={project.image}
                        alt={project.imageAlt}
                        href={project.liveUrl}
                        eager={true}
                      />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-5">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-xl font-bold tracking-tight text-ink">
                              {project.title}
                            </h3>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                                aria-hidden="true"
                              />
                              {project.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-press inline-flex items-center gap-1 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-bg hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                              Live demo
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-press inline-flex items-center gap-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                        <ul
                          className="mt-4 flex flex-wrap gap-2"
                          aria-label={`${project.title} technologies`}
                        >
                          {project.tech.map((t) => (
                            <li
                              key={t}
                              className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>

                        {/* Verified Eval Metrics with CountUp */}
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
                                    <CountUp
                                      end={m.end}
                                      decimals={m.decimals}
                                      suffix={m.suffix}
                                    />
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

                      {/* Smooth Accordion */}
                      <Accordion title="How it works & what I would improve">
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
                      </Accordion>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Other Projects */}
            <h3 data-reveal className="mt-12 mb-5 text-lg font-semibold tracking-tight text-ink">
              Other Projects
            </h3>

            {/* Live Browser-Frame Card */}
            <article
              data-reveal
              onMouseMove={handleCardMouseMove}
              className="spotlight-card mb-4 rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:border-muted/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-5">
                  <BrowserFrame
                    domain={SCIENTIFIC_PROJECT.domain}
                    src={SCIENTIFIC_PROJECT.image}
                    alt={SCIENTIFIC_PROJECT.imageAlt}
                    href={SCIENTIFIC_PROJECT.liveUrl}
                  />
                </div>
                <div className="md:col-span-7 flex flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-semibold text-ink">
                      {SCIENTIFIC_PROJECT.title}
                    </h4>
                    <div className="flex shrink-0 items-center gap-2.5">
                      <a
                        href={SCIENTIFIC_PROJECT.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        Live
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      <a
                        href={SCIENTIFIC_PROJECT.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        Repo
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {SCIENTIFIC_PROJECT.description}
                  </p>
                  <ul
                    className="flex flex-wrap gap-1.5"
                    aria-label={`${SCIENTIFIC_PROJECT.title} stack`}
                  >
                    {SCIENTIFIC_PROJECT.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            {/* Equal-height Compact Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {COMPACT_PROJECTS.map((project, idx) => (
                <article
                  key={project.title}
                  data-reveal
                  data-reveal-delay={idx * 70}
                  onMouseMove={handleCardMouseMove}
                  className="spotlight-card flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:border-muted/50"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-base font-semibold text-ink">{project.title}</h4>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        Repo
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <ul
                    className="mt-4 flex flex-wrap gap-1.5"
                    aria-label={`${project.title} stack`}
                  >
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
          <section id="experience" aria-labelledby="experience-heading" className="py-14 border-b border-border">
            <h2
              id="experience-heading"
              data-reveal
              className="text-2xl font-bold tracking-tight text-ink mb-8"
            >
              Experience &amp; Education
            </h2>

            <div ref={timelineRef} className="relative space-y-8 pl-6">
              {/* Static track */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-1.5 bottom-1.5 w-px bg-border"
              />
              {/* Scroll-drawn active line */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-1.5 bottom-1.5 w-px bg-accent origin-top transition-transform duration-150"
                style={{
                  transform: `scaleY(${reducedMotion ? 1 : timelineProgress})`,
                }}
              />

              {EXPERIENCE.map((job) => {
                const isLit = reducedMotion || Boolean(reachedJobs[job.id]);
                return (
                  <div
                    key={`${job.company}-${job.period}`}
                    data-job-id={job.id}
                    data-reveal
                    className="relative"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                        isLit
                          ? "border-accent bg-ink"
                          : "border-border bg-surface-2"
                      }`}
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
                    {job.metrics && job.metrics.length > 0 && (
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {job.metrics.map((metric) => (
                          <li
                            key={metric}
                            className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink"
                          >
                            {metric}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
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

              <div data-reveal data-reveal-delay={80} className="rounded-xl border border-border bg-surface p-5">
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
          <section id="skills" aria-labelledby="skills-heading" className="py-14 border-b border-border">
            <h2
              id="skills-heading"
              data-reveal
              className="text-2xl font-bold tracking-tight text-ink mb-8"
            >
              Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SKILL_GROUPS.map((group, idx) => (
                <div
                  key={group.group}
                  data-reveal
                  data-reveal-delay={idx * 70}
                  className="h-full rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:border-muted/50"
                >
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
                    {group.group}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-ink/90 hover:text-ink hover:translate-x-0.5 transition-all duration-150"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Contact */}
          <section id="contact" aria-labelledby="contact-heading" className="py-14">
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
                  className="btn-press inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {PROFILE.email}
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 7. Footer */}
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 text-sm text-muted">
          <p>{PROFILE.name} · 2026</p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${PROFILE.email}`}
              className="hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Email
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
