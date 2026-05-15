import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserDetailQuery } from "./api/use-user-detail-query";
import { UserDetailsTopCard } from "./components/userDetails/DetailsTopCard";
import { UserDetailsContentCard } from "./components/userDetails/DetailsContentCard";
import { ActionButton } from "./components/userDetails/ActionButton";
import { getUserActions } from "./util";

export const tabs = [
  "General details",
  "Documents",
  "Bank details",
  "Loans",
  "Savings",
  "App and system",
] as const;


export function UserDetailsPage() {
  const { userId } = useParams();
  const { data, isLoading, isError, error } = useUserDetailQuery(userId);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("General details");

  const tabCopy = useMemo(() => {
    if (activeTab === "General details") return null;
    return (
      <p className="rounded-md border border-dashed border-lendsqr-border bg-lendsqr-surface/60 px-4 py-10 text-center text-sm text-lendsqr-muted">
        {activeTab} content is not part of this assessment scope. Switch back to General details to
        view the full profile.
      </p>
    );
  }, [activeTab]);

  const actions = useMemo(() => {
    if (!data?.status) return [];
    return getUserActions(data.status);
  }, [data?.status])
  

  if (!userId) {
    return <p className="text-sm text-red-600">Missing user identifier.</p>;
  }

  if (isLoading && !data) {
    return <p className="text-sm text-lendsqr-muted">Loading user…</p>;
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <Link
          to="/users"
          className="inline-flex items-center gap-2 text-sm font-medium text-lendsqr-muted hover:text-lendsqr-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Link>
        <p className="text-sm text-red-600">{(error as Error)?.message ?? "Unable to load user."}</p>
      </div>
    );
  }

 
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            to="/users"
            className="inline-flex items-center gap-2 text-sm font-medium text-lendsqr-muted hover:text-lendsqr-navy"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-lendsqr-navy md:text-3xl">User Details</h1>
        </div>

        <div className="flex flex-wrap gap-3">


          {actions.map((action) => (
            <ActionButton
              key={action}
              action={action}
              onClick={() => console.log(action, data.id)}
            />
          ))}
        </div>

      </div>

      <UserDetailsTopCard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs} data={data} />

      <UserDetailsContentCard
        data={data} activeTab={activeTab}
        tabCopy={tabCopy} />
    </div>
  );
}
