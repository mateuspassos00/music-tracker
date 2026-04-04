import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blurAmount = Math.min(scrollY / 80, 6); // max 6px blur
  const opacityAmount = Math.max(1 - scrollY / 400, 0.35); // fades to 35%

  return (
    <BrowserRouter>
      <div className="min-h-screen text-white relative" style={{ background: "#1a1008" }}>

        {/* Forest background image */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: `blur(${blurAmount}px)`,
            opacity: opacityAmount,
            transform: "scale(1.05)", // prevents blur edge artifacts
            zIndex: 0,
            transition: "filter 0.1s ease, opacity 0.1s ease",
          }}
        />

        {/* Dark overlay so text stays readable */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(26,16,8,0.55) 0%, rgba(26,16,8,0.85) 100%)",
            zIndex: 1,
          }}
        />

        {/* App content sits above the background */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;