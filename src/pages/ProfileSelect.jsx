import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiquidEther from "../components/LiquidEther";

export default function ProfileSelect() {
  const navigate = useNavigate();
  const [showResume, setShowResume] = useState(false);
  const liquidRef = useRef(null); 

  const profiles = [
    { name: "About Me", route: "/about", img: "/images/about.jpg" },
    { name: "Skills", route: "/skills", img: "/images/skills.jpg" },
    { name: "Projects", route: "/projects", img: "/images/projects.jpg" },
    { name: "Contact", route: "/contact", img: "/images/contact.jpg" },
  ];

  const handleOpenResume = () => {
    setShowResume(true);
    if (liquidRef.current?.pause) liquidRef.current.pause(); 
  };

  const handleCloseResume = () => {
    setShowResume(false);
    if (liquidRef.current?.start) liquidRef.current.start(); // Resume animation
  };

  return (
    <div className="relative bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      {/* 🌊 Smooth Liquid Ether Background */}
      <div className="absolute inset-0 z-0 will-change-transform">
        <LiquidEther
          ref={liquidRef}
          colors={["#E50914", "#6A00FF", "#FF3366"]}
          mouseForce={18}
          cursorSize={95}
          isViscous={false}
          viscous={35}
          iterationsViscous={28}
          iterationsPoisson={28}
          resolution={0.45}
          autoDemo={true}
          autoSpeed={0.45}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3500}
          autoRampDuration={0.6}
        />
      </div>

      {/* 💼 Resume Button */}
      <button
        onClick={handleOpenResume}
        className="absolute top-6 right-8 z-20 px-5 py-2.5 bg-gradient-to-r from-red-600 to-purple-600 
          rounded-lg font-semibold text-white shadow-lg shadow-red-600/40 
          hover:scale-105 hover:shadow-purple-600/50 transition-all duration-300"
      >
        Resume ⬇️
      </button>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-5xl sm:text-6xl font-extrabold mb-14 tracking-wide 
          bg-gradient-to-r from-red-600 via-purple-500 to-pink-400 
          bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,80,0.5)]"
      >
        Choose Your Profile
      </motion.h1>

      {/* Profiles Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-12">
        {profiles.map((profile) => (
          <div
            key={profile.name}
            onClick={() => navigate(profile.route)}
            className="flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={profile.img}
                alt={profile.name}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl border-4 border-transparent object-cover 
                  group-hover:border-red-600 transition-all duration-300 
                  group-hover:brightness-125 shadow-lg shadow-red-600/40"
              />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                group-hover:scale-110 transition-all duration-500 
                bg-gradient-to-r from-red-600 via-purple-600 to-pink-500 blur-md" />
            </div>

            <p className="mt-4 text-lg sm:text-xl font-medium tracking-wide opacity-80 group-hover:opacity-100 transition-all duration-300">
              {profile.name}
            </p>
          </div>
        ))}
      </div>

      {/* 🧾 Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className="relative bg-gray-900 rounded-2xl border border-red-600 p-6 w-full max-w-4xl shadow-2xl">
              <button
                onClick={handleCloseResume}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                ✖
              </button>

              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-red-600 to-purple-500 bg-clip-text text-transparent">
                My Resume
              </h2>

              {/* PDF Viewer */}
              <iframe
                src="/Varun_Singh_Resume.pdf"
                title="Varun Singh Resume"
                className="w-full h-[70vh] rounded-lg border border-gray-700"
              />

              {/* Download Button */}
              <div className="text-center mt-6">
                <a
                  href="/Varun_Singh_Resume.pdf"
                  download
                  className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 
                    text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-red-600/50 
                    transition-all duration-300"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
