import GradientBlinds from "../components/GradientBlinds";

export default function Skills() {
  const skillsData = [
    {
      title: "Frontend Development",
      description:
        "Building high-performance, responsive, and accessible web interfaces that scale beautifully across devices.",
      items: [
        "React.js",
        "JavaScript (ES6+)",
        "TypeScript",
        "Angular",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "TailwindCSS",
      ],
    },
    {
      title: "Backend & Frameworks",
      description:
        "Designing robust APIs and backend systems focused on scalability, performance, and clean architecture.",
      items: [
        "Node.js",
        "Express.js",
        "ASP.NET Core",
        "C#",
        "Python",
        "Java",
        "RESTful APIs",
        "Microservices",
      ],
    },
    {
      title: "DevOps & Tools",
      description:
        "Automating workflows and optimizing deployments using CI/CD, containerization, and monitoring tools.",
      items: [
        "GitLab CI/CD",
        "Docker",
        "AWS (S3, Lambda)",
        "Firebase",
        "Postman",
        "Git",
        "SonarQube",
        "Xray",
      ],
    },
    {
      title: "Core CS & System Design",
      description:
        "Leveraging computer science principles to build scalable systems with optimal algorithms and clean abstractions.",
      items: [
        "Data Structures & Algorithms",
        "Object-Oriented Design",
        "System Design",
        "Distributed Systems",
      ],
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">

      {/* 🔥 Gradient Blinds Background (Header Only) */}
      <section className="relative flex flex-col items-center justify-center text-center h-[60vh] overflow-hidden">
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <GradientBlinds
            gradientColors={["#E50914", "#6A00FF", "#FF3366"]}
            angle={0}
            noise={0.25}
            blindCount={12}
            blindMinWidth={60}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={0.9}
            mouseDampening={0.2}
            distortAmount={0.3}
            shineDirection="left"
            mixBlendMode="screen"
          />
        </div>

        {/* Foreground Title */}
        <div className="relative z-10 backdrop-blur-sm bg-black/40 py-12 px-8 rounded-2xl shadow-[0_0_30px_rgba(229,9,20,0.4)]">
          <h1 className="text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-red-600 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,0,80,0.5)]">
            MY TECHNICAL ARSENAL
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Core technologies and frameworks I leverage to build fast, scalable,
            and modern applications.
          </p>
        </div>
      </section>

      {/* 🧱 Skills Section */}
      <section className="relative z-10 px-8 py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillsData.map((category) => (
            <div
              key={category.title}
              className="relative bg-gray-900/60 border border-gray-800 rounded-2xl p-8 
              hover:border-red-600 hover:shadow-[0_0_30px_rgba(255,0,80,0.3)] 
              hover:scale-[1.03] transition-all duration-300 backdrop-blur-md"
            >
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_12px_rgba(255,0,80,0.4)]">
                {category.title}
              </h2>
              <p className="text-gray-400 mb-6">{category.description}</p>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-800/80 text-sm px-4 py-2 rounded-full 
                    hover:bg-red-600/80 hover:text-white transition-all duration-200 
                    shadow-sm shadow-red-900/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 💡 Engineering Philosophy */}
        <div
          className="text-center mt-24 bg-gradient-to-b from-gray-900/50 to-black/70 
          border border-gray-800 rounded-2xl py-12 px-6 backdrop-blur-md"
        >
          <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-red-600 to-purple-500 bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_18px_rgba(255,0,80,0.4)]">
            My Software Engineering Philosophy
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
            I craft software with the mindset of scalability, clarity, and performance.  
            Every component, API, and deployment pipeline I build aims to simplify complexity  
            and deliver real-world impact. Clean code and thoughtful architecture aren’t just goals —  
            they’re my default.
          </p>
        </div>
      </section>
    </div>
  );
}
