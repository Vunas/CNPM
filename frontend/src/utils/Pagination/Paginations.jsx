import { useState, useMemo, useCallback } from "react";

export const usePagination = (data = [], itemsPerPage = 8) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
    },
    [totalPages]
  );

  const nextPage = useCallback(
    () => goToPage(currentPage + 1),
    [currentPage, goToPage]
  );
  const prevPage = useCallback(
    () => goToPage(currentPage - 1),
    [currentPage, goToPage]
  );

  return {
    currentPage,
    totalPages,
    currentData,
    setPage: goToPage,
    nextPage,
    prevPage,
  };
};
