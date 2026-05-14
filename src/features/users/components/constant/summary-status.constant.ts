
import UsersIcon from "@/assets/np_users.svg?react";
import ActiveUsersIcon from "@/assets/np_active_users.svg?react";
import LoanUsersIcon from "@/assets/np_loan.svg?react";
import SavingsUsersIcon from "@/assets/np_money.svg?react";
import { UserSummary } from "../../types/user";

export const summaryCards: UserSummary[] = [
    {
        label: "USERS",
        value: "2,453",
        tone: "bg-[#DF18FF]/10 text-[#DF18FF]",
        icon: UsersIcon,
    },
    {
        label: "ACTIVE USERS",
        value: "2,453",
        tone: "bg-[#5718FF]/10 text-[#5718FF]",
        icon: ActiveUsersIcon,
    },
    {
        label: "USERS WITH LOANS",
        value: "12,453",
        tone: "bg-[#F55F44]/10 text-[#F55F44]",
        icon: LoanUsersIcon,
    },
    {
        label: "USERS WITH SAVINGS",
        value: "102,453",
        tone: "bg-[#FF3366]/10 text-[#FF3366]",
        icon: SavingsUsersIcon,
    },
];