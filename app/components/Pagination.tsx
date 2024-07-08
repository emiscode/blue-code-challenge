import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

interface PaginationProps {
  query: string;
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  itemsPerPage: number;
  onPageChange: (
    query: string,
    newOffset: number,
    itemsPerPage: number
  ) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  query,
  pagination,
  onPageChange,
  itemsPerPage,
}) => {
  if (!pagination.total_count) return;

  const totalPages = pagination
    ? Math.ceil(pagination.total_count / pagination.count)
    : 0;
  const currentPage = pagination
    ? Math.floor(pagination.offset / pagination.count) + 1
    : 1;

  const goToPage = (pageNumber: number) => {
    const newOffset = (pageNumber - 1) * pagination.count;
    onPageChange(query, newOffset, itemsPerPage);
  };

  return (
    <div className="flex gap-x-4 items-center justify-center">
      {currentPage > 1 && (
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="flex bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-300"
        >
          <ChevronLeftIcon />
          <span>Previous</span>
        </button>
      )}
      <p>{`${currentPage} out of ${totalPages}`}</p>
      {currentPage < totalPages && (
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="flex bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-300"
        >
          <span>Next</span>
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
};

export default Pagination;
