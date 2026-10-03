import { Bell, Search } from "lucide-react";
import { Outlet } from "react-router-dom";

import ThemeToggle from "../../common/ThemeToggle";
import InstitutionSidebar from "../InstitutionSidebar/InstitutionSidebar";

import "./InstitutionLayout.css";

export default function InstitutionLayout() {
  return (
    <div className="institution-layout">
      <InstitutionSidebar />

      <div className="institution-main">
        <header className="institution-topbar">
          <div className="institution-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search students, companies, reports..."
            />
          </div>

          <div className="institution-topbar-actions">
            <ThemeToggle />

            <button
              type="button"
              className="institution-icon-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="institution-user">
              <div className="institution-user-avatar">
                I
              </div>

              <div className="institution-user-info">
                <strong>Institution</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <main className="institution-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}