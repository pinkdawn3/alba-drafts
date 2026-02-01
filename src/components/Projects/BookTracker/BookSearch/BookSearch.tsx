import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type {
  BookType,
  GoogleBook,
  GoogleBooksResponse,
} from "../../../../types/book";
import SearchBar from "../../../../utils/SearchBar";
import { useBooks } from "../../../../hooks/useBooks";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const searchBooks = async (query: string): Promise<GoogleBooksResponse> => {
  if (!query) return { kind: "books#volumes", totalItems: 0, items: [] };

  // Language or country restrictions for some reason don't work :c I guess it's because it's coming from the front-end instead of server-side
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&printType=books&orderBy=relevance&maxResults=40&key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};

const getUniqueBooks = (books?: GoogleBook[]) => {
  if (!books) return [];

  const seen = new Set<string>();

  return books.filter((book) => {
    const title = book.volumeInfo.title.toLowerCase().trim();
    const author = book.volumeInfo.authors?.[0]?.toLowerCase().trim() || "";
    const key = `${title}-${author}`;
    const image = book.volumeInfo.imageLinks;

    if (image == undefined) {
      return false;
    }

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const getLargerImage = (url?: string) => {
  if (!url) return undefined;

  // Extract book ID from the original URL
  const match = url.match(/id=([^&]+)/);
  if (!match) return url; // Fallback to original if we can't extract ID

  const bookId = match[1];

  return `https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w400-h600&source=gbs_api`;
};

interface BookGalleryProp {
  books: GoogleBook[];
}

function BookGallery({ books }: BookGalleryProp) {
  const { dispatch } = useBooks();

  const handleSave = (googleBook: GoogleBook) => {
    const book: BookType = {
      id: googleBook.id,
      title: googleBook.volumeInfo.title,
      authors: googleBook.volumeInfo.authors,
      img: getLargerImage(googleBook.volumeInfo.imageLinks?.thumbnail),
      description: googleBook.volumeInfo.description,
      status: "not-started",
      rating: 0,
      review: "",
    };

    if (book.title.trim() !== "") {
      dispatch({
        type: "add",
        book,
      });
    }
  };

  return (
    <div className="p-1 flex flex-wrap items-center justify-center">
      {books.map((book: GoogleBook) => (
        <article
          key={book.id}
          className="shrink-0 m-6 relative overflow-hidden bg-zinc-700 rounded-lg w-48 shadow-lg"
        >
          <div className="relative flex flex-col justify-center items-center group">
            <img
              className="w-full h-64 object-cover group-hover:opacity-50 transition"
              alt={book.volumeInfo.title}
              src={getLargerImage(book.volumeInfo.imageLinks?.thumbnail)}
            />
            <button
              type="button"
              aria-label="add book"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 bg-black/20 hover:bg-black/30 active:bg-black/40  border border-dashed border-white rounded-lg opacity-0 group-hover:opacity-100 transition"
              onClick={() => handleSave(book)}
            >
              Add to shelf
            </button>
          </div>

          <div className="p-4">
            {/* TODO: create hook for tooltip on ellipsis */}
            <h3
              className="font-bold text-sm line-clamp-2 mb-2"
              title={book.volumeInfo.title}
            >
              {book.volumeInfo.title}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-1">
              {book.volumeInfo.authors?.join(", ")}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function BookSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", searchTerm],
    queryFn: () => searchBooks(searchTerm),
    enabled: searchTerm.length > 2,
  });

  const uniqueBooks = getUniqueBooks(data?.items);

  return (
    <div className="w-full">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search books..."
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <BookGallery books={uniqueBooks || []} />
    </div>
  );
}

export default BookSearch;
