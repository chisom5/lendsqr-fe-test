import {useMemo } from 'react'

export type PageItem = number | 'ellipsis'

interface UsePaginationProps {
  total: number       
  pageSize?: number   
  currentPage: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  pageItems: PageItem[]    
  pageSize: number
  hasNextPage: boolean
  hasPrevPage: boolean     
}

function buildPageItems(current: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: PageItem[] = [1]
  const windowStart = Math.max(2, current - 1)
  const windowEnd = Math.min(totalPages - 1, current + 1)

  if (windowStart > 2) pages.push('ellipsis')
  for (let p = windowStart; p <= windowEnd; p++) pages.push(p)
  if (windowEnd < totalPages - 1) pages.push('ellipsis')
  pages.push(totalPages)

  return pages
}

export function usePagination({
  total,
  pageSize = 10,
  currentPage,
}: UsePaginationProps): Omit<UsePaginationReturn, 'currentPage'> {

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize]
  )

  // If total shrinks (e.g. after filtering) and currentPage is now
  // out of range, clamp it back to the last valid page
  const safePage = Math.min(currentPage, totalPages)

  const pageItems = useMemo(
    () => buildPageItems(safePage, totalPages),
    [safePage, totalPages]
  )

  return {
    totalPages,
    pageItems,
    pageSize,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  }
}