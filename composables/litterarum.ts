import { LRUCache } from "lru-cache";
import { hash as ohash } from "ohash";
import type {
  MediaType,
  PageResult,
  Result,
  Book,
  HealthcheckResult,
  TypeFile,
} from "../types";

const cache = new LRUCache({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
});

function _fetchLitterarumApi(
  url: string,
  params: Record<string, string | number | undefined> = {}
) {
  const config = useRuntimeConfig();
  if (params.language == null) {
    const locale = useNuxtApp().$i18n.locale;
    params.language = unref(locale);
  }
  return $fetch(url, {
    baseURL: `${config.public.apiBaseUrl}/${config.public.apiVersion}`,
    headers: {
      Authorization: `Bearer ${config.public.apiToken}`,
    },
    params,
  });
}

export function fetchLitterarumApi(
  url: string,
  params: Record<string, string | number | undefined> = {}
): Promise<any> {
  const hash = ohash([url, params]);
  if (!cache.has(hash)) {
    cache.set(
      hash,
      _fetchLitterarumApi(url, params).catch((e) => {
        cache.delete(hash);
        throw e;
      })
    );
  }
  return Promise.resolve(cache.get(hash)!);
}

export function listMedia(
  type: MediaType,
  query: string,
  page: number,
  limit = 6
): Promise<PageResult<Book>> {
  return fetchLitterarumApi(`${type}/${query}`, { page, limit });
}

export function getBook(id: string): Promise<Result<Book>> {
  return fetchLitterarumApi(`books/${id}`);
}

export function downloadBook(id: string, type: TypeFile = "pdf"): Promise<any> {
  return fetchLitterarumApi(`books/${id}/download?type=${type}`);
}

export function healthcheckServer(): Promise<HealthcheckResult> {
  return fetchLitterarumApi(`healthcheck`);
}

export function searchBooks(
  query: string,
  page = 1,
  limit = 5
): Promise<PageResult<Book>> {
  return fetchLitterarumApi("search/books", { q: query, page, limit });
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
