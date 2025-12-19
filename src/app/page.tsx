"use client";

import { useEffect, useState, useRef  } from "react";
import { fetchImages } from "@/lib/api";
import type { UnsplashImage, UnsplashOrientation } from "@/types/UnsplashTypes";
import Gallery from "@/app/components/Gallery";
import Filters from "@/app/components/Filters";
import type { ColorFilter } from "@/types/ColorType";

export default function Page() {

  const [loadingFilters, setLoadingFilters] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);


  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  
  const [query, setQuery] = useState("nature");
  const [color, setColor] = useState<ColorFilter["value"] | "">("");
  const [orientation, setOrientation] = useState<UnsplashOrientation>("");
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  
  const [appliedQuery, setAppliedQuery] = useState(query);
  const [appliedColor, setAppliedColor] = useState(color);
  const [appliedOrientation, setAppliedOrientation] = useState(orientation);


  useEffect(() => {
  const fetchImagesData = async () => {
    const effectiveQuery = appliedQuery || "nature";
    if (!effectiveQuery) return;

    page === 1 ? setLoadingFilters(true) : setLoadingMore(true);

    try {
      const data = await fetchImages({
        page,
        query: effectiveQuery,
        color: appliedColor,
        orientation: appliedOrientation,
      });

      setImages(data);

      setHasError(false);
    } catch (err) {
      console.error(err);
      setHasError(true);
    } finally {
      setLoadingFilters(false);
      setLoadingMore(false);
    }
  };

  fetchImagesData();
}, [page, appliedQuery, appliedColor, appliedOrientation]);



  const handleApplyFilters = () => {
    setPage(1);   
    setAppliedQuery(query);
    setAppliedColor(color);
    setAppliedOrientation(orientation);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-84 p-4 bg-gray-100 border-r border-gray-300 sticky top-0 h-full">
        <Filters 
        query={query} 
        setQuery={setQuery} 
        color={color}
        setColor={setColor}
        orientation={orientation} 
        setOrientation={setOrientation}
        onApply={handleApplyFilters}
        />
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
  {loadingFilters || loadingMore ? (
    <div className="text-center py-10 text-gray-500">Загрузка...</div>
  ) : images.length === 0 ? (
    <div className="text-center py-10 text-gray-500">Совпадений не найдено</div>
  ) : (
    <>
    <Gallery images={images} columnsCount={4} />
    <div className="flex fixed bottom-[10px] p-[20px] left-0 right-0 ml-84 justify-center gap-4 mt-8">
          <button
            disabled={page === 1 || loadingFilters}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-md border disabled:opacity-40 bg-white"
          >
            Назад
          </button>

          <span className="px-2 py-2 text-gray-600 bg-white rounded-md border">
            Страница {page}
          </span>

          <button
            disabled={images.length < 30 || loadingFilters}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-md border disabled:opacity-40 bg-white"
          >
            Далее
          </button>
        </div>
            </>
  )}
</main>
    </div>
  );
}
