import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState(""); // [value, setter]

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)} // updates state on every keystroke
      placeholder="Search albums..."
      className="border rounded-lg px-4 py-2 w-full"
    />
  );
}