import { zodResolver } from "@hookform/resolvers/zod";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import {
  usersFilterSchema,
  type UsersFilterFormValues,
} from "@/features/users/api/users-filter-schema";
import { usePagination } from "@/shared/hooks/usePagination";
import { Pagination } from "./components/users/Pagination";
import { UserFilterDropdown } from "./components/users/FilterDropdown";
import { UserTable } from "./components/users/Table";
import { useUsersListQuery } from "./api/use-users-list-query";
import { UserSummaryCard } from "./components/users/SummaryCard";
import { summaryCards } from "./components/constant/summary-status.constant";
import { UserStatus } from "@/types/user";

const FILTER_PANEL_W = 320;
const FILTER_PANEL_GAP = 8;


export function UsersPage() {
  const Id = useId();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number } | null>(null);
  const anchorButtonRef = useRef<HTMLButtonElement | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<UsersFilterFormValues>({});

  const listQuery = useMemo(
    () => ({
      page,
      pageSize,
      organization: appliedFilters.organization,
      username: appliedFilters.username,
      email: appliedFilters.email,
      phoneNumber: appliedFilters.phoneNumber,
      status: (appliedFilters.status as UserStatus | "" | undefined) ?? "",
      dateFrom: appliedFilters.joinedDate || undefined,
      dateTo: appliedFilters.joinedDate || undefined,
    }),
    [appliedFilters, page, pageSize],
  );

  const { data, isLoading, isError, error, isFetching } = useUsersListQuery(listQuery);
  const {
    totalPages,
    pageItems,
    hasNextPage,
    hasPrevPage,
  } = usePagination({ total: data?.total ?? 0, pageSize: 10, currentPage: page })


  const filterForm = useForm<UsersFilterFormValues>({
    resolver: zodResolver(usersFilterSchema),
    defaultValues: appliedFilters,
  });

  const updatePanelPosition = useCallback(() => {
    const el = anchorButtonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const left = Math.min(
      Math.max(FILTER_PANEL_GAP, rect.left),
      window.innerWidth - FILTER_PANEL_W - FILTER_PANEL_GAP,
    );
    setPanelPosition({ top: rect.bottom + FILTER_PANEL_GAP, left });
  }, []);

  const openFilters = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    anchorButtonRef.current = event.currentTarget;
    filterForm.reset(appliedFilters);
    updatePanelPosition();
    setFiltersOpen(true);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
    setPanelPosition(null);
    anchorButtonRef.current = null;
  };

  useLayoutEffect(() => {
    if (!filtersOpen) return;
    updatePanelPosition();
    const onReposition = () => updatePanelPosition();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [filtersOpen, updatePanelPosition]);

  useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFilters();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtersOpen]);

  const applyFilters = filterForm.handleSubmit((values) => {
    setAppliedFilters(values);
    setPage(1);
    closeFilters();
  });

  const resetFilters = () => {
    filterForm.reset({});
    setAppliedFilters({});
    setPage(1);
    closeFilters();
  };

  const filterDropdown =
    filtersOpen && panelPosition
      ? createPortal(
        <>
          <div
            className="fixed inset-0 z-[60] bg-lendsqr-navy/10"
            aria-hidden
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeFilters();
            }}
          />

          <UserFilterDropdown
            panelPosition={panelPosition}
            filterForm={filterForm}
            applyFilters={applyFilters}
            resetFilters={resetFilters} />
        </>,
        document.body,
      )
      : null;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-semibold text-lendsqr-navy md:text-3xl">Users</h1>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card, index) => (
          <UserSummaryCard card={card} key={`${Id}-${index}`} />
        ))}

      </section>

      <section className="rounded-lg border border-lendsqr-border bg-white shadow-card">
        <div className="overflow-x-auto">

          <UserTable
            isLoading={isLoading}
            isError={isError}
            error={error as Error}
            data={data}
            openFilters={openFilters}
          />
        </div>
      </section>


      <Pagination
        page={page}
        pageSize={pageSize}
        total={data?.total ?? 0}
        isFetching={isFetching}
        pageItems={pageItems}
        totalPages={totalPages}
        hasNext={hasNextPage}
        hasPrev={hasPrevPage}
        onPageChange={setPage}
        onNext={() => setPage((p) => p + 1)}
        onPrev={() => setPage((p) => p - 1)}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
      />
      {filterDropdown}
    </div>
  );
}
