"use client";

import { useState } from "react";
import { SearchHistory } from "./SearchHistory";

interface FormQueryProps {
  query: string;
  onQuery: (query: string) => void;
  setQuery: (query: string) => void;
}

export const FormQuery: React.FC<FormQueryProps> = ({
  onQuery,
  query,
  setQuery,
}) => {
  const [searchUpdatedAt, setSearchUpdatedAt] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onQuery(query);
    setSearchUpdatedAt(new Date().toISOString());
  };

  return (
    <div className="flex gap-x-8 items-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="border border-gray-300"
        />
        <button type="submit">Search</button>
      </form>
      <SearchHistory setSearch={setQuery} searchUpdatedAt={searchUpdatedAt} />
    </div>
  );
};
