import { useState, useMemo, useEffect, useRef } from "react";

interface PaginationConfig {
  mobile: number;
  desktop: number;
}

export const usePagination = <T>(
  items: T[],
  itemsPerPage: number,
  isMobile: boolean = false,
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const prevItemsLength = useRef(items.length);
  const prevIsMobile = useRef(isMobile);

  // Adjust items per page based on screen size
  const actualItemsPerPage = isMobile ? 6 : itemsPerPage;

  const totalPages = Math.ceil(items.length / actualItemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * actualItemsPerPage;
    const endIndex = startIndex + actualItemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, actualItemsPerPage]);

  // Reset to page 1 if items length changed (filtering) or screen size changed
  useEffect(() => {
    if (
      prevItemsLength.current !== items.length ||
      prevIsMobile.current !== isMobile
    ) {
      setCurrentPage(1);
      prevItemsLength.current = items.length;
      prevIsMobile.current = isMobile;
    }
  }, [items.length, isMobile]);

  // If current page is beyond total pages, go to last page
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    resetPagination,
    totalItems: items.length,
    itemsPerPage: actualItemsPerPage,
  };
};
