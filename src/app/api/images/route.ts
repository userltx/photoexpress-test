import { NextResponse } from "next/server";
import type { UnsplashSearchResponse, UnsplashImage } from '@/types/UnsplashTypes'

const BASE_URL = "https://api.unsplash.com";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") ?? "1";
  const query = searchParams.get("query") ?? "nature";
  const orientation = searchParams.get("orientation");
  const color = searchParams.get("color");

  const params = new URLSearchParams({
    page,
    per_page: "30",
    query,
  });

  if (orientation) params.append("orientation", orientation);
  if (color) params.append("color", color);

  const res = await fetch(
    `${BASE_URL}/search/photos?${params.toString()}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Unsplash error" },
      { status: res.status }
    );
  }

  const data: UnsplashSearchResponse = await res.json();
  return NextResponse.json<UnsplashImage[]>(data.results);
}
