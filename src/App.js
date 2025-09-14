import React, { useEffect, useState } from "react";

function App() {
  const [rawHtml, setRawHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
  "https://corsproxy.io/?https://liquipedia.net/api.php?action=parse&page=Liquipedia:Upcoming_and_ongoing_matches&format=json"
);
        const data = await response.json();

        const html = data?.parse?.text?.["*"];
        setRawHtml(html || "No HTML received");
      } catch (err) {
        console.error("Error fetching Liquipedia matches:", err);
        setRawHtml("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🔥 Valorant Matches (Liquipedia)</h1>
      {loading ? <p>Loading...</p> : null}
      <pre style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
        {rawHtml.slice(0, 2000)}...
      </pre>
      <p>(showing first 2000 chars of HTML)</p>
    </div>
  );
}

export default App;
