import { addToCollection } from "../services/collectionApi";
import { useState } from "react";

function AlbumCard({ id, title, artist, year, coverUrl }) {
  const [saved, setSaved] = useState(false);

  async function handleAdd() {
    try {
      await addToCollection({ mbid: id, title, artist, year, coverUrl });
      setSaved(true);
    } catch (err) {
      if (err.response?.status === 409) setSaved(true); // already saved
    }
  }

  return (
    <div className="group flex flex-col cursor-pointer">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-800 mb-2">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="w-full h-full items-center justify-center text-4xl hidden absolute inset-0 bg-zinc-800">
          🎵
        </div>
        {/* Add button — appears on hover */}
        <button
          onClick={handleAdd}
          className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {saved ? "Saved ✓" : "+ Add"}
        </button>
      </div>
      <p className="text-white text-xs font-semibold truncate">{title}</p>
      <p className="text-zinc-400 text-xs truncate">{artist} · {year}</p>
    </div>
  );
}

export default AlbumCard;