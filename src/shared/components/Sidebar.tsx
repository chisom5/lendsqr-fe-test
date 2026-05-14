import type { ReactNode } from "react";
import {
  BadgePercent,
  Banknote,
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  ChevronDown,
  ClipboardList,
  Coins,
  FileText,
  HandCoins,
  Home,
  Landmark,
  LineChart,
  LogOut,
  PiggyBank,
  Scale,
  Settings,
  Shield,
  Sparkles,
  UserCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { clearAuthenticatedSession } from "@/lib/auth/session";

type NavItem = { to: string; label: string; icon: ReactNode };

const customers: NavItem[] = [
  { to: "/users", label: "Users", icon: <Users className="h-4 w-4" /> },
  { to: "/dashboard", label: "Guarantors", icon: <UserCheck className="h-4 w-4" /> },
  { to: "/dashboard", label: "Loans", icon: <HandCoins className="h-4 w-4" /> },
  { to: "/dashboard", label: "Decision Models", icon: <Scale className="h-4 w-4" /> },
  { to: "/dashboard", label: "Savings", icon: <PiggyBank className="h-4 w-4" /> },
  { to: "/dashboard", label: "Loan Requests", icon: <FileText className="h-4 w-4" /> },
  { to: "/dashboard", label: "Whitelist", icon: <Shield className="h-4 w-4" /> },
  { to: "/dashboard", label: "Karma", icon: <Sparkles className="h-4 w-4" /> },
];

const businesses: NavItem[] = [
  { to: "/dashboard", label: "Organization", icon: <Building2 className="h-4 w-4" /> },
  { to: "/dashboard", label: "Loan Products", icon: <Coins className="h-4 w-4" /> },
  { to: "/dashboard", label: "Savings Products", icon: <Wallet className="h-4 w-4" /> },
  { to: "/dashboard", label: "Fees and Charges", icon: <BadgePercent className="h-4 w-4" /> },
  { to: "/dashboard", label: "Transactions", icon: <Banknote className="h-4 w-4" /> },
  { to: "/dashboard", label: "Services", icon: <Briefcase className="h-4 w-4" /> },
  { to: "/dashboard", label: "Service Account", icon: <Landmark className="h-4 w-4" /> },
  { to: "/dashboard", label: "Settlements", icon: <ClipboardList className="h-4 w-4" /> },
  { to: "/dashboard", label: "Reports", icon: <BarChart3 className="h-4 w-4" /> },
];

const settings: NavItem[] = [
  { to: "/dashboard", label: "Preferences", icon: <Settings className="h-4 w-4" /> },
  { to: "/dashboard", label: "Fees and Pricing", icon: <LineChart className="h-4 w-4" /> },
  { to: "/dashboard", label: "Audit Logs", icon: <FileText className="h-4 w-4" /> },
  { to: "/dashboard", label: "Systems Messages", icon: <Bell className="h-4 w-4" /> },
];

function linkClassName({ isActive }: { isActive: boolean }) {
  return [
    "group flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-lendsqr-muted transition-colors",
    isActive
      ? "relative bg-[#39CDCC]/12 text-lendsqr-navy before:absolute before:left-0 before:top-1 before:h-[calc(100%-8px)] before:w-1 before:rounded-r before:bg-lendsqr-primary"
      : "hover:bg-lendsqr-surface hover:text-lendsqr-navy",
  ].join(" ");
}

function SectionTitle({ children }: { children: string }) {
  return (
    <p className="px-4 pb-2 pt-6 text-xs font-semibold tracking-wide text-lendsqr-muted/80">
      {children}
    </p>
  );
}

type SidebarProps = {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
};

export function Sidebar({ mobileOpen, onCloseMobile, onLogout }: SidebarProps) {
  return (
    <>
      <div
        className={[
          "fixed inset-0 z-40 bg-lendsqr-navy/40 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!mobileOpen}
        onClick={onCloseMobile}
      />
      <aside
        className={[
          "flex w-[260px] flex-col border-r border-lendsqr-border bg-white",
          "max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-50 max-lg:h-full max-lg:shadow-card max-lg:transition-transform",
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
          "lg:fixed lg:left-0 lg:top-[4.75rem] lg:z-20 lg:h-[calc(100vh-4.75rem)] lg:max-h-[calc(100vh-4.75rem)] lg:translate-x-0 lg:shadow-none",
        ].join(" ")}
      >
        <div className="flex items-center justify-end px-4 pb-2 pt-4 lg:hidden">
          <button
            type="button"
            className="rounded-md p-2 text-lendsqr-muted hover:bg-lendsqr-surface"
            aria-label="Close navigation"
            onClick={onCloseMobile}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          className="mx-4 mb-2 mt-2 flex items-center justify-between rounded-md border border-lendsqr-border px-3 py-2 text-left text-sm font-medium text-lendsqr-navy hover:bg-lendsqr-surface lg:mt-6"
        >
          <span className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-lendsqr-muted" />
            Switch Organization
          </span>
          <ChevronDown className="h-4 w-4 text-lendsqr-muted" />
        </button>
        <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-8 lg:min-h-0">
          <NavLink to="/dashboard" end className={linkClassName} onClick={onCloseMobile}>
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>
          <SectionTitle>CUSTOMERS</SectionTitle>
          {customers.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={linkClassName}
              onClick={onCloseMobile}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          <SectionTitle>BUSINESSES</SectionTitle>
          {businesses.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={linkClassName}
              onClick={onCloseMobile}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          <SectionTitle>SETTINGS</SectionTitle>
          {settings.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={linkClassName}
              onClick={onCloseMobile}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-lendsqr-border px-4 py-4">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-lendsqr-muted hover:bg-lendsqr-surface hover:text-lendsqr-navy"
            onClick={() => {
              clearAuthenticatedSession();
              onLogout();
              onCloseMobile();
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <p className="mt-2 px-3 text-xs text-lendsqr-muted/70">v1.0.0</p>
        </div>
      </aside>
    </>
  );
}
