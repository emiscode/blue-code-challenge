"use client";

import Image from "next/image";

interface GifListProps {
  gifs: any[];
}

export const GifList: React.FC<GifListProps> = ({ gifs }) => {
  console.log({ gifs });

  if (!gifs?.length) return;

  return (
    <div className="flex gap-x-4">
      {gifs.map((gif, index) => (
        <div key={index}>
          <Image
            src={gif.images.original.url}
            alt={`Gif ${index}`}
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};
