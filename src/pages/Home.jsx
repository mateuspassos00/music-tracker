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

      {/* Hero section */}
      <div className="w-full max-w-2xl mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Find your albums</h1>
        <p className="text-zinc-400 mb-8">Search any artist or album and add it to your collection</p>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search albums or artists..."
          className="w-full bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-zinc-500 text-sm mb-8">Searching...</p>
      )}

      {/* Empty state */}
      {!loading && query && results.length === 0 && (
        <p className="text-zinc-500 text-sm">No albums found for "{query}"</p>
      )}

      {/* Grid */}
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