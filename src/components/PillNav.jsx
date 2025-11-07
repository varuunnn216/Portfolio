import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import "./PillNav.css";

export default function PillNav({ logo, logoAlt = "Logo" }) {
  const location = useLocation();
  const activeHref = location.pathname;

  // ✅ Removed "Home" from nav items
  const items = [
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoImgRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    // Simple rotation effect on hover
    const img = logoImgRef.current;
    if (!img) return;
    const handleEnter = () => {
      gsap.killTweensOf(img);
      gsap.to(img, { rotation: 360, duration: 0.3, ease: "power2.out" });
    };
    img.addEventListener("mouseenter", handleEnter);
    return () => {
      img.removeEventListener("mouseenter", handleEnter);
      gsap.killTweensOf(img);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  return (
    <div className="pill-nav-container">
      <nav className="pill-nav netflix-nav" aria-label="Main Navigation">
        {/* ✅ Logo now links to home */}
        <Link to="/" className="pill-logo" aria-label="Home">
          {logo ? (
            <img src={logo} alt={logoAlt} ref={logoImgRef} />
          ) : (
            <span className="dev-logo" ref={logoImgRef}>
              {"</>"}
            </span>
          )}
        </Link>

        {/* Desktop Nav Items */}
        <div className="pill-nav-items desktop-only">
          <ul className="pill-list">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`pill ${activeHref === item.href ? "is-active" : ""}`}
                >
                  <span className="pill-text">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-popover mobile-only">
          <ul className="mobile-menu-list">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`mobile-menu-link ${
                    activeHref === item.href ? "is-active" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
