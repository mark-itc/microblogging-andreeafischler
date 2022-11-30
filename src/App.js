import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="home">
          <Link className="home-button" to="/home">
            Home
          </Link>
        </div>
        <div className="profile">
          <Link className="profile-button" to="/profile">
            Profile
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
