import React from "react";

interface PaginationProps {
  query: string;
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  onPageChange: (query: string, newOffset: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  query,
  pagination,
  onPageChange,
}) => {
  console.log({ pagination });
  if (!pagination.total_count) return;

  const totalPages = pagination
    ? Math.ceil(pagination.total_count / pagination.count)
    : 0;
  const currentPage = pagination
    ? Math.floor(pagination.offset / pagination.count) + 1
    : 1;

  const goToPage = (pageNumber: number) => {
    const newOffset = (pageNumber - 1) * pagination.count;
    onPageChange(query, newOffset);
  };

  return (
    <div className="flex gap-x-4">
      <p>{`${currentPage} out of ${totalPages}`}</p>
      {currentPage > 1 && (
        <button onClick={() => goToPage(currentPage - 1)}>Previous</button>
      )}
      {currentPage < totalPages && (
        <button onClick={() => goToPage(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
