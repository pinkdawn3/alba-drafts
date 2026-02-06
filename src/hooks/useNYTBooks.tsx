import { useQuery } from "@tanstack/react-query";
import type {
  GoogleBook,
  NYTBestSellersResponse,
  NYTBook,
} from "../types/book";

const fetchNYTBestSellers = async (): Promise<NYTBestSellersResponse> => {
  const API_KEY = import.meta.env.VITE_NYTIMES_BOOKS_API_KEY;
  const response = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch NYT best sellers");
  }

  return response.json();
};

const searchGoogleBookByISBN = async (
  isbn: string,
): Promise<GoogleBook | null> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
    );
    const data = await response.json();
    console.log("google api:", data);

    if (data.items && data.items.length > 0) {
      return data.items[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching from Google Books:", error);
    return null;
  }
};

export function useNYTBooks() {
  return useQuery({
    queryKey: ["nyt-trending-as-google-books"],
    queryFn: async () => {
      const nytData = await fetchNYTBestSellers();
      const nytBooks = nytData.results.books;

      console.log("nytbooks", nytData);

      const googleBooksPromises = nytBooks.map((nytBook: NYTBook) =>
        searchGoogleBookByISBN(nytBook.primary_isbn13),
      );

      const googleBooks = await Promise.all(googleBooksPromises);

      return googleBooks.filter(
        (book): book is GoogleBook =>
          book !== null && book.volumeInfo.title !== undefined,
      );
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
