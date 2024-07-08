"use client";

import useSWR from "swr";

import { useEffect, useState } from "react";
import { fetchGifs } from "./actions";
import { FormQuery } from "./components/FormQuery";
import { GifList } from "./components/GifList";
import { SearchHistory } from "./components/SearchHistory";
import Pagination from "./components/Pagination";

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>([] as any[]);
  const [pagination, setPagination] = useState<any>({} as any);

  const handleQuery = async (query: string) => {
    const queryData = await fetchGifs(query);
    setSearchResults(queryData.data);
    setPagination(queryData.pagination);
    console.log("### handleQuery");
    console.log({ queryData, pagination });
  };

  const handlePageChange = async (query: string, offset: number) => {
    const queryData = await fetchGifs(query, offset);
    setSearchResults(queryData.data);
    setPagination(queryData.pagination);
    console.log("### handlePageChange");
    console.log({ queryData, pagination });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormQuery onQuery={handleQuery} query={query} setQuery={setQuery} />
      <Pagination
        query={query}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
      <GifList gifs={searchResults} />
    </main>
  );
}
