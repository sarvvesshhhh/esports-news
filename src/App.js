import React, { useEffect, useState } from "react";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(
          "https://liquipedia.net/valorant/api.php?action=parse&page=Portal:Tournaments&format=json&origin=*"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // The API gives HTML inside data.parse.text["*"], we need to extract matches
        const html = data.parse.text["*"];

        // Quick regex / DOM parsing example (can refine later)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const matchElements = doc.querySelectorAll("li, td"); // adjust based on Liquipedia structure

        const parsedMatches = Array.from(matchElements)
          .map(el => el.textContent.trim())
          .filter(txt => txt.includes("vs")); // crude filter for matches

        setMatches(parsedMatches);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🔥 Valorant Matches (Liquipedia)</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {matches.length > 0 ? (
        <ul>
          {matches.map((m, idx) => (
            <li key={idx}>{m}</li>
          ))}
        </ul>
      ) : (
        !loading && <p>No matches found.</p>
      )}
    </div>
  );
}

export default App;
