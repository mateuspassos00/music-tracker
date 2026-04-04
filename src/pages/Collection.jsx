import { useState, useEffect } from "react";
import { getCollection, removeFromCollection } from "../services/collectionApi";

function Collection() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollection();
  }, []);

  async function fetchCollection() {
    const data = await getCollection();
    setAlbums(data);
    setLoading(false);
  }

  async function handleRemove(id) {
    await removeFromCollection(id);
    setAlbums(prev => prev.filter(album => album.id !== id));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p style={{ color: "#c8813a" }}>Loading your collection...</p>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-4xl">🎵</p>
        <p className="font-semibold" style={{ color: "#e8c99a" }}>Your collection is empty</p>
        <p className="text-sm" style={{ color: "#c8813a" }}>Search for albums and hit + Add to get started</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#e8c99a", fontFamily: "'Ruritania', serif" }}>Collection</h1>
        <p className="text-sm" style={{ color: "#c8813a" }}>{albums.length} album{albums.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {albums.map(album => (
          <div key={album.id} className="group flex flex-col">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2" style={{ background: "#2c1a0e" }}>
              <img
                src={album.coverUrl}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={e => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="w-full h-full items-center justify-center text-4xl hidden absolute inset-0" style={{ background: "#2c1a0e" }}>
                🎵
              </div>
              <button
                onClick={() => handleRemove(album.id)}
                className="absolute bottom-2 right-2 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "#6b3a1f" }}
              >
                Remove
              </button>
            </div>
            <p className="text-xs font-semibold truncate" style={{ color: "#e8c99a" }}>{album.title}</p>
            <p className="text-xs truncate" style={{ color: "#c8813a" }}>{album.artist} · {album.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;