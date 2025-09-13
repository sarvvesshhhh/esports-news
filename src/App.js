import React, { useEffect, useState } from "react";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
  fetch(
    `https://api.pandascore.io/valorant/matches/upcoming?token=${process.env.REACT_APP_PANDASCORE_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Pandascore API data:", data);

      // Check if it's an array, otherwise show empty
      if (Array.isArray(data)) {
        setMatches(data);
      } else {
        console.error("Invalid response:", data);
        setMatches([]); // fallback to empty list
      }
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);



  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>🎮 Esports News & Scores</h1>
      <h2>Tannu Puddingg</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {match.opponents[0]?.opponent?.name} vs{" "}
            {match.opponents[1]?.opponent?.name} <br />
            <b>Start:</b> {new Date(match.begin_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
