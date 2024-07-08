"use client";

import Image from "next/image";
import { useState } from "react";

interface GifImageProps {
  gif: any;
}

export const GifImage: React.FC<GifImageProps> = ({ gif }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-72 h-72 overflow-hidden items-center justify-center border border-gray-300 shadow-md flex flex-wrap rounded">
      {isLoading && (
        <p className="text-gray-600 text-xs absolute z-10 inset-0 flex items-center justify-center">
          Loading...
        </p>
      )}
      <Image
        src={gif.images.original.url}
        alt={gif.slug}
        width={300}
        height={300}
        objectFit="cover"
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};
