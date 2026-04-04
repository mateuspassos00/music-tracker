import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Collection from "./pages/Collection";

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blurAmount = Math.min(scrollY / 80, 6);
  const opacityAmount = Math.max(1 - scrollY / 400, 0.35);

  return (
    <BrowserRouter>
      <div className="min-h-screen text-white relative flex flex-col" style={{ background: "#1a1008" }}>

        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: `blur(${blurAmount}px)`,
            opacity: opacityAmount,
            transform: "scale(1.05)",
            zIndex: 0,
            transition: "filter 0.1s ease, opacity 0.1s ease",
          }}
        />

        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(26,16,8,0.55) 0%, rgba(26,16,8,0.85) 100%)",
            zIndex: 1,
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }} className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
            </Routes>
          </main>
          <Footer />
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;