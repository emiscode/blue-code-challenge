import React, { useEffect } from "react";
import useSWR from "swr";
import { clearHistory, fetchSearchHistory } from "../actions";

interface SearchHistoryProps {
  setSearch: (search: string) => void;
  searchUpdatedAt: string;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  setSearch,
  searchUpdatedAt,
}) => {
  const { data: searchHistory, mutate } = useSWR(
    "searchHistory",
    fetchSearchHistory,
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    mutate();
  }, [searchUpdatedAt, mutate]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch(event.target.value);
  };

  const handleClearHistory = async () => {
    await clearHistory();
    mutate();
  };

  return (
    <div className="flex gap-x-4">
      <select
        id="searchHistory"
        onChange={handleChange}
        defaultValue=""
        className="border border-gray-300 border-dotted px-4 py-2 rounded"
      >
        <option value="" disabled>
          Last searches
        </option>
        {searchHistory?.map(({ id, search }) => (
          <option key={id} value={search}>
            {search}
          </option>
        ))}
      </select>
      <button
        onClick={handleClearHistory}
        className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-600 hover:text-gray-300"
      >
        Clear history
      </button>
    </div>
  );
};
