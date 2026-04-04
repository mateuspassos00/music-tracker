import { useState } from "react";
import { addToCollection } from "../services/collectionApi";

function AlbumCard({ id, title, artist, year, coverUrl }) {
  const [saved, setSaved] = useState(false);

  async function handleAdd() {
    try {
      await addToCollection({ mbid: id, title, artist, year, coverUrl });
      setSaved(true);
    } catch (err) {
      if (err.response?.status === 409) setSaved(true);
    }
  }

  return (
    <div className="group flex flex-col cursor-pointer">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2" style={{ background: "#2c1a0e" }}>
        <img
          src={coverUrl}
          alt={title}
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
          onClick={handleAdd}
          className="absolute bottom-2 right-2 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: saved ? "#4a2f1a" : "#c8813a" }}
        >
          {saved ? "Saved ✓" : "+ Add"}
        </button>
      </div>
      <p className="text-xs font-semibold truncate" style={{ color: "#e8c99a" }}>{title}</p>
      <p className="text-xs truncate" style={{ color: "#c8813a" }}>{artist} · {year}</p>
    </div>
  );
}

export default AlbumCard;