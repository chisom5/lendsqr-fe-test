import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "@/shared/components/Sidebar";
import { Header } from "@/shared/components/Header";

export function DashboardLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-lendsqr-surface">
      <Header onOpenSidebar={() => setMobileOpen(true)} />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <Sidebar
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          onLogout={() => navigate("/login", { replace: true })}
        />
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto lg:pl-[260px]">
          <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
