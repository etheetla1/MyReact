import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";


const App = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--apple-bg)] text-neutral-900 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-8">
        <Navbar />
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <Projects />
        <Contact />
      </div>
      
    </div>
  );
};

export default App