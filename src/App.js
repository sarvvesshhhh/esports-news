import React, { useEffect, useState } from "react";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("https://liquipedia.net/api.php?action=parse&page=Portal:Valorant/Tournaments&format=json&origin=*");
        const data = await response.json();

        // Extract plain text from HTML
        const html = data.parse.text["*"];
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Find match rows
        const matchElements = doc.querySelectorAll(".match-card"); // Liquipedia uses these classes
        const extractedMatches = [];

        matchElements.forEach(el => {
          const teams = el.querySelectorAll(".team");
          const time = el.querySelector(".timer-object")?.textContent || "TBD";

          if (teams.length >= 2) {
            extractedMatches.push({
              team1: teams[0].textContent.trim(),
              team2: teams[1].textContent.trim(),
              time: time
            });
          }
        });

        setMatches(extractedMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="App">
      <h1>🔥 Valorant Matches (Liquipedia)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p>No matches found</p>
      ) : (
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              {match.team1} 🆚 {match.team2} — {match.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
