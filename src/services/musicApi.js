import axios from "axios";

const BASE_URL = "https://musicbrainz.org/ws/2";

const headers = {
  "User-Agent": "MusicTracker/1.0 (your@email.com)",
};

// No extra request needed — this URL redirects to the cover if it exists
function buildCoverUrl(id) {
  return `https://coverartarchive.org/release-group/${id}/front-250`;
}

export async function searchAlbums(query) {
  const { data } = await axios.get(`${BASE_URL}/release-group`, {
    headers,
    params: { query, type: "album", fmt: "json", limit: 12 },
  });

  return data["release-groups"].map(album => ({
    id: album.id,
    title: album.title,
    artist: album["artist-credit"]?.[0]?.name ?? "Unknown Artist",
    year: album["first-release-date"]?.slice(0, 4) ?? "?",
    coverUrl: buildCoverUrl(album.id),
  }));
}