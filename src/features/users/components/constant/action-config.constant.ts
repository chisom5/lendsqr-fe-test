import { Eye, UserCheck, UserX } from "lucide-react";

export const actionConfig = {
    view: {
        label: "View Details",
        icon: Eye,
        variant: "view",
    },
    activate: {
        label: "Activate User",
        icon: UserCheck,
        variant: "activate",
    },
    blacklist: {
        label: "Blacklist User",
        icon: UserX,
        variant: "danger",
    },
    inactivate: {
        label: "In-Activate User",
        icon: UserX,
        variant: "warning",
    },
} as const;

export type ActionKey = keyof typeof actionConfig;