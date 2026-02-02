export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    averageRating?: number;
    ratingsCount?: number;
  };
  saleInfo?: {
    country?: string;
    saleability?: string;
    isEbook?: boolean;
  };
}

// API Response type
export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBook[];
}

export type BookStatus = "not-started" | "in-progress" | "paused" | "completed";
export const BookStatuses: BookStatus[] = [
  "not-started",
  "in-progress",
  "paused",
  "completed",
];

export type BookType = {
  id: string;
  title: string;
  authors?: string[];
  img?: string;
  description?: string;
  status: BookStatus;
  rating: number;
  review: string;
};

export interface BookProps {
  [bookId: string]: BookType;
}
