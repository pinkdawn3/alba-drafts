import { useBooks } from "../../../../hooks/useBooks";
import type { BookType } from "../../../../types/book";

function BookShelf() {
  const { getBooks, dispatch } = useBooks();

  const handleUpdateBook = (bookId: string, changes: Partial<BookType>) => {
    dispatch({
      type: "update",
      id: bookId,
      changes,
    });
  };

  const books = getBooks();
  console.log(books);

  return (
    <div className="p-1 flex flex-wrap items-center justify-center">
      {books.map((book: BookType) => (
        <div
          key={book.id}
          className="shrink-0 m-3 border-b-4 border-amber-900 relative before:content-[''] before:absolute before:bottom-0 before:left-[5%] before:right-[5%] before:h-3 before:bg-black/70 before:blur-lg before:-z-10"
        >
          <article className="relative overflow-hidden bg-zinc-700 rounded-lg w-48 mb-3">
            <div className="relative flex flex-col justify-center items-center group">
              <img
                className="w-full h-64 object-cover bg-black group-hover:opacity-50 transition"
                alt={book.title}
                src={book.img}
              />
            </div>
            <div className="p-4">
              <h3
                className="font-bold text-sm line-clamp-2 mb-2"
                title={book.title}
              >
                {book.title}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-1">
                {book.authors?.join(", ")}
              </p>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

export default BookShelf;
