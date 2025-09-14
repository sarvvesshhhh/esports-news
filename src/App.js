import React, { useEffect, useState } from "react";

function App() {
  const [upcoming, setUpcoming] = useState([]);
  const [live, setLive] = useState([]);

  // Fetch upcoming matches
  useEffect(() => {
    fetch(
      `https://api.pandascore.io/valorant/matches/upcoming?token=${process.env.REACT_APP_PANDASCORE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setUpcoming(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch live matches
  useEffect(() => {
    fetch(
      `https://api.pandascore.io/valorant/matches/running?token=${process.env.REACT_APP_PANDASCORE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setLive(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>🎮 Esports News & Scores</h1>

      {/* Live Matches */}
      <h2>🔥 Live Valorant Matches</h2>
      {live.length === 0 ? (
        <p>No live matches right now.</p>
      ) : (
        <ul>
          {live.map((match) => (
            <li key={match.id}>
              {match.opponents[0]?.opponent?.name} vs{" "}
              {match.opponents[1]?.opponent?.name} <br />
              <b>Status:</b> {match.status}
            </li>
          ))}
        </ul>
      )}

      {/* Upcoming Matches */}
      <h2>⏳ Upcoming Matches</h2>
      {upcoming.length === 0 ? (
        <p>No upcoming matches found.</p>
      ) : (
        <ul>
          {upcoming.map((match) => (
            <li key={match.id}>
              {match.opponents[0]?.opponent?.name} vs{" "}
              {match.opponents[1]?.opponent?.name} <br />
              <b>Start:</b> {new Date(match.begin_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
