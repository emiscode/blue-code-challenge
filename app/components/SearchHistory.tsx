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
    <div>
      <label htmlFor="searchHistory">History: </label>
      <select id="searchHistory" onChange={handleChange} defaultValue="">
        <option value="" disabled>
          Last searches
        </option>
        {searchHistory?.map(({ id, search }) => (
          <option key={id} value={search}>
            {search}
          </option>
        ))}
      </select>
      <button onClick={handleClearHistory}>Clear history</button>
    </div>
  );
};
