import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="home">
          <NavLink to="/home" className="home-button">
            Home
          </NavLink>
        </div>
        <div className="profile">
          <NavLink className="profile-button" to="/profile">
            Profile
          </NavLink>
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
