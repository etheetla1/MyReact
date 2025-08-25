import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Technologies from "./components/Technologies"
import Contact from "./components/Contact"
import MenuOverlay from "./components/MenuOverlay"
import Blogs from "./components/Blogs"
import { ErrorBoundary } from "./components/common"

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white antialiased">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
        <div className="text-2xl font-light">
          <a href="/" className="hover:text-gray-300 transition-colors">
            Elisha.
          </a>
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center space-x-2 text-sm font-medium hover:text-gray-300 transition-colors"
        >
          <span>MENU</span>
          <span className="text-lg">☰</span>
        </button>
      </nav>

      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </ErrorBoundary>
      
    </div>
  );
};

export default App
