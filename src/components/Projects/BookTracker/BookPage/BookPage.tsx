import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { BookType } from "../../../../types/book";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useBooks } from "../../../../hooks/useBooks";

interface StarRatingProps {
  bookId: string;
  rating: number;
  onUpdate: (bookId: string, changes: Partial<BookType>) => void;
}
function StarRating({ bookId, rating, onUpdate }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onUpdate(bookId, { rating: star })}
          className="text-2xl hover:scale-110 transition"
          aria-label={`Rate ${star} stars`}
        >
          <FontAwesomeIcon
            icon={star <= rating ? faStar : faStarEmpty}
            className={star <= rating ? "text-yellow-400" : "text-gray-400"}
          />
        </button>
      ))}
    </div>
  );
}
interface BookPageProps {
  bookId: string;
  onUpdate: (bookId: string, changes: Partial<BookType>) => void;
  onClose: () => void;
}

function BookPage({ bookId, onUpdate, onClose }: BookPageProps) {
  const { getBooks } = useBooks();
  const book = getBooks().find((b) => b.id === bookId);

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="sm:w-1/2 p-10 flex flex-col justify-content bg-background rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          title="Close Button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-zinc-700 rounded-lg transition"
        >
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
        </button>

        <div className="py-5">
          <h1>{book.title}</h1>
          <p>{book.authors}</p>
        </div>
        <div className="flex flex-row">
          <img
            src={book.img}
            alt="profile picture"
            className="rounded-3xl h-full"
          />

          <div className="sm:w-1/2 p-5 text-font space-y-4">
            <p className="text-justify">{book.description}</p>
            <StarRating
              rating={book.rating}
              bookId={book.id}
              onUpdate={onUpdate}
            />

            <textarea
              placeholder="Write a review..."
              value={book.review}
              rows={4}
              className="border border-white rounded-lg p-2 w-full"
              onChange={(e) => onUpdate(bookId, { review: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
