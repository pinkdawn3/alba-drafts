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

export type Book = {
  title: string;
  author: string;
};
