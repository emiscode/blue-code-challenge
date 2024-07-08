"use client";

import { useState } from "react";
import { SearchHistory } from "./SearchHistory";

interface FormQueryProps {
  query: string;
  onQuery: (query: string, itemsPerPage: number) => void;
  setQuery: (query: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export const FormQuery: React.FC<FormQueryProps> = ({
  onQuery,
  query,
  setQuery,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [searchUpdatedAt, setSearchUpdatedAt] = useState("");

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onQuery(query, itemsPerPage);
    setSearchUpdatedAt(new Date().toISOString());
  };

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col gap-x-8 items-center justify-center gap-y-4 w-full">
      <form onSubmit={handleSubmit} className="flex gap-x-4 w-1/2">
        <input
          type="text"
          value={query}
          onChange={handleChangeQuery}
          className="border border-gray-300 w-full rounded px-4"
        />
        <select
          value={itemsPerPage}
          onChange={handleChangeItemsPerPage}
          className="border border-gray-300 rounded px-4"
        >
          {[5, 10, 15, 20, 25].map((value) => (
            <option key={value} value={value}>
              {value} items per page
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      <SearchHistory setSearch={setQuery} searchUpdatedAt={searchUpdatedAt} />
    </div>
  );
};
