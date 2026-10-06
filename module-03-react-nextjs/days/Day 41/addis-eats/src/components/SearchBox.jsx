"use client";

import { useState, useEffect } from "react";

export default function SearchBox({ onSearch }) {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(term);
    }, 400);

    return () => clearTimeout(timer);
  }, [term, onSearch]);

  return (
    <div className="w-full max-w-md my-4">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search dishes..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}