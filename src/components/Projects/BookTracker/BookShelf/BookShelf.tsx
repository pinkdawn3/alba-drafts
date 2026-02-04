import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";

import {
  faTrash,
  faGripVertical as faGrip,
} from "@fortawesome/free-solid-svg-icons";

import BookPage from "../BookPage/BookPage";

import "./BookShelf.css";

import { useBooks } from "../../../../hooks/useBooks";

import {
  BookStatuses,
  type BookStatus,
  type BookType,
} from "../../../../types/book";
import { useTranslate } from "../../../../hooks/useTranslations";

function BookShelf() {
  const { getBooks, dispatch } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const t = useTranslate();

  const handleDeleteBook = (bookId: string) => {
    dispatch({
      type: "remove",
      id: bookId,
    });
  };

  const handleUpdateBook = (bookId: string, changes: Partial<BookType>) => {
    dispatch({
      type: "update",
      id: bookId,
      changes,
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, draggableId } = result;

    // If dropped in same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Otherwise, update status
    dispatch({
      type: "update",
      id: draggableId,
      changes: {
        status: destination.droppableId as BookStatus,
      },
    });
  };

  const handleBookClick = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  const books = getBooks();
  console.log(books);

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl flex flex-col">
      <DragDropContext onDragEnd={onDragEnd}>
        {BookStatuses.map((bookStatus) => (
          <Droppable
            key={bookStatus}
            droppableId={bookStatus}
            direction="horizontal"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full md:flex-1 rounded-lg p-4 md:min-w-75 flex flex-col mb-6"
              >
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {t(bookStatus)}
                </h3>

                {/* Div that controls the shelf */}
                <div className="shelf-container ">
                  {books
                    .filter((book) => book.status == bookStatus)
                    .map((filteredBook, index) => (
                      <Draggable
                        key={filteredBook.id}
                        draggableId={filteredBook.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="shrink-0"
                            style={provided.draggableProps.style}
                          >
                            <article className="relative overflow-hidden bg-indigo-200 dark:bg-zinc-700 rounded-lg w-32 sm:w-48 mb-3">
                              <div className="relative flex flex-col justify-center items-center group">
                                <button
                                  type="button"
                                  aria-label="view book details"
                                  className="w-full"
                                  onClick={() =>
                                    handleBookClick(filteredBook.id)
                                  }
                                >
                                  <img
                                    className="w-full h-44 sm:h-64 object-cover group-hover:opacity-50 transition"
                                    alt={filteredBook.title}
                                    src={filteredBook.img}
                                  />
                                </button>

                                {/* Drag handle */}
                                <div
                                  {...provided.dragHandleProps}
                                  className="absolute top-3 left-1 p-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition bg-black/20 rounded-lg border border-dashed border-white"
                                  aria-label="drag handle"
                                >
                                  <FontAwesomeIcon
                                    icon={faGrip}
                                    color="white"
                                  />
                                </div>

                                <button
                                  type="button"
                                  aria-label="delete book"
                                  className="absolute top-3 right-1 p-1 bg-black/20 hover:bg-black/30 active:bg-black/40 border border-dashed border-white rounded-lg opacity-0 group-hover:opacity-100 transition z-10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteBook(filteredBook.id);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    color="white"
                                  />
                                </button>
                              </div>

                              <button
                                type="button"
                                aria-label="view book details"
                                className="w-full text-left"
                                onClick={() => handleBookClick(filteredBook.id)}
                              >
                                <div className="p-2 sm:p-4">
                                  <h3
                                    className="font-bold text-xs sm:text-sm line-clamp-2 mb-2 h-8 sm:h-10 text-font"
                                    title={filteredBook.title}
                                  >
                                    {filteredBook.title}
                                  </h3>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 h-4 sm:h-5">
                                    {filteredBook.authors?.join(", ")}
                                  </p>
                                </div>
                              </button>
                            </article>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      {isModalOpen && selectedBookId && (
        <BookPage
          bookId={selectedBookId}
          onClose={handleCloseModal}
          onUpdate={handleUpdateBook}
        />
      )}
    </div>
  );
}

export default BookShelf;
