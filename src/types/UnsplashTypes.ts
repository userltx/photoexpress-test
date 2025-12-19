export type UnsplashImageUrls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};

export type UnsplashUser = {
  id: string;
  username: string;
  name: string;
};

export type UnsplashOrientation = "landscape" | "portrait" | "squarish" | ""

export type UnsplashImage = {
  id: string;
  width: number;
  height: number;
  color: string | null;
  alt_description: string | null;
  urls: UnsplashImageUrls;
  user: UnsplashUser;
};

export type FetchImagesParams = {
  page?: number;
  query?: string;
  orientation?: UnsplashOrientation;
  color?: string;
};

export type UnsplashSearchResponse = {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
};