import { getUserCatalog } from "@/lib/users/mock-user-data";
import { Calendar } from "lucide-react";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { UsersFilterFormValues } from "../../api/users-filter-schema";

interface FilterDropdownProps {
    panelPosition: {
        top: number;
        left: number;
    } | null,
    filterForm: UseFormReturn<UsersFilterFormValues>,
    applyFilters: (e?: React.BaseSyntheticEvent) => Promise<void>;
    resetFilters: () => void;
}

export function UserFilterDropdown({ panelPosition, filterForm, applyFilters, resetFilters }: FilterDropdownProps) {

    const organizationOptions = useMemo(() => {
        const names = new Set(getUserCatalog().map((u) => u.organization));
        return [...names].sort((a, b) => a.localeCompare(b));
    }, []);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="users-filter-title"
            className="fixed z-[70] w-[min(270px,calc(100vw-16px))] rounded-lg border border-lendsqr-border bg-white p-5 shadow-card"
            style={{ top: panelPosition?.top, left: panelPosition?.left }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <h2 id="users-filter-title" className="sr-only">
                Filter users table
            </h2>
            <form className="space-y-4" onSubmit={applyFilters}>
                <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold tracking-wide text-lendsqr-navy">
                        Organization
                    </label>
                    <select
                        className="h-10 w-full appearance-none rounded-md border border-lendsqr-border bg-white px-3 pr-9 text-sm text-lendsqr-navy focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/20"
                        {...filterForm.register("organization")}
                    >
                        <option value="">Select</option>
                        {organizationOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold tracking-wide text-lendsqr-navy">
                        Username
                    </label>
                    <input
                        placeholder="User"
                        className="h-10 w-full rounded-md border border-lendsqr-border px-3 text-sm text-lendsqr-navy placeholder:text-lendsqr-muted/70 focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/20"
                        {...filterForm.register("username")}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold tracking-wide text-lendsqr-navy">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="h-10 w-full rounded-md border border-lendsqr-border px-3 text-sm text-lendsqr-navy placeholder:text-lendsqr-muted/70 focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/20"
                        {...filterForm.register("email")}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold tracking-wide text-lendsqr-navy">Date</label>
                    <div className="relative">
                        <input
                            type="date"
                            className="h-10 w-full rounded-md border border-lendsqr-border px-3 pr-10 text-sm text-lendsqr-navy focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/20"
                            {...filterForm.register("joinedDate")}
                        />
                        <Calendar
                            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lendsqr-muted"
                            aria-hidden
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold tracking-wide text-lendsqr-navy">
                        Phone number
                    </label>
                    <input
                        placeholder="Phone number"
                        className="h-10 w-full rounded-md border border-lendsqr-border px-3 text-sm text-lendsqr-navy placeholder:text-lendsqr-muted/70 focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/20"
                        {...filterForm.register("phoneNumber")}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold tracking-wide text-lendsqr-navy">Status</label>
                    <select
                        className="h-10 w-full appearance-none rounded-md border border-lendsqr-border bg-white px-3 pr-9 text-sm text-lendsqr-navy focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/20"
                        {...filterForm.register("status")}
                    >
                        <option value="">Select</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                        <option value="blacklisted">Blacklisted</option>
                    </select>
                </div>
                <div className="flex items-center gap-3 border-t border-lendsqr-border pt-4">
                    <button
                        type="button"
                        className="rounded-md border border-lendsqr-border bg-white px-4 py-2 text-sm font-semibold text-lendsqr-navy hover:bg-lendsqr-surface w-[89px]"
                        onClick={resetFilters}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-lendsqr-primary px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:brightness-95 w-[89px]"
                    >
                        Filter
                    </button>
                </div>
            </form>
        </div>
    )
}