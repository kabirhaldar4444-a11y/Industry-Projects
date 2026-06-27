import { Outlet, NavLink } from 'react-router-dom';
import { FolderKanban, FileQuestion } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="app-container">
      <nav className="navbar glass-panel">
        <div className="navbar-content">
          <div className="nav-brand">
            <div className="brand-logo">
              <FolderKanban size={24} color="var(--primary)" />
            </div>
            <span className="brand-text">IndustryConnect</span>
          </div>
          <div className="nav-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              <FolderKanban size={18} />
              <span>Projects</span>
            </NavLink>
            <NavLink 
              to="/interviews" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <FileQuestion size={18} />
              <span>Interview Questions</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
