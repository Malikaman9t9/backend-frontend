import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SiteAuditor from "./SiteAuditor";
import BulkAnalysis from "./BulkAnalysis";
import { Search, FileSpreadsheet, LogOut, Bolt, Crown, User, Menu, X } from "lucide-react";

export default function Layout() {
  const { user, isPro, planLabel, signOut, loading } = useAuth();
  const [menu, setMenu] = useState<"auditor" | "bulk">("auditor");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [auditKey, setAuditKey] = useState(0);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-layout">
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <img src="/logo.png" alt="NexGenWebLab" className="logo-img" />
        </div>

        {user && (
          <div className="user-card">
            <div className="user-avatar">{user.email[0].toUpperCase()}</div>
            <div className="user-info">
              <div className="user-email">{user.email}</div>
              <div className={`user-plan ${isPro ? "plan-pro" : "plan-free"}`}>
                {isPro ? <Crown size={12} /> : <User size={12} />}
                {planLabel}
              </div>
            </div>
          </div>
        )}

        {!isPro && (
          <a href="https://nexgenweblab.com/upgrade" target="_blank" rel="noreferrer" className="upgrade-banner">
            <Bolt size={14} />
            Upgrade to Pro
          </a>
        )}

        <button className="btn-logout" onClick={signOut}>
          <LogOut size={16} />
          Log Out
        </button>

        <hr className="sidebar-divider" />

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${menu === "auditor" ? "nav-active" : ""}`}
            onClick={() => { setMenu("auditor"); closeSidebar(); }}
          >
            <Search size={18} />
            Site Auditor
          </button>
          <button
            className={`nav-item ${menu === "bulk" ? "nav-active" : ""}`}
            onClick={() => { setMenu("bulk"); closeSidebar(); }}
          >
            <FileSpreadsheet size={18} />
            Bulk Analysis
          </button>
        </nav>

        <hr className="sidebar-divider" />

        <button className="btn-new-audit" onClick={() => { setMenu("auditor"); setAuditKey((k) => k + 1); closeSidebar(); }}>
          Start New Audit
        </button>

        <div className="sidebar-footer">
          <span>NexGenWebLab v2.0</span>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <main className="main-content">
        {menu === "auditor" ? <SiteAuditor key={auditKey} /> : <BulkAnalysis />}
      </main>
    </div>
  );
}
