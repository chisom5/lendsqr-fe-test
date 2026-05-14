import { UserSummary } from "../../types/user"

interface SummaryCardProps {
    card: UserSummary
}
export function UserSummaryCard({ card }: SummaryCardProps) {
    const Icon = card.icon;

    return (
        <article
            key={card.label}
            className="rounded-lg border border-lendsqr-border bg-white p-6 shadow-card"
        >
            <div
                className={`
          mb-[14px]
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          ${card.tone}
        `}
            >
                <Icon className="h-5 w-5" />
            </div>


            <p className="text-xs font-semibold uppercase tracking-wide text-lendsqr-muted">
                {card.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-lendsqr-navy">{card.value}</p>
        </article>
    )
}