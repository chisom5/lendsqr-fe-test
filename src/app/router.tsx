import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginPage } from "@/features/auth/LoginPage";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { UserDetailsPage } from "@/features/users/UserDetailsPage";
import { UsersPage } from "@/features/users/UsersPage";
import { isAuthenticatedSession } from "@/lib/auth/session";
import { DashboardLayout } from "@/shared/components/DashboardLayout";

function ProtectedLayout() {
  const location = useLocation();
  if (!isAuthenticatedSession()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }
  return <Outlet />;
}

export const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "users", element: <UsersPage /> },
          { path: "users/:userId", element: <UserDetailsPage /> },
        ],
      },
    ],
  },
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
