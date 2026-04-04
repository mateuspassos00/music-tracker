import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #4a2f1a" }}>
      <Link to="/" className="font-bold text-lg tracking-tight" style={{ color: "#e8c99a" }}>
        AlbumTracker
      </Link>
      <div className="flex gap-6 text-sm">
        <Link to="/" className="transition-colors" style={{ color: "#c8813a" }}
          onMouseEnter={e => e.target.style.color = "#e8c99a"}
          onMouseLeave={e => e.target.style.color = "#c8813a"}>
          Search
        </Link>
        <Link to="/collection" className="transition-colors" style={{ color: "#c8813a" }}
          onMouseEnter={e => e.target.style.color = "#e8c99a"}
          onMouseLeave={e => e.target.style.color = "#c8813a"}>
          Collection
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;