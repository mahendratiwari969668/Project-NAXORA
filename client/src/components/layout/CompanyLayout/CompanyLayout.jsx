import { Outlet } from "react-router-dom";

import CompanySidebar from "../CompanySidebar/CompanySidebar";

import "./CompanyLayout.css";

export default function CompanyLayout() {
  return (
    <div className="company-layout">
      {/* =========================
          COMPANY SIDEBAR
      ========================== */}
      <CompanySidebar />

      {/* =========================
          MAIN AREA
      ========================== */}
      <div className="company-layout-main">
        <Outlet />
      </div>
    </div>
  );
}