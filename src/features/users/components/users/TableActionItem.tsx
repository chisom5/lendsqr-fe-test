export function TableActionItem({
    icon: Icon,
    label,
    onClick,
}: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-lendsqr-navy hover:bg-lendsqr-surface/60"
            onClick={onClick}
        >
            <Icon className="h-4 w-4 text-lendsqr-muted" />
            {label}
        </button>
    );
}