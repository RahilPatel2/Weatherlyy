import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import WeatherApp from "./components/WeatherApp";
import ComparePage from "./components/ComparePage";
import Insights from "./components/Insights";  // ✅ Import Insights
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/insights" element={<Insights />} />  
      </Routes>
    </Router>
  </React.StrictMode>
);
