import { NavLink } from "react-router-dom";

function NovaShell({ children }) {
  return (
    <div className="nova-shell">
      <aside className="nova-sidebar">
        <div className="nova-brand">
          <span className="nova-brand-mark">N</span>
          <span className="nova-brand-line" />
        </div>

        <nav className="nova-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
            aria-label="Dashboard"
          >
            <span className="nav-icon">⌂</span>
            <span className="nav-label">COMMAND</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
            aria-label="Tasks"
          >
            <span className="nav-icon">✓</span>
            <span className="nav-label">MISSIONS</span>
          </NavLink>

          <button className="nav-item" aria-label="Activity">
            <span className="nav-icon">◷</span>
            <span className="nav-label">ACTIVITY</span>
          </button>

          <button className="nav-item" aria-label="AI">
            <span className="nav-icon">◇</span>
            <span className="nav-label">NOVA AI</span>
          </button>
        </nav>

        <div className="nova-sidebar-bottom">
          <button className="nav-item" aria-label="Settings">
            <span className="nav-icon">⚙</span>
            <span className="nav-label">SYSTEM</span>
          </button>

          <div className="nova-system-indicator">
            <span />
            <small>ONLINE</small>
          </div>
        </div>
      </aside>

      <main className="nova-main">{children}</main>
    </div>
  );
}

export default NovaShell;