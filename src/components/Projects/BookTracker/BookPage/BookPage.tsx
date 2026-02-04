import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookStatuses, type BookType } from "../../../../types/book";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useBooks } from "../../../../hooks/useBooks";
import { Dropdown } from "../../../../utils/Dropdown";

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
          className="text-xl sm:text-2xl hover:scale-110 transition"
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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-3/4 lg:w-3/4 xl:w-2/3 2xl:w-1/2 max-h-[95vh] overflow-y-auto py-4 sm:py-5 px-4 sm:px-10 flex flex-col bg-background rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4 sm:space-y-5">
          <div>
            <h1 className="font-semibold text-lg sm:text-xl">{book.title}</h1>
            <p className="text-sm sm:text-base text-gray-400">{book.authors}</p>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-5 space-y-4 sm:space-y-0">
            <img
              src={book.img}
              alt={book.title}
              className="rounded-3xl w-48 md:w-64 mx-auto sm:mx-0 object-cover shrink-0"
            />

            <div className="w-full flex-1 text-font space-y-3 sm:space-y-4 sm: px-10">
              <Dropdown
                value={book.status}
                options={BookStatuses}
                onChange={(newStatus) =>
                  onUpdate(book.id, { status: newStatus })
                }
              />

              <p className="text-justify text-sm sm:text-base">
                {book.description}
              </p>

              <StarRating
                rating={book.rating}
                bookId={book.id}
                onUpdate={onUpdate}
              />

              <textarea
                placeholder="Write a review..."
                value={book.review}
                rows={4}
                className="border border-white rounded-lg p-2 w-full text-sm sm:text-base bg-transparent"
                onChange={(e) => onUpdate(bookId, { review: e.target.value })}
              />
            </div>
          </div>

          <button
            type="button"
            title="Close Button"
            onClick={onClose}
            className="w-full sm:w-auto py-2 px-4 text-white font-bold bg-primary hover:bg-primaryHover rounded-lg transition"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
