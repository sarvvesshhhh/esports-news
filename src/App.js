import React, { useEffect, useState } from "react";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "https://liquipedia.net/api.php?action=parse&page=Liquipedia:Upcoming_and_ongoing_matches&format=json&origin=*"
        );
        const data = await response.json();

        // Parse the HTML from the response
        const html = data?.parse?.text?.["*"];
        if (!html) {
          setMatches([]);
          setLoading(false);
          return;
        }

        // Convert HTML string into DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Select table rows
        const rows = doc.querySelectorAll("table.wikitable tr");
        let valorantMatches = [];

        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          if (cells.length > 0) {
            const game = cells[0].innerText.trim();
            if (game.toLowerCase().includes("valorant")) {
              const team1 = cells[1]?.innerText.trim() || "TBD";
              const team2 = cells[3]?.innerText.trim() || "TBD";
              const time = cells[4]?.innerText.trim() || "TBD";
              valorantMatches.push({ game, team1, team2, time });
            }
          }
        });

        setMatches(valorantMatches);
      } catch (err) {
        console.error("Error fetching Liquipedia matches:", err);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🔥 Valorant Matches (Liquipedia)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p>No matches found</p>
      ) : (
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              {match.team1} vs {match.team2} — {match.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
