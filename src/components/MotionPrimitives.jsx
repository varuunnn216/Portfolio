import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Lightweight SplitText for the hero name: keeps opacity: 1 so LCP is never delayed,
 * and disables motion under prefers-reduced-motion.
 */
export function SplitText({ text, className = "" }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, idx) => (
        <span
          key={`${char}-${idx}`}
          aria-hidden="true"
          className="split-char inline-block"
          style={{ animationDelay: `${idx * 24}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/**
 * CountUp triggered once when scrolled into view.
 * Renders exact target value on SSR and when prefers-reduced-motion is enabled.
 */
export function CountUp({ end, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const formattedEnd = `${end.toFixed(decimals)}${suffix}`;
  const [display, setDisplay] = useState(formattedEnd);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      setDisplay(formattedEnd);
      return;
    }

    let rafId = 0;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          started = true;
          observer.disconnect();
          const duration = 650;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = end * eased;
            setDisplay(`${current.toFixed(decimals)}${suffix}`);
            if (t < 1) rafId = requestAnimationFrame(tick);
            else setDisplay(formattedEnd);
          };
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [end, decimals, suffix, formattedEnd]);

  return <span ref={ref}>{display}</span>;
}

/**
 * Simple browser-frame mock (three dots + domain) with fixed 16:10 aspect ratio
 * and optional max-4deg 3D tilt on desktop (disabled on mobile & reduced motion).
 */
export function BrowserFrame({ domain, src, alt, eager = false, href }) {
  const frameRef = useRef(null);

  const handleMove = (e) => {
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-py * 4).toFixed(2);
    const ry = (px * 4).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleLeave = () => {
    const el = frameRef.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  const inner = (
    <div
      ref={frameRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="browser-tilt overflow-hidden rounded-lg border border-border bg-bg transition-transform duration-150 ease-out"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3 py-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
        </div>
        <span className="truncate font-mono text-[11px] text-muted">{domain}</span>
      </div>
      <div className="aspect-[16/10] w-full overflow-hidden bg-surface-2">
        <img
          src={src}
          alt={alt}
          width={1280}
          height={800}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-left-top"
        />
      </div>
    </div>
  );

  if (!href) return inner;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open live ${domain} deployment`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
    >
      {inner}
    </a>
  );
}

/**
 * Accessible accordion with smooth CSS grid-row height transition and rotating chevron.
 */
export function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-bg">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-ink hover:bg-surface-2/60 transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div className={`accordion-content ${open ? "is-open" : ""}`}>
        <div className="overflow-hidden">
          <div className="border-t border-border p-4 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
