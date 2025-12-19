"use client";

import { useEffect, useState, useRef  } from "react";
import { fetchImages } from "@/lib/api";
import type { UnsplashImage, UnsplashOrientation } from "@/types/UnsplashTypes";
import Gallery from "@/app/components/Gallery/Gallery";
import Filters from "@/app/components/Filters";
import type { ColorFilter } from "@/types/ColorType";

export default function Page() {

  const [loadingFilters, setLoadingFilters] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);


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
    if (!query) return;
    if (page === 1) setLoadingFilters(true);
    else setLoadingMore(true);

    try {
      const data = await fetchImages({
        page,
        query: appliedQuery || "nature",
        color: appliedColor,
        orientation: appliedOrientation,
      });

      if (page === 1) {
        setImages(data); 
      } else {
        setImages((prev) => {
          const all = [...prev, ...data];
          const unique = Array.from(new Map(all.map(img => [img.id, img])).values());
          return unique;
        });
      }
    } catch (err) {
      console.error(err);
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



  useEffect(() => {
  if (!sentinelRef.current) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loadingFilters && !loadingMore && images.length > 0) {
        setPage((p) => p + 1);
      }
    },
    { rootMargin: "200px" }
  );
  observer.observe(sentinelRef.current);
  return () => observer.disconnect();
}, [sentinelRef.current, loadingMore, images.length]);



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
  {loadingFilters ? (
    <div className="text-center py-10 text-gray-500">Загрузка...</div>
  ) : images.length === 0 ? (
    <div className="text-center py-10 text-gray-500">Совпадений не найдено</div>
  ) : (
    <Gallery images={images} columnsCount={4} />
  )}

  <div ref={sentinelRef} className="h-1"></div>

  {!loadingFilters && loadingMore && page > 1 && (
    <div className="text-center py-4 text-gray-500">Подгружаем ещё...</div>
  )}
</main>
    </div>
  );
}
