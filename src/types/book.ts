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
  publishedDate?: string;
  pageCount?: number;
  status: BookStatus;
  rating: number;
  review: string;
};

export interface BookProps {
  [bookId: string]: BookType;
}

export interface NYTBook {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  primary_isbn13: string;
  primary_isbn10: string;
  publisher: string;
  description: string;
  price: string;
  title: string;
  author: string;
  contributor: string;
  contributor_note: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  amazon_product_url: string;
  age_group: string;
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
  isbns: Array<{
    isbn10: string;
    isbn13: string;
  }>;
  buy_links: Array<{
    name: string;
    url: string;
  }>;
}

export interface NYTBestSellersResponse {
  status: string;
  copyright: string;
  num_results: number;
  last_modified: string;
  results: {
    list_name: string;
    list_name_encoded: string;
    bestsellers_date: string;
    published_date: string;
    published_date_description: string;
    next_published_date: string;
    previous_published_date: string;
    display_name: string;
    normal_list_ends_at: number;
    updated: string;
    books: NYTBook[];
  };
}
