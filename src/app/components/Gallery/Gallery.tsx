"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { UnsplashImage } from "@/types/UnsplashTypes";

type Props = {
  images: UnsplashImage[];
  columnsCount?: number; 
};

export default function Gallery({ images, columnsCount = 4 }: Props) {
  const [columns, setColumns] = useState<UnsplashImage[][]>(
    Array.from({ length: columnsCount }, () => [])
  );

  useEffect(() => {
    if (!images || images.length === 0) return;

    const columnHeights = columns.map(col =>
      col.reduce((sum, img) => sum + img.height / img.width, 0)
    );

    const newColumns = [...columns.map(col => [...col])];

    images.forEach(img => {
      let minColIndex = 0;
      let minHeight = columnHeights[0];
      columnHeights.forEach((h, i) => {
        if (h < minHeight) {
          minHeight = h;
          minColIndex = i;
        }
      });

      newColumns[minColIndex].push(img);
      columnHeights[minColIndex] += img.height / img.width;
    });

    setColumns(newColumns);
  }, [images]);

  return (
    <div className="flex gap-4">
      {columns.map((col, i) => (
        <div key={i} className="flex flex-col gap-4 flex-1">
          {col.map((img, index) => (
            <div
              key={`${img.id}-${index}`}
              className="relative w-full rounded-lg overflow-hidden"
            >
              <div
                className="relative w-full"
                style={{ paddingTop: `${(img.height / img.width) * 100}%` }}
              >
                <Image
                  src={img.urls.small}
                  alt={img.alt_description || "photo"}
                  fill
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
