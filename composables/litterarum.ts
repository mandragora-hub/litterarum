import type {
  MediaType,
  PageResult,
  Result,
  Book,
  HealthcheckResult,
  TypeFile,
} from "../types";

type DataE = {
  code: string;
  message: string;
};


export function fetchLitterarumApi<DataT = any>(url: string, options = {}) {
  const { addOperation, removeOperation } = useGlobalFetchLoading();
  const config = useRuntimeConfig();
  return useFetch<DataT, DataE>(url, {
    baseURL: `${config.public.apiBaseUrl}/${config.public.apiVersion}`,
    // headers: {
    //   Authorization: `Bearer ${config.public.apiToken}`,
    // },
    onRequest: () => addOperation(),
    onResponse: () => removeOperation(),
    ...options,
  });
}

export async function listMedia(
  type: MediaType,
  query: string,
  page: number,
  limit = 6
) {
  const result = await fetchLitterarumApi<PageResult<Book>>(
    `${type}/${query}`,
    {
      params: { page, limit },
    }
  );
  return result.data.value as NonNullable<PageResult<Book>>;
}

export function getBook(id: string) {
  return fetchLitterarumApi<Result<Book>>(`books/${id}`);
}

export async function getBookBySlug(slug: string): Promise<Result<Book>> {
  const promise = await fetchLitterarumApi<Result<Book[]>>(
    `books?slug=${slug}`
  );
  const result = promise.data.value;
  if (result && result.data.length > 0) {
    const newResult: Result<Book> = {
      ...result,
      data: result.data[0],
    };
    return newResult;
  }

  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

export function downloadBook(id: string, type: TypeFile = "pdf") {
  return fetchLitterarumApi(`books/${id}/download?type=${type}`);
}

export function healthcheckServer() {
  return fetchLitterarumApi<HealthcheckResult>(`healthcheck`);
}

export function searchBooks(query: string, page = 1, limit = 5) {
  return fetchLitterarumApi<PageResult<Book>>("search/books", {
    params: {
      q: query,
      page,
      limit,
    },
  });
}

export function incrementBookView(bookId: string) {
  return fetchLitterarumApi(`books/${bookId}/hit/views`, { method: "POST" });
}

export function incrementBookDownload(bookId: string) {
  return fetchLitterarumApi(`books/${bookId}/hit/download`, { method: "POST" });
}

// /**
//  * Get recommended
//  */
// export function getRecommendations(
//   type: MediaType,
//   id: string,
//   page = 1
// ): Promise<PageResult<Book>> {
//   return fetchLitterarumApi(`${type}/${id}/recommendations`, { page })
// }

// /**
//  * Get trending
//  */
// export function getTrending(media: string, page = 1) {
//   return fetchLitterarumApi(`trending/${media}/week`, { page })
// }

// /**
//  * Discover media by genre
//  */
// export function getMediaByGenre(
//   media: string,
//   genre: string,
//   page = 1
// ): Promise<PageResult<Book>> {
//   return fetchLitterarumApi(`discover/${media}`, {
//     with_genres: genre,
//     page,
//   })
// }

// /**
//  * Get author
//  */
// export function getAuthor(id: string | number, type: string): Promise<Author> {
//   return fetchLitterarumApi(`author/${id}/${type}`)
// }

// /**
//  * Get tag list
//  */
// export function getTagList(
//   media: string
// ): Promise<{ name: string; id: number }[]> {
//   return fetchLitterarumApi(`genre/${media}/list`).then((res) => res.genres)
// }

// /**
//  * Get person (single)
//  */

// export function getPerson(id: string): Promise<Person> {
//   return fetchLitterarumApi(`person/${id}`, {
//     append_to_response: 'images,combined_credits,external_ids',
//     include_image_language: 'en',
//   })
// }

// /**
