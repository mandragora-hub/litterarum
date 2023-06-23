import type { QueryItem } from "~/types";

export const QUERY_LIST = {
  book: <QueryItem[]>[
    {
      type: "books",
      title: "components.carousel.latest_books",
      query: "latest",
    },
    {
      type: "books",
      title: "components.carousel.trending_books",
      query: "trending",
    },
    {
      type: "books",
      title: "components.carousel.popular_books",
      query: "popular",
    },
    {
      type: "books",
      title: "components.carousel.top_rated_books",
      query: "top_rated",
    },
    {
      type: "books",
      title: "components.carousel.upcoming_books",
      query: "upcoming",
    },
    {
      type: "books",
      title: "components.carousel.you_may_like",
      query: "popular",
    },
  ],
  collection: <QueryItem[]>[
    { type: "collections", title: "Trending Books", query: "trending" },
  ],
  author: <QueryItem[]>[
    { type: "authors", title: "Popular Authors", query: "popular" },
    { type: "authors", title: "Top Rated Authors", query: "top_rated" },
  ],
};
