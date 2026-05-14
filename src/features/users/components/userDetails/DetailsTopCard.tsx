import { formatNaira } from "@/lib/format/format-naira";
import { Star, User } from "lucide-react";
import { tabs } from "../../UserDetailsPage";
import { UserDetailRecord } from "@/types/user";

export interface UserDetailsTopCardProps {
    activeTab: typeof tabs[number],
    setActiveTab: (a: typeof tabs[number]) => void,
    tabs: typeof tabs,
    data: UserDetailRecord
}

function TierStars({ tier }: { tier: 1 | 2 | 3 }) {
    return (
        <div className="flex items-center gap-1" aria-label={`User tier ${tier} of 3`}>
            {[1, 2, 3].map((index) => (
                <Star
                    key={index}
                    className={[
                        "h-5 w-5",
                        index <= tier ? "fill-amber-400 text-amber-400" : "text-slate-300",
                    ].join(" ")}
                />
            ))}
        </div>
    );
}

export function UserDetailsTopCard({ data, activeTab, setActiveTab, tabs }: UserDetailsTopCardProps) {

    const { personalInformation: p } = data;

    return (
        <section className="rounded-lg border border-lendsqr-border bg-white shadow-card">
            <div className="p-6 md:p-8">
                <div className="flex flex-col gap-8 xl:flex-row xl:items-center">

                    {/* User Info */}
                    <div className="flex items-center gap-5">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-lendsqr-surface ring-2 ring-lendsqr-border">
                            <User className="h-10 w-10 text-lendsqr-muted" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-medium text-lendsqr-navy">
                                {p.fullName}
                            </h2>

                            <p className="mt-1 text-sm text-lendsqr-muted">
                                {data.customerId}
                            </p>
                        </div>
                    </div>

                    {/* Tier */}
                    <div className="flex items-center gap-8">
                        <div className="xl:px-8 xl:border-r xl:border-lendsqr-border">
                            <p className="text-sm font-medium text-lendsqr-muted">
                                User&apos;s Tier
                            </p>

                            <div className="mt-2">
                                <TierStars tier={data.profileTier} />
                            </div>
                        </div>

                        {/* Balance */}
                        <div className="xl:pr-8 xl:border-r xl:border-lendsqr-border">
                            <h3 className="text-2xl font-semibold text-lendsqr-navy">
                                {formatNaira(data.accountBalance)}
                            </h3>

                            <p className="mt-1 text-sm text-lendsqr-muted">
                                {data.bankAccountNumber}/{data.bankName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 overflow-x-auto px-6 md:px-8">
                <div className="flex min-w-max gap-8">
                    {tabs.map((tab) => {
                        const active = tab === activeTab;

                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={[
                                    "whitespace-nowrap border-b-2 py-4 text-sm font-medium capitalize transition-colors",
                                    active
                                        ? "border-lendsqr-primary text-lendsqr-primary"
                                        : "border-transparent text-lendsqr-muted hover:text-lendsqr-navy",
                                ].join(" ")}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}