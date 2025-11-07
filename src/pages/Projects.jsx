import { useEffect, useState, useRef } from "react";
import GradientBlinds from "../components/GradientBlinds";

export default function Projects() {
  const projectCategories = [
    {
      title: "Featured Project",
      // subtitle: "Chromatic – A Netflix Clone",
      description:
        "A Netflix-inspired streaming platform built using React. Showcases dynamic content rendering, smooth UI transitions, and scalable frontend architecture.",
      projects: [
        {
          title: "Chromatic (Netflix Clone)",
          img: "/images/chromatic.jpg",
          link: "https://github.com/varuunnn216/Chromatic",
          tech: ["React", "JavaScript", "TMDB API", "CSS"],
        },
      ],
    },
    {
      title: "Web Applications",
      description:
        "Interactive web applications focused on engaging user experience and responsive design.",
      projects: [
        {
          title: "Pizzeria Website",
          img: "/images/pizza.jpg",
          link: "https://github.com/varuunnn216/Pizzeria",
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          title: "Slot Machine Game",
          img: "/images/slotmachine.jpg",
          link: "https://github.com/varuunnn216/Slot-Machine",
          tech: ["React", "JavaScript", "CSS Animations"],
        },
      ],
    },
    {
      title: "Systems & Backend",
      description:
        "Low-level and backend-focused projects showcasing performance, logic, and reliability.",
      projects: [
        {
          title: "URL Shortener",
          img: "/images/urlshortener.jpg",
          link: "https://github.com/varuunnn216/url_shortener",
          tech: ["Rust", "Warp", "Web Server", "CLI"],
        },
        {
          title: "Task Manager (CLI App)",
          img: "/images/taskmanager.jpg",
          link: "https://github.com/varuunnn216/Task-Manager",
          tech: ["C++", "File Handling", "OOP"],
        },
      ],
    },
    {
      title: "AI & IoT",
      description:
        "Integrating artificial intelligence and IoT to build autonomous and intelligent systems.",
      projects: [
        {
          title: "Self-Driving RC Car",
          img: "/images/rc.jpg",
          link: "https://github.com/varuunnn216/Self-Driving-RC-Car",
          tech: ["Python", "IoT", "Raspberry Pi", "OpenCV"],
        },
      ],
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Gradient Header Section */}
      <div className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GradientBlinds
            gradientColors={["#E50914", "#6A00FF"]}
            angle={0}
            noise={0.25}
            blindCount={14}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={0.9}
            mouseDampening={0.15}
            distortAmount={0.25}
            shineDirection="left"
            mixBlendMode="screen"
          />
        </div>

        <div className="relative z-10 backdrop-blur-sm bg-black/40 py-12 px-8 rounded-2xl shadow-[0_0_30px_rgba(229,9,20,0.4)]">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            MY PROJECTS
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
            A collection of the projects I’ve crafted — blending creativity,
            engineering, and real-world problem-solving.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 space-y-24">
        {projectCategories.map((category) => (
          <div key={category.title} className="space-y-10">
            {/* Category Header */}
            <div className="text-center">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-red-600 to-purple-500 bg-clip-text text-transparent">
                <b>{category.title}</b>
              </h2>
              {category.subtitle && (
                <p className="text-xl text-gray-300 mt-2">{category.subtitle}</p>
              )}
              <p className="text-gray-400 mt-3 max-w-3xl mx-auto">
                {category.description}
              </p>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {category.projects.map((project) => (
                <LazyProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🖼️ Lazy Loading Component with Blur-up effect */
function LazyProjectCard({ project }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-red-600 transition-colors duration-200"
    >
      {isVisible ? (
        <a href={project.link} target="_blank" rel="noreferrer" className="block">
          <div className="relative w-full h-48 bg-gray-800">
            <img
              src={project.img}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                loaded ? "opacity-100 blur-0" : "opacity-50 blur-md"
              }`}
              onLoad={() => setLoaded(true)}
            />
          </div>

          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2 text-white">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-gray-800 px-3 py-1 rounded-full text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </a>
      ) : (
        <div className="w-full h-48 bg-gray-800 animate-pulse rounded-t-2xl" />
      )}
    </div>
  );
}
