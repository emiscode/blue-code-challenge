"use client";

import { useState } from "react";
import { fetchGifs } from "./actions";
import { FormQuery } from "./components/FormQuery";
import { GifList } from "./components/GifList";
import Pagination from "./components/Pagination";

export default function Home() {
  const [query, setQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchResults, setSearchResults] = useState<any>([] as any[]);
  const [pagination, setPagination] = useState<any>({} as any);

  const handleQuery = async (query: string, itemsPerPage: number) => {
    const queryData = await fetchGifs({ q: query, limit: itemsPerPage });
    setSearchResults(queryData.data);
    setPagination(queryData.pagination);
  };

  const handlePageChange = async (query: string, page: number) => {
    const queryData = await fetchGifs({
      q: query,
      offset: page,
      limit: itemsPerPage,
    });
    setSearchResults(queryData.data);
    setPagination(queryData.pagination);
  };

  return (
    <main className="flex flex-col items-center justify-between p-16 gap-y-8">
      <FormQuery
        onQuery={handleQuery}
        query={query}
        setQuery={setQuery}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
      <Pagination
        query={query}
        pagination={pagination}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />
      <GifList gifs={searchResults} />
    </main>
  );
}
