import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between border-b border-zinc-800">
      <Link to="/" className="text-white font-bold text-lg tracking-tight">
        AlbumTracker
      </Link>
      <div className="flex gap-6 text-sm">
        <Link to="/" className="text-zinc-400 hover:text-white transition-colors">
          Search
        </Link>
        <Link to="/collection" className="text-zinc-400 hover:text-white transition-colors">
          Collection
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;