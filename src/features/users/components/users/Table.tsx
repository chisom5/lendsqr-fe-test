import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Eye, ListFilter, MoreVertical } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { actionConfig } from "../constant/action-config.constant";
import { TableActionItem } from "./TableActionItem";
import { getUserActions } from "../../util";
import { UsersListResponse } from "@/types/user";

interface TableProps {
    isLoading: boolean,
    isError: boolean,
    error: Error,
    openFilters: (e: MouseEvent<HTMLButtonElement>) => void,
    data?: UsersListResponse
}
export function UserTable({ isLoading, isError, error, data, openFilters }: TableProps) {
    const navigate = useNavigate();
    const panelId = useId();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuId(null)
            }
        }
        if (openMenuId) {
            document.addEventListener('mousedown', handleClickOutside as unknown as EventListener)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener)
        }
    }, [openMenuId])

    return (
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <thead className="bg-lendsqr-surface/60 text-xs font-medium uppercase tracking-wide text-lendsqr-muted">
                <tr className="border-b border-lendsqr-border">
                    {[
                        "ORGANIZATION",
                        "USERNAME",
                        "EMAIL",
                        "PHONE NUMBER",
                        "DATE JOINED",
                        "STATUS",
                        "",
                    ].map((heading) => (
                        <th key={heading} className="px-6 py-4">
                            <span className="inline-flex items-center gap-2 whitespace-nowrap">
                                {heading}
                                {heading ? (
                                    <button
                                        type="button"
                                        className="rounded p-1 text-lendsqr-muted hover:bg-white hover:text-lendsqr-navy"
                                        aria-label={`Filter ${heading}`}
                                        onClick={openFilters}
                                    >
                                        <ListFilter className="h-4 w-4" />
                                    </button>
                                ) : null}
                            </span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-sm text-lendsqr-muted">
                            Loading users…
                        </td>
                    </tr>
                ) : null}
                {isError ? (
                    <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-sm text-red-600">
                            {(error as Error)?.message ?? "Unable to load users."}
                        </td>
                    </tr>
                ) : null}
                {data?.items.map((user, index) => (
                    <tr
                        key={user.id}
                        className={[
                            "border-b border-lendsqr-border transition hover:bg-lendsqr-surface/60",
                            index % 2 === 1 ? "bg-lendsqr-surface/40" : "bg-white",
                        ].join(" ")}

                    >
                        <td className="px-6 py-4 text-sm font-medium text-lendsqr-muted">
                            {user.organization}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-lendsqr-navy">{user.username}</td>
                        <td className="px-6 py-4 text-sm text-lendsqr-muted">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-lendsqr-muted">{user.phoneNumber}</td>
                        <td className="px-6 py-4 text-sm text-lendsqr-muted">{user.dateJoined}</td>
                        <td className="px-6 py-4">
                            <StatusBadge status={user.status} />
                        </td>
                        <td className="px-6 py-4 text-right relative" >
                            <button
                                type="button"
                                className="inline-flex rounded-md p-2 text-lendsqr-muted hover:bg-white hover:text-lendsqr-navy"
                                aria-label="Row actions"
                                aria-expanded={openMenuId === user.id}
                                aria-haspopup="true"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenMenuId(openMenuId === user.id ? null : user.id)
                                }}
                                aria-controls={`${panelId}-${user.id}`}
                            >
                                <MoreVertical className="h-4 w-4" />
                            </button>

                            {openMenuId === user.id && (
                                <div
                                    id={`${panelId}-${user.id}`}
                                    role="dialog"
                                    aria-label="MoreVertical"
                                    ref={menuRef}
                                    className={` absolute right-4 top-full z-50 mt-1.5 flex min-w-[200px] flex-col gap-3 rounded-sm border border-lendsqr-muted/40 bg-white p-3 shadow-md `}
                                >

                                    <TableActionItem
                                        icon={Eye}
                                        label="View Details"
                                        onClick={() => {
                                            setOpenMenuId(null);
                                            navigate(`/users/${user.id}`);
                                        }}
                                    />

                                    {getUserActions(user.status)?.map((action) => {
                                        const config = actionConfig[action];

                                        return (
                                            <TableActionItem
                                                key={action}
                                                icon={config.icon}
                                                label={config.label}
                                                onClick={() => {
                                                    setOpenMenuId(null);
                                                    console.log(`${action} user`, user.id);
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </td>


                    </tr>
                ))}
            </tbody>
        </table>
    )
}