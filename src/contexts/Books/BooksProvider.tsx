import useLocalStorageState from "use-local-storage-state";
import { useEffect, useReducer, type ReactNode } from "react";
import type { BookProps, BookType } from "../../types/book";
import { BooksContext } from "./BooksContext";

interface BooksProviderProviderProps {
  children: ReactNode;
}

export type Action =
  | { type: "add"; book: BookType }
  | { type: "remove"; id: string }
  | {
      type: "update";
      id: string;
      changes: Partial<BookType>;
    };

function booksReducer(state: BookProps, action: Action): BookProps {
  switch (action.type) {
    case "add":
      return {
        ...state,
        [action.book.id]: action.book,
      };

    case "remove": {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    case "update": {
      const book = state[action.id];
      if (!book) return state;

      return {
        ...state,
        [action.id]: {
          ...book,
          ...action.changes,
        },
      };
    }
  }
}

export function BooksProvider({ children }: BooksProviderProviderProps) {
  const [storedBooks, setStoredBooks] = useLocalStorageState<BookProps>(
    "books",
    { defaultValue: {} },
  );

  const [books, dispatch] = useReducer(booksReducer, storedBooks);

  useEffect(() => {
    setStoredBooks(books);
  }, [books, setStoredBooks]);

  const getBooks = () => {
    return Object.values(books).filter((book) => book && book.id);
  };

  const value = {
    books,
    dispatch,
    getBooks,
  };

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
}
