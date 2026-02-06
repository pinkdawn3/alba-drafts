import { useQuery } from "@tanstack/react-query";
import { lazy, useEffect, useState } from "react";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import Spinner from "../../../Spinner/Spinner";
const BookPage = lazy(() => import("../BookPage/BookPage"));

import SearchBar from "../../../../utils/SearchBar";
import { useBooks } from "../../../../hooks/useBooks";
import { useNYTBooks } from "../../../../hooks/useNYTBooks";

import type {
  BookType,
  GoogleBook,
  GoogleBooksResponse,
} from "../../../../types/book";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const searchBooks = async (query: string): Promise<GoogleBooksResponse> => {
  if (!query || query.length <= 2) {
    return { kind: "books#volumes", totalItems: 0, items: [] };
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&printType=books&orderBy=relevance&maxResults=40&key=${API_KEY}`;

  //console.log("Fetching URL:", url); // See the actual URL

  const response = await fetch(url);

  //console.log("Response status:", response.status); // Check status code

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();
  //console.log("API Response:", data);

  return data;
};

const getUniqueBooks = (books?: GoogleBook[]) => {
  if (!books) return [];

  const seen = new Set<string>();

  return books.filter((book) => {
    const title = book.volumeInfo.title.toLowerCase().trim();
    const author = book.volumeInfo.authors?.[0]?.toLowerCase().trim() || "";
    const key = `${title}-${author}`;
    const image = book.volumeInfo.imageLinks;

    /* console.log("title", book.volumeInfo.title);
    console.log("img", book.volumeInfo.imageLinks);
 */
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);
  const [toggleMobileId, setToggleMobileId] = useState<string | null>(null);

  const handleSave = (googleBook: GoogleBook) => {
    toast(i18n._("Book added to Shelf."), {
      position: "top-center",
    });
    const book: BookType = {
      id: googleBook.id,
      title: googleBook.volumeInfo.title,
      authors: googleBook.volumeInfo.authors,
      img: getLargerImage(googleBook.volumeInfo.imageLinks?.thumbnail),
      description: googleBook.volumeInfo.description,
      publishedDate: googleBook.volumeInfo.publishedDate,
      pageCount: googleBook.volumeInfo.pageCount,
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

  const handleBookClick = (book: GoogleBook) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const toggleMobileVisibility = (bookId: string) => {
    setToggleMobileId(toggleMobileId === bookId ? null : bookId);
  };

  return (
    <div className="py-7 mx-10 flex flex-wrap items-center justify-center gap-5">
      {books.map((book: GoogleBook) => (
        <article
          key={book.id}
          className="relative overflow-hidden bg-indigo-200 dark:bg-zinc-700 rounded-lg w-32 sm:w-48 mb-3"
          onTouchStart={() => toggleMobileVisibility(book.id)}
        >
          <div className="relative flex flex-col justify-center items-center group">
            <div className="w-full relative">
              <button
                type="button"
                aria-label="view book details"
                className="w-full"
              >
                <img
                  className={`w-full h-44 sm:h-64 object-cover transition ${
                    toggleMobileId === book.id
                      ? "opacity-50"
                      : "group-hover:opacity-50"
                  }`}
                  alt={book.volumeInfo.title}
                  src={getLargerImage(book.volumeInfo.imageLinks?.thumbnail)}
                />
              </button>

              <button
                type="button"
                aria-label="add book"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 bg-black/20 hover:bg-black/30 active:bg-black/40 border border-dashed border-white text-white rounded-lg transition ${
                  toggleMobileId === book.id
                    ? "opacity-100"
                    : "opacity-0 sm:group-hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave(book);
                }}
              >
                <Trans>Add to Shelf</Trans>
              </button>

              <button
                type="button"
                aria-label="open book details"
                className={`absolute bottom-3 right-1 p-1 bg-black/20 hover:bg-black/30 active:bg-black/40 border border-dashed border-white rounded-lg opacity-0 group-hover:opacity-100 transition z-10 
                                    ${
                                      toggleMobileId === book.id
                                        ? "opacity-100"
                                        : "opacity-0 group-hover:opacity-100"
                                    }
                                      `}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleBookClick(book);
                }}
              >
                <FontAwesomeIcon icon={faBookOpen} color="white" />
              </button>
            </div>

            <div className="p-2 sm:p-4">
              <h3
                className="font-bold text-xs sm:text-sm line-clamp-2 mb-2 h-8 sm:h-10 text-font"
                title={book.volumeInfo.title}
              >
                {book.volumeInfo.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 h-4 sm:h-5">
                {book.volumeInfo.authors?.join(", ")}
              </p>
            </div>
          </div>
        </article>
      ))}
      {isModalOpen && selectedBook && (
        <BookPage
          googleBook={selectedBook}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

function BookSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { data: trendingBooks } = useNYTBooks();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", debouncedSearchTerm],
    queryFn: () => searchBooks(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 2,
    staleTime: 0,
    gcTime: 0, // Don't cache results
  });

  const uniqueBooks = getUniqueBooks(data?.items);

  const booksForGallery =
    uniqueBooks.length === 0 ? trendingBooks : uniqueBooks;

  return (
    <div className="w-full">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={i18n._("Search books...")}
      />
      {isLoading && <Spinner />}
      {error && <p>Error: {error.message}</p>}
      {uniqueBooks.length === 0 && (
        <h2 className="mx-10 font-semibold text-4xl">
          <Trans>Trending</Trans>
        </h2>
      )}
      <BookGallery books={booksForGallery || []} />
    </div>
  );
}

export default BookSearch;
