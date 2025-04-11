import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Palette,
  Globe,
  Terminal,
  ChevronUp,
  ChevronDown,
  X,
  Sun,
  Moon,
} from "lucide-react";
import supabase from "../config/supabaseClient";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("Error fetching projects:", error.message);
      } else {
        setProjectsData(data || []);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Reset activeProject if it's out of bounds after data loads
    if (projectsData.length > 0 && activeProject >= projectsData.length) {
      setActiveProject(0);
    }
  }, [projectsData, activeProject]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme management
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const nextProject = () => {
    if (projectsData.length === 0) return;
    setActiveProject((prev) => (prev + 1) % projectsData.length);
  };

  const prevProject = () => {
    if (projectsData.length === 0) return;
    setActiveProject(
      (prev) => (prev - 1 + projectsData.length) % projectsData.length
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? theme === "dark"
              ? "bg-black/80 backdrop-blur-md py-4"
              : "bg-white/80 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            Aaqeeb Hussain
          </span>
          <div className="flex gap-6 items-center">
            <a
              href="#work"
              className={`transition-colors ${
                theme === "dark"
                  ? "hover:text-emerald-400"
                  : "hover:text-emerald-600"
              }`}
            >
              Work
            </a>
            <a
              href="#skills"
              className={`transition-colors ${
                theme === "dark"
                  ? "hover:text-emerald-400"
                  : "hover:text-emerald-600"
              }`}
            >
              Skills
            </a>
            <a
              href="#contact"
              className={`transition-colors ${
                theme === "dark"
                  ? "hover:text-emerald-400"
                  : "hover:text-emerald-600"
              }`}
            >
              Contact
            </a>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                  : "bg-gray-200 hover:bg-gray-300 text-blue-900"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 w-full h-full">
          <div
            className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black"
                : "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-white to-white"
            }`}
          />
          <div
            className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-black via-transparent to-black"
                : "bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-white via-transparent to-white"
            }`}
          />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="block">Turning Ideas</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              Into Reality
            </span>
          </h1>
          <p
            className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Full-stack developer crafting exceptional digital experiences
            through clean code and innovative design
          </p>
          <div className="flex gap-6 justify-center">
            <SocialLink
              theme={theme}
              href="https://github.com/aaqeebh1"
              icon={<Github />}
              label="GitHub"
            />
            <SocialLink
              theme={theme}
              href="https://www.linkedin.com/in/aaqeebhussain/"
              icon={<Linkedin />}
              label="LinkedIn"
            />
            <SocialLink
              theme={theme}
              href="mailto:aaqeebh1@googlemail.com"
              icon={<Mail />}
              label="Email"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">
            What I <span className="text-emerald-500">Do</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillCard
              theme={theme}
              icon={<Code2 size={32} />}
              title="Development"
              description="Building robust applications with modern technologies and best practices"
            />
            <SkillCard
              theme={theme}
              icon={<Palette size={32} />}
              title="Design"
              description="Creating intuitive and beautiful user interfaces that engage users"
            />
            <SkillCard
              theme={theme}
              icon={<Globe size={32} />}
              title="Web Apps"
              description="Developing scalable web applications with responsive designs"
            />
            <SkillCard
              theme={theme}
              icon={<Terminal size={32} />}
              title="Architecture"
              description="Designing efficient and maintainable system architectures"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="work"
        className={`py-32 px-4 ${
          theme === "dark"
            ? "bg-gradient-to-b from-black via-emerald-950/20 to-black"
            : "bg-gradient-to-b from-white via-emerald-50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">
            Featured <span className="text-emerald-500">Work</span>
          </h2>

          {projectsData.length > 0 ? (
            <div className="relative max-w-5xl mx-auto">
              <button
                onClick={prevProject}
                className={`w-full p-2 mb-4 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                }`}
                aria-label="Previous project"
              >
                <ChevronUp size={24} className="mx-auto" />
              </button>

              <div
                className={`relative flex flex-col md:flex-row gap-8 rounded-2xl p-8 ${
                  theme === "dark" ? "bg-white/5" : "bg-emerald-50/50"
                }`}
              >
                <div className="md:w-1/2 relative aspect-[16/9] overflow-hidden rounded-xl">
                  <img
                    src={projectsData[activeProject].image}
                    alt={projectsData[activeProject].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4">
                    {projectsData[activeProject].title}
                  </h3>
                  <p
                    className={`mb-6 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {projectsData[activeProject].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projectsData[activeProject].technologies?.map(
                      (tag: string, index: number) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${
                            theme === "dark"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {tag.trim()}
                        </span>
                      )
                    )}
                  </div>
                  <a
                    href={projectsData[activeProject].live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 transition-colors ${
                      theme === "dark"
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-700"
                    }`}
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <button
                onClick={nextProject}
                className={`w-full p-2 mt-4 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                }`}
                aria-label="Next project"
              >
                <ChevronDown size={24} className="mx-auto" />
              </button>
            </div>
          ) : (
            <div className="text-center p-8 rounded-lg bg-opacity-20 max-w-md mx-auto">
              <p className="text-lg">Loading projects...</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Let's Create <span className="text-emerald-500">Together</span>
          </h2>
          <p
            className={`text-xl mb-12 max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Have an exciting project in mind? I'm always open to discussing new
            opportunities and challenges.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
          >
            Start a Conversation
            <ExternalLink size={20} />
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            className={`relative w-full max-w-2xl rounded-2xl shadow-xl ${
              theme === "dark" ? "bg-[#111]" : "bg-white"
            }`}
          >
            <div
              className={`flex justify-between items-center p-6 border-b ${
                theme === "dark" ? "border-white/10" : "border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-bold">Let's talk!</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`transition-colors ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-black"
                }`}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <p
                className={`text-lg mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                I'm currently open to new opportunities
              </p>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      theme === "dark"
                        ? "bg-white/5 border border-white/10 text-white"
                        : "bg-gray-100 border border-gray-200 text-gray-900"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      theme === "dark"
                        ? "bg-white/5 border border-white/10 text-white"
                        : "bg-gray-100 border border-gray-200 text-gray-900"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
                      theme === "dark"
                        ? "bg-white/5 border border-white/10 text-white"
                        : "bg-gray-100 border border-gray-200 text-gray-900"
                    }`}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Send it my way
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
  theme,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  theme: string;
}) {
  // Check if the link is an email link
  const isEmail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      // Only use target="_blank" for non-email links
      {...(!isEmail ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105 ${
        theme === "dark"
          ? "bg-white/10 hover:bg-emerald-500"
          : "bg-gray-200 hover:bg-emerald-500 text-gray-800 hover:text-white"
      }`}
      aria-label={label}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}

function SkillCard({
  icon,
  title,
  description,
  theme,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  theme: string;
}) {
  return (
    <div
      className={`group p-8 rounded-2xl transition-all hover:scale-105 ${
        theme === "dark"
          ? "bg-white/5 hover:bg-emerald-950/50"
          : "bg-emerald-50 hover:bg-emerald-100"
      }`}
    >
      <div className="text-emerald-500 mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
        {description}
      </p>
    </div>
  );
}

export default App;
