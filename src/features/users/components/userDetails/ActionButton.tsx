import { actionConfig, ActionKey } from "../constant/action-config.constant";

export function ActionButton({
    action,
    onClick,
}: {
    action: ActionKey;
    onClick: () => void;
}) {
    const config = actionConfig[action];

    return (
        <button
            key={action}
            type="button"
            className={[
                "rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide hover:opacity-80",
                config.variant === "danger" && "border border-[#E4033B] text-[#E4033B] hover:bg-[#E4033B]/5",
                config.variant === "activate" && "border border-lendsqr-primary text-lendsqr-primary hover:bg-lendsqr-primary/10",
                config.variant === "warning" && "border border-yellow-500 text-yellow-600 hover:bg-yellow-50",
            ].join(" ")}
            onClick={onClick}

        >
            {config.label}
        </button>
    );
}