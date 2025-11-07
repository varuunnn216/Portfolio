import GradientBlinds from "../components/GradientBlinds";

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      

      {/* Hero Section with GradientBlinds Background */}
      <section className="relative flex flex-col items-center justify-center text-center h-[70vh] px-6">
        {/* Animated Gradient Background */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <GradientBlinds
            gradientColors={["#E50914", "#6A00FF"]} // Netflix red + purple
            angle={15}
            noise={0.25}
            blindCount={12}
            blindMinWidth={60}
            spotlightRadius={0.55}
            spotlightSoftness={1}
            spotlightOpacity={0.9}
            mouseDampening={0.15}
            distortAmount={0.3}
            shineDirection="right"
            mixBlendMode="screen"
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 px-6 backdrop-blur-sm bg-black/40 py-10 rounded-xl shadow-xl">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-purple-500 to-blue-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
            VARUN SINGH
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Software Development Engineer at{" "}
            <span className="text-red-500 font-semibold">Accenture</span> — 
            driven by a passion for building reliable, scalable, and high-performance
            systems that solve real-world problems with clean architecture and efficient code.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-16 space-y-20 bg-black/30 backdrop-blur-sm rounded-2xl shadow-2xl">

        {/* Professional Summary */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2 border-l-4 border-red-600 pl-3">
            <b>Professional Summary</b>
          </h2>
          <p className="text-gray-300 leading-relaxed text-justify">
            I’m a results-oriented <span className="text-white font-semibold">Software Engineer</span> 
            with a strong foundation in full-stack web development, API design, and scalable 
            backend architecture. Over the past 1.5 years at{" "}
            <span className="text-white font-semibold">Accenture</span>, I’ve contributed to
            enterprise-level applications that handle thousands of requests efficiently using{" "}
            <span className="text-white font-semibold">React, Node.js, and .NET</span>.
            <br />
            <br />
            My primary focus is on building distributed systems, optimizing server performance,
            automating CI/CD workflows, and ensuring seamless user experiences. I enjoy 
            transforming complex requirements into robust, maintainable, and production-grade solutions.
            <br />
            <br />
            I’m continuously improving my skills in algorithms, data structures, system design, 
            and cloud-native development — preparing myself for the next challenge as an 
            <span className="text-red-500 font-semibold"> SDE at a product-driven company</span>.
          </p>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-2 border-l-4 border-red-600 pl-3">
            <b>Technical Skills</b>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
            {[
              "React.js", "Node.js", "Express.js", "MongoDB",
              "C#", "ASP.NET Core", "Docker", "GitLab CI/CD",
              "AWS", "TypeScript", "Python", "SQL",
              "System Design", "REST APIs", "Microservices", "Kubernetes",
            ].map((skill) => (
              <div
                key={skill}
                className="bg-gray-900/80 rounded-xl py-3 px-4 text-sm font-medium border border-gray-800 
                hover:border-red-500 hover:bg-red-600/20 hover:scale-105 transition-all duration-300 shadow-md"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-2 border-l-4 border-red-600 pl-3">
            <b>Work Experience</b>
          </h2>

          {/* Accenture */}
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Accenture</h3>
            <p className="text-gray-400 text-sm">Software Developer | Feb 2024 – Present</p>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed pl-3">
              <li>Engineered high-performance backend APIs using Node.js and C# to support scalable web applications.</li>
              <li>Boosted system performance by 30% through optimized queries and asynchronous design patterns.</li>
              <li>Implemented automated CI/CD pipelines using Docker and GitLab, reducing deployment time by 75%.</li>
              <li>Collaborated in Agile teams to ship 10+ enterprise-grade features with rigorous testing and reviews.</li>
            </ul>
          </div>

          {/* PHN Technology */}
          <div className="mt-10 space-y-3">
            <h3 className="text-2xl font-semibold text-white">PHN Technology</h3>
            <p className="text-gray-400 text-sm">Full Stack Developer Intern | Apr 2023 – Jun 2023</p>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed pl-3">
              <li>Developed full-stack React/Node.js projects with clean, modular ES6 components.</li>
              <li>Improved API reliability through advanced error handling and performance logging.</li>
              <li>Delivered 3+ feature-rich applications improving client response time by over 40%.</li>
            </ul>
          </div>
        </section>

        {/* Education & Certifications */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-2 border-l-4 border-red-600 pl-3">
            <b>Education & Certifications</b>
          </h2>

          <p className="text-gray-300 mb-4">
            <span className="text-white font-semibold">
              B.E. in Information Technology
            </span>{" "}
            — Chaitanya Bharathi Institute of Technology (2019–2023)
          </p>

          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-3">
            <li>Accenture MEAN Stack Development Training</li>
            <li>Google Cloud Digital Leader Training</li>
            <li>Meta Front-End Development Certification</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
