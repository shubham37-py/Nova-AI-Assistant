import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <div className="nova-shell">
        <aside className="nova-sidebar">
          <div className="nova-logo">N</div>

          <nav className="nova-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              ⌂
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              ✓
            </NavLink>

            <button className="nav-item">◷</button>
            <button className="nav-item">◈</button>
            <button className="nav-item">⚙</button>
          </nav>
        </aside>

        <main className="nova-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
