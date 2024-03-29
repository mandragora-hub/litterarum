export type MediaType = "books" | "collections" | "authors";
export interface QueryItem {
  type: MediaType;
  title: string;
  query: string;
}

export interface HealthcheckResult {
  uptime: number;
  message: string;
  timestamp: number;
}

export interface MetaPageResult {
  totalPages: number;
  currentPage: number;
  count: number;
}

export interface HttpApiResult {
  code: number;
  success: boolean;
  message: string;
}

export interface Result<T> extends HttpApiResult {
  data: T;
}

export interface PageResult<T> extends HttpApiResult {
  data: T[];
  meta: MetaPageResult;
}

export interface Tag {
  _id: string;
  tag: string;
}

export interface Author {
  _id: string;
  name: string;
  alias: string;
  photoUrl: string;
}

export interface Book {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  basename: string;
  coverUrl?: string;
  readTime?: number; // ?note: time in milliseconds
  wordCount?: number;
  pages?: number;
  downloaded: number;
  views: number;
  author: Author;
  tags: Tag[];
  pdfFile?: string;
  ePubFile?: string;
  publicationDate?: string; // 431-213 BC, 1982
  isbn?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TypeFile = "pdf" | "epub";
