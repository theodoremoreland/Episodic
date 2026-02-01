"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Sidebar.css";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const navigationItems = [
    { href: "/trends", label: "Trends", icon: "📈" },
    { href: "/review-form", label: "Review Form", icon: "📝" },
    { href: "/review-history", label: "Review History", icon: "👍" },
    { href: "/reviewer-metadata", label: "Reviewer Metadata", icon: "👤" },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href);
  };

  return (
    <div className="sidebar-container">
      <header className="app-bar">
        <div className="toolbar">
          <button
            className="menu-button"
            onClick={toggleDrawer}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <h1 className="app-title">Episodic</h1>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && <div className="overlay" onClick={closeDrawer} />}

      <nav className="drawer-container">
        {/* Mobile/Temporary Drawer */}
        <div className={`drawer drawer-mobile ${mobileOpen ? "open" : ""}`}>
          <div className="drawer-content">
            <h2 className="drawer-title">Episodic</h2>
            <div className="divider" />
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                    onClick={closeDrawer}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop/Permanent Drawer */}
        <div className="drawer drawer-desktop">
          <div className="drawer-content">
            <h2 className="drawer-title">Episodic</h2>
            <div className="divider" />
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
