"use client";

import Image from "next/image";
import { useState } from "react";
import { GifImage } from "./GifImage";

interface GifListProps {
  gifs: any[];
}

export const GifList: React.FC<GifListProps> = ({ gifs }) => {
  if (!gifs?.length) return;

  return (
    <div className="flex gap-y-8 flex-wrap gap-x-4 w-full m-auto justify-between">
      {gifs.map((gif, index) => (
        <div key={index}>
          <GifImage gif={gif} />
        </div>
      ))}
    </div>
  );
};
