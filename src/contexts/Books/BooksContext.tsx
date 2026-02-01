import { createContext } from "react";
import type { Action } from "./BooksProvider";
import type { BookProps, BookType } from "../../types/book";

export type BooksContextType = {
  books: BookProps;
  dispatch: React.Dispatch<Action>;
  getBooks: () => BookType[];
};

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined,
);
