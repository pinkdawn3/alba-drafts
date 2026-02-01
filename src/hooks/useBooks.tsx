import { useContext } from "react";
import { BooksContext } from "../contexts/Books/BooksContext";

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within BooksProvider");
  }
  return context;
}
