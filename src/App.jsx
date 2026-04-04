import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-white" style={{ background: "#1a1008" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;