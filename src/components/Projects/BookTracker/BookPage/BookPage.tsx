import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookStatuses, type BookType } from "../../../../types/book";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useBooks } from "../../../../hooks/useBooks";
import { Dropdown } from "../../../../utils/Dropdown";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";

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
        className="w-full sm:w-[90%] md:w-[85%] lg:w-3/4 xl:w-2/3 2xl:w-1/2 max-h-[95vh] overflow-y-auto py-4 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col bg-background rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4 sm:space-y-5">
          {/* Title Section */}
          <div>
            <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">
              {book.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {book.authors}
            </p>
          </div>

          {/* Content Section */}
          <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8 space-y-4 md:space-y-0">
            {/* Book Image */}
            <img
              src={book.img}
              alt={book.title}
              className="rounded-2xl w-40 sm:w-48 md:w-56 lg:w-64 mx-auto md:mx-0 object-cover shrink-0"
            />

            {/* Book Details */}
            <div className="w-full flex-1 text-font space-y-3 sm:space-y-4">
              <Dropdown
                value={book.status}
                options={BookStatuses}
                onChange={(newStatus) =>
                  onUpdate(book.id, { status: newStatus })
                }
              />

              <p className="text-justify text-sm sm:text-base leading-relaxed">
                {book.description}
              </p>

              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Trans>Rating</Trans>:
                </p>
                <StarRating
                  rating={book.rating}
                  bookId={book.id}
                  onUpdate={onUpdate}
                />
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Trans>Review</Trans>:
                </p>
                <textarea
                  placeholder={i18n._("Write a review...")}
                  value={book.review}
                  rows={4}
                  className="border border-gray-600 rounded-lg p-2 sm:p-3 w-full text-sm sm:text-base bg-transparent focus:outline-none focus:border-primary transition resize-none"
                  onChange={(e) => onUpdate(bookId, { review: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            title="Close Button"
            onClick={onClose}
            className="w-full sm:w-auto py-2 sm:py-2.5 px-6 text-sm sm:text-base text-white font-bold bg-primary hover:bg-primaryHover rounded-lg transition mt-2"
          >
            {" "}
            <Trans>Close</Trans>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
