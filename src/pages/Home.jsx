import { useState, useEffect } from "react";
import { searchAlbums } from "../services/musicApi";
import AlbumCard from "../components/AlbumCard";

function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return setResults([]);

    const delay = setTimeout(async () => {
      setLoading(true);
      const albums = await searchAlbums(query);
      setResults(albums);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-2xl mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#e8c99a", fontFamily: "'Ruritania', serif" }}>Find your albums</h1>
        <p className="mb-8" style={{ color: "#c8813a" }}>Search any artist or album and add it to your collection</p>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search albums or artists..."
          className="w-full rounded-2xl px-6 py-4 text-lg focus:outline-none transition-colors"
          style={{
            background: "#2c1a0e",
            border: "1px solid #4a2f1a",
            color: "#e8c99a",
          }}
          onFocus={e => e.target.style.borderColor = "#c8813a"}
          onBlur={e => e.target.style.borderColor = "#4a2f1a"}
        />
      </div>

      {loading && <p className="text-sm mb-8" style={{ color: "#c8813a" }}>Searching...</p>}

      {!loading && query && results.length === 0 && (
        <p className="text-sm" style={{ color: "#4a2f1a" }}>No albums found for "{query}"</p>
      )}

      {results.length > 0 && (
        <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map(album => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;