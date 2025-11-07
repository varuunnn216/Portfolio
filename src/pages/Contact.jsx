import GradientBlinds from "../components/GradientBlinds";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* 🔥 Gradient Header Section */}
      <section className="relative flex flex-col items-center justify-center text-center h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
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

        <div className="relative z-10 backdrop-blur-sm bg-black/40 py-12 px-8 rounded-2xl">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            LET'S CONNECT
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have an idea, collaboration, or opportunity? Drop a message — I’d love to hear from you.
          </p>
        </div>
      </section>

      {/* 📩 Contact Form Section */}
      <section className="relative z-10 px-8 py-20 max-w-4xl mx-auto">
        {/* 👋 Intro section above form */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            <b>Let’s Build Something Amazing Together</b>
          </h2>
          <p className="text-gray-400">
            Whether you’re looking to collaborate, hire, or just say hello — I’ll get back to you as soon as I can.
          </p>

          {/* Social icons (quick contact) */}
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="mailto:the.varun216@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-full bg-gray-900/60 border border-gray-800 hover:border-red-600 
              hover:scale-110 transition-all duration-300 text-gray-300 hover:text-white shadow-md"
            >
              <FaEnvelope className="w-6 h-6" />
            </a>

            <a
              href="https://linkedin.com/in/varunn216"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-full bg-gray-900/60 border border-gray-800 hover:border-purple-500 
              hover:scale-110 transition-all duration-300 text-gray-300 hover:text-white shadow-md"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>

            <a
              href="https://github.com/varuunnn216"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-full bg-gray-900/60 border border-gray-800 hover:border-pink-500 
              hover:scale-110 transition-all duration-300 text-gray-300 hover:text-white shadow-md"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* ✉️ Contact Form */}
        <form
          action="https://formspree.io/f/xkgpjkqv"
          method="POST"
          className="bg-gray-900/60 border border-gray-800 rounded-2xl p-10 shadow-lg shadow-red-600/20 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 
                focus:border-red-600 focus:ring-2 focus:ring-red-600/50 outline-none text-gray-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 
                focus:border-red-600 focus:ring-2 focus:ring-red-600/50 outline-none text-gray-200"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 
              focus:border-red-600 focus:ring-2 focus:ring-red-600/50 outline-none text-gray-200 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-purple-600 
            font-semibold text-white text-lg shadow-lg hover:shadow-red-600/40 
            hover:scale-[1.02] transition-all duration-200"
          >
            Send Message 
          </button>
        </form>
      </section>
    </div>
  );
}
