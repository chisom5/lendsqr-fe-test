import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-lendsqr-navy md:text-3xl">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-lendsqr-muted">
          Welcome back. Monitor lending activity and jump into customer management.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          to="/users"
          className="group flex flex-col justify-between rounded-lg border border-lendsqr-border bg-white p-6 shadow-card transition hover:border-lendsqr-primary/40"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lendsqr-muted">
                Customers
              </p>
              <p className="mt-3 text-lg font-semibold text-lendsqr-navy">Users</p>
              <p className="mt-2 text-sm text-lendsqr-muted">
                View the full directory, statuses, and filters across 500 mock records.
              </p>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#39CDCC]/15 text-lendsqr-primary">
              <Users className="h-6 w-6" />
            </span>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lendsqr-primary">
            Go to users
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
        <article className="rounded-lg border border-lendsqr-border bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-lendsqr-muted">
            Overview
          </p>
          <p className="mt-3 text-lg font-semibold text-lendsqr-navy">Operational snapshot</p>
          <p className="mt-2 text-sm text-lendsqr-muted">
            This dashboard route mirrors the Figma shell. Detailed analytics are out of scope for
            this assessment; focus is on navigation fidelity and shared layout components.
          </p>
        </article>
      </div>
    </div>
  );
}
