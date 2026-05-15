import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/students',  icon: '👨‍🎓', label: 'Students' },
  { path: '/exams',     icon: '📝', label: 'Exams' },
  { path: '/questions', icon: '❓', label: 'Questions' },
  { path: '/results',   icon: '🏆', label: 'Results' },
];

const pageTitles = {
  '/dashboard': { title: 'Dashboard',  sub: 'System overview and statistics' },
  '/students':  { title: 'Students',   sub: 'Manage student records' },
  '/exams':     { title: 'Exams',      sub: 'Manage examination records' },
  '/questions': { title: 'Questions',  sub: 'Manage exam questions' },
  '/results':   { title: 'Results',    sub: 'Manage student results' },
};

export default function Layout({ children, user, onLogout }) {
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: 'ExamPro', sub: '' };
  const initial = user?.fullName?.charAt(0).toUpperCase() || 'A';

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🎓</div>
          <div>
            <h2>ExamPro</h2>
            <span>Management System</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Main Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">{initial}</div>
            <div className="user-info">
              <div className="name">{user?.fullName}</div>
              <div className="role">{user?.role}</div>
            </div>
            <button className="logout-btn" onClick={onLogout} title="Logout">⏏</button>
          </div>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-title">
            <h1>{page.title}</h1>
            <p>{page.sub}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Welcome, {user?.fullName}
            </span>
            <div className="user-avatar" style={{ width: 34, height: 34, fontSize: 13 }}>
              {initial}
            </div>
          </div>
        </header>

        <main className="page-body">{children}</main>
      </div>
    </div>
  );
}
