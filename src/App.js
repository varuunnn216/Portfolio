import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProfileSelect from "./pages/ProfileSelect";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import PillNav from "./components/PillNav";
import "./components/PillNav.css";

function AppContent() {
  const location = useLocation();

  // ✅ Only show PillNav if NOT on ProfileSelect ("/")
  const showNav = location.pathname !== "/";

  return (
    <>
      {showNav && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <PillNav />
        </div>
      )}

      <Routes>
        <Route path="/" element={<ProfileSelect />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
