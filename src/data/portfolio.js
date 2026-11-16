export const PROFILE = {
  name: "Varun Singh",
  headline: "Software engineer building agentic AI systems",
  subline: "RAG, MCP and tool-using agents. Python, TypeScript, React. Based in Hyderabad.",
  availability: "Open to Forward Deployed Engineer and AI Engineer roles (remote, Hyderabad, Bengaluru, Chennai).",
  email: "the.varun216@gmail.com",
  github: "https://github.com/varuunnn216",
  linkedin: "https://linkedin.com/in/varuunnn216",
};

export const FEATURED_PROJECTS = [
  {
    id: "rag-workbench",
    title: "RAG Workbench",
    status: "Live",
    liveUrl: "https://rag-eval-service.vercel.app/",
    repoUrl: "https://github.com/varuunnn216/rag-eval-service",
    image: "/projects/rag-workbench.webp",
    imageAlt: "RAG Workbench interface showing hybrid retrieval pipeline and evaluation metrics",
    summary:
      "FastAPI + pgvector RAG service with hybrid retrieval (dense + full-text, merged with Reciprocal Rank Fusion), cross-encoder reranking, inline citations and abstention when evidence is weak.",
    tech: ["FastAPI", "PostgreSQL", "pgvector", "Cross-Encoder", "Python", "React"],
    evalLabel: "Own golden set (72 questions: 59 answerable, 13 unanswerable)",
    metrics: [
      { label: "Recall@5", value: "100%" },
      { label: "MRR@5", value: "0.966" },
      { label: "Answer accuracy", value: "73.7%", note: "dense-only 66.2%" },
      { label: "Faithfulness", value: "100%" },
      { label: "Abstention accuracy", value: "92.3%", note: "without rerank 61.5%" },
      { label: "Avg retrieval latency", value: "747 ms" },
    ],
    improvements: [
      "Expand the 72-question golden set with harder multi-hop synthesis queries (multi-hop accuracy is currently 37.4%).",
      "Batch or ONNX-quantize the MiniLM cross-encoder to bring down the 747 ms CPU reranking latency.",
      "Add automated CI regression checks on every pull request.",
    ],
  },
  {
    id: "sdlc-orchestrator",
    title: "SDLC Agent Orchestrator",
    status: "Live",
    liveUrl: "https://sdlc-ai-flow.vercel.app/",
    repoUrl: "https://github.com/varuunnn216/sdlc-agent-orchestrator",
    image: "/projects/sdlc-orchestrator.webp",
    imageAlt: "SDLC Agent Orchestrator interface showing ticket planning, MCP tool steps, and approval gate",
    summary:
      "A human-in-the-loop agent that reads a ticket from a mock backlog, plans, edits a sample React app through scoped MCP tools, verifies with Vitest, and waits for my approval before anything is committed. Multi-provider LLM fallback with retries and quota handling.",
    tech: ["TypeScript", "MCP", "React", "Vitest", "Node.js", "Multi-LLM Fallback"],
    evalLabel: null,
    metrics: [],
    improvements: [
      "Run full held-out evaluation benchmarks across fallback providers to establish baseline pass rates and token budgets.",
      "Add isolated per-ticket branch sandboxing with automatic rollback on failing Vitest suites.",
      "Surface inline multi-file diff previews before human approval.",
    ],
  },
];

export const MORE_PROJECTS = [
  {
    title: "Scientific Compound Data Explorer",
    description: "Interactive chemical compound explorer with D3 visualizations and FastAPI + PostgreSQL backend.",
    liveUrl: "https://scientific-dashboard-ui.vercel.app/",
    repoUrl: "https://github.com/varuunnn216/Scientific-Dashboard",
    image: "/projects/scientific-explorer.webp",
    imageAlt: "Scientific Compound Data Explorer dashboard with D3 charts",
    tech: ["React", "TypeScript", "D3", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Infinity-Plus",
    description: "Responsive pharmacy web application for medicine requests and prescription uploads.",
    repoUrl: "https://github.com/varuunnn216/Infinity-Plus",
    tech: ["Next.js", "Tailwind CSS"],
  },
  {
    title: "URL Shortener",
    description: "Fast URL shortening web server and CLI tool built with Rust and Warp.",
    repoUrl: "https://github.com/varuunnn216/url_shortener",
    tech: ["Rust", "Warp", "CLI"],
  },
  {
    title: "Self-Driving RC Car",
    description: "Autonomous RC car using computer vision and real-time obstacle detection on Raspberry Pi.",
    repoUrl: "https://github.com/varuunnn216/Self-Driving-RC-Car",
    tech: ["Python", "OpenCV", "Raspberry Pi"],
  },
];

export const EXPERIENCE = [
  {
    company: "Accenture",
    location: "Hyderabad",
    role: "Software Developer",
    period: "Feb 2024 – Present",
    points: [
      "On the AI in SDLC team since Feb 2026, building agent workflows that turn tickets into code changes using Claude Code, GitHub Copilot and an MCP server.",
      "Before that, full-stack work on React, Node.js and Python applications.",
    ],
  },
  {
    company: "F6 IT Services",
    location: "",
    role: "Full Stack Developer",
    period: "Jul 2023 – Jan 2024",
    points: [],
  },
];

export const EDUCATION = {
  degree: "B.E. in Information Technology",
  institution: "Chaitanya Bharathi Institute of Technology",
  year: "2023",
};

export const CERTIFICATIONS = [
  { name: "Oracle Certified Agentic AI Foundations Associate", date: "Oct 2026" },
  { name: "Reinvention with Agentic AI, Accenture", date: "Jun 2026" },
];

export const SKILL_GROUPS = [
  {
    group: "AI & Agents",
    items: [
      "RAG (Hybrid RRF)",
      "Cross-Encoder Reranking",
      "MCP (Model Context Protocol)",
      "Tool-Using Agents",
      "Claude Code",
      "GitHub Copilot",
      "Prompt & Eval Harnesses",
    ],
  },
  {
    group: "Backend",
    items: ["Python", "FastAPI", "Node.js", "TypeScript", "REST APIs", "Rust (Warp)"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "D3.js", "HTML5 / CSS3"],
  },
  {
    group: "Data & Infra",
    items: ["PostgreSQL", "pgvector", "Docker", "Git", "CI/CD", "Vitest", "Playwright", "Vercel"],
  },
];
