import { PageItem } from "@/shared/hooks/usePagination";

interface PaginationProps {
    page: number
    pageSize: number
    total: number
    pageItems: PageItem[]
    totalPages?: number
    hasNext: boolean
    hasPrev: boolean
    onPageChange: (page: number) => void
    onNext: () => void
    onPrev: () => void
    onPageSizeChange: (size: number) => void
    isFetching: boolean
}
export function Pagination({ page, total, pageSize, onPageSizeChange, isFetching, hasPrev, onPrev, hasNext, onNext, pageItems, onPageChange}: PaginationProps) {
    return (
        <footer className="flex flex-col gap-4 !px-0 py-4 text-sm text-lendsqr-muted md:flex-row md:items-center md:justify-between md:px-6 !mt-0 ">
            <div className="flex flex-wrap items-center gap-2">
                <span>Showing</span>
                <label className="inline-flex items-center gap-2">
                    <select
                        className="rounded-md border border-lendsqr-border bg-lendsqr-muted/10 px-3 py-1 text-sm font-semibold text-lendsqr-navy focus-visible:outline-noe"
                        value={pageSize}
                        onChange={(event) => {
                            onPageSizeChange(Number(event.target.value))
                        }}
                    >
                        {[100, 50, 25, 10].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </label>
                <span>
                    out of {total}
                    {isFetching ? " · updating…" : null}
                </span>
            </div>

            <nav className="flex flex-wrap items-center gap-2" aria-label="Pagination">
                <button
                    type="button"
                    className="rounded-md border border-lendsqr-border bg-lendsqr-muted/10 px-3 py-1 text-sm font-semibold text-lendsqr-muted hover:border-lendsqr-primary hover:text-lendsqr-navy disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={onPrev}
                    disabled={!hasPrev}
                >
                    ‹
                </button>
                {pageItems.map((item, idx) =>
                    item === "ellipsis" ? (
                        <span key={`e-${idx}`} className="px-2">
                            …
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            className={[
                                "min-w-[36px] rounded-md px-3 py-1 text-sm font-semibold",
                                item === page
                                    ? "bg-lendsqr-primary text-white"
                                    : "border border-transparent text-lendsqr-muted hover:border-lendsqr-border hover:text-lendsqr-navy",
                            ].join(" ")}
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </button>
                    ),
                )}
                <button
                    type="button"
                    className="rounded-md border border-lendsqr-border bg-lendsqr-muted/10 px-3 py-1 text-sm font-semibold text-lendsqr-muted hover:border-lendsqr-primary hover:text-lendsqr-navy disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={onNext}
                    disabled={!hasNext}
                >
                    ›
                </button>
            </nav>
        </footer>
    )
}