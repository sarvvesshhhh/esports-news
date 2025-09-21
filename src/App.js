import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Live from "./pages/Live";
import Upcoming from "./pages/Upcoming";
import Teams from "./pages/Teams";
import Creators from "./pages/Creators";

function App() {
  return (
    <Router>
      <nav className="bg-black text-white px-6 py-3 flex gap-6">
        <Link to="/">🏠 Home</Link>
        <Link to="/live">🔴 Live</Link>
        <Link to="/upcoming">📅 Upcoming</Link>
        <Link to="/teams">👥 Teams</Link>
        <Link to="/creators">🎥 Creators</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<Live />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/creators" element={<Creators />} />
      </Routes>
    </Router>
  );
}

export default App;
