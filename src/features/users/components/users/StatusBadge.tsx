import { UserStatus } from "../../types/user";

const styles: Record<
  UserStatus,
  { bg: string; text: string; label: string }
> = {
  active: { bg: "bg-[#E5F7ED]", text: "text-[#39CD62]", label: "Active" },
  inactive: { bg: "bg-[#F3F3F5]", text: "text-lendsqr-muted", label: "Inactive" },
  pending: { bg: "bg-[#FFF7E5]", text: "text-[#E9B949]", label: "Pending" },
  blacklisted: { bg: "bg-[#FCE6E6]", text: "text-[#E4033B]", label: "Blacklisted" },
};

export function StatusBadge({ status }: { status: UserStatus }) {
  const s = styles[status];
  return (
    <span
      className={`inline-flex min-w-[84px] h-[30px] justify-center rounded-full px-3 py-1 text-xs font-medium items-center ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}
