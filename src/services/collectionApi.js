import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function getCollection() {
  const { data } = await axios.get(`${BASE}/albums`);
  return data;
}

export async function addToCollection(album) {
  const { data } = await axios.post(`${BASE}/albums`, album);
  return data;
}

export async function removeFromCollection(id) {
  await axios.delete(`${BASE}/albums/${id}`);
}