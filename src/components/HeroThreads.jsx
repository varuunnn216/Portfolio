import { Suspense, lazy, useEffect, useState } from "react";

const LazyThreads = lazy(() => import("./reactbits/Threads.jsx"));

function supportsWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

/**
 * Lazy-loaded React Bits Threads background for the hero.
 * - Only mounts on desktop (>= 768px), non-reduced-motion, WebGL2-capable browsers
 * - Unmounts when the hero leaves the viewport (controlled via `inView`)
 * - Fades out smoothly as the user scrolls down (`scrollFade`)
 * - Falls back to static dark/light gradient + faint CSS line pattern otherwise
 */
export default function HeroThreads({ inView, scrollFade, isDark }) {
  const [canRenderCanvas, setCanRenderCanvas] = useState(false);

  useEffect(() => {
    const check = () => {
      const wideEnough = window.innerWidth >= 768;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setCanRenderCanvas(wideEnough && !reduced && supportsWebGL2());
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const lineColor = isDark ? "#a1a1aa" : "#52525b";
  const accentColor = isDark ? "#fafafa" : "#18181b";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: scrollFade }}
    >
      {/* Static CSS fallback (always present underneath and for mobile / reduced motion) */}
      <div className="hero-fallback-bg absolute inset-0" />

      {canRenderCanvas && inView && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-35">
            <LazyThreads
              color={lineColor}
              accentColor={accentColor}
              amplitude={0.85}
              distance={0.22}
              count={24}
              speed={0.45}
              enableMouseInteraction={true}
              parting={0.18}
              fade={0.35}
              brightness={1.1}
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}
