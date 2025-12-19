import { FetchImagesParams, UnsplashImage } from "@/types/UnsplashTypes";

export async function fetchImages(params: FetchImagesParams): Promise<UnsplashImage[]> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  const url = `/api/images?${searchParams.toString()}`;
  console.log("Fetching images:", url);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка при извлечении изображений");
  }

  return res.json();
}
