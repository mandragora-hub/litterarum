import type { QueryItem } from '~/types'

export const QUERY_LIST = {
  book: <QueryItem[]>[
    { type: 'books', title: 'Latest Books', query: 'latest' },
    { type: 'books', title: 'Trending Books', query: 'trending' },
    { type: 'books', title: 'Popular Books', query: 'popular' },
    { type: 'books', title: 'Top Rated Books', query: 'top_rated' },
    { type: 'books', title: 'Upcoming Books', query: 'upcoming' },
  ],
  collection: <QueryItem[]>[
    { type: 'collections', title: 'Trending Books', query: 'trending' },
  ],
  author: <QueryItem[]>[
    { type: 'authors', title: 'Popular Authors', query: 'popular' },
    { type: 'authors', title: 'Top Rated Authors', query: 'top_rated' },
  ],
}
