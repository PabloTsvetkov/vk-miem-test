const BASE_URL = "https://rickandmortyapi.com/api";

import type { QueryParams } from "../types/QueryParams";

export async function getCharacters(params: QueryParams) {
  const searchParams = new URLSearchParams(
    params as Record<string, string>,
  ).toString();

  const response = await fetch(`${BASE_URL}/character?${searchParams}`, {
    method: "GET",
  });

  if (response.status === 404) {
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }

  if (!response.ok) {
    throw new Error("Ошибка запроса на сервер");
  }

  return await response.json();
}
