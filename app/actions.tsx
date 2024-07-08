"use server";

import { prismaClient } from "@/app/utils/prisma";
import { Search } from "@prisma/client";

const GIPHY_API_URL = process.env.GIPHY_API_URL;
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

export const fetchGifs = async (
  q = "cat",
  offset = 0,
  limit = 5
): Promise<any> => {
  const url = `https://${GIPHY_API_URL}?api_key=${GIPHY_API_KEY}&q=${q}&offset=${offset}&limit=${limit}`;
  console.log({ url });

  const response = await fetch(url);

  saveSearch(q);

  const data = await response.json();
  return data;
};

export const saveSearch = async (search: string): Promise<void> => {
  await prismaClient().search.create({
    data: {
      search,
    },
  });
};

export const fetchSearchHistory = async (): Promise<Search[]> => {
  const searches = await prismaClient().search.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return searches;
};

export const clearHistory = async (): Promise<void> => {
  await prismaClient().search.deleteMany();
};
