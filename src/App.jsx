import Navbar from "./components/navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherApp from "./components/WeatherApp";
import Login from "./components/Login";
import ComparePage from "./components/ComparePage";  // ✅ Compare Page route
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/login" element={<WeatherApp />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
