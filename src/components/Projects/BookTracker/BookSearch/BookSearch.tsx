import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { GoogleBook } from "../../../../types/book";
import SearchBar from "../../../../utils/SearchBar";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// Function to fetch books
const searchBooks = async (query: string) => {
  if (!query) return { items: [] };

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
};

function BookSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  // Query hook
  const { data, isLoading, error } = useQuery({
    queryKey: ["books", searchTerm], // Cache key
    queryFn: () => searchBooks(searchTerm), // Fetch function
    enabled: searchTerm.length > 2, // Only search if 3+ characters
  });

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search books..."
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div>
        {data?.items?.map((book: GoogleBook) => (
          <div key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
