import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBooks } from "../../../../hooks/useBooks";
import { BookStatuses, type BookStatus } from "../../../../types/book";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";

function BookShelf() {
  const { getBooks, dispatch } = useBooks();

  const normalizeString = (string: string) => {
    return string.replace("-", " ");
  };

  const handleDeleteBook = (bookId: string) => {
    dispatch({
      type: "remove",
      id: bookId,
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

    // Update task status/priority based on destination

    dispatch({
      type: "update",
      id: draggableId,
      changes: {
        status: destination.droppableId as BookStatus,
      },
    });
  };

  const books = getBooks();
  console.log(books);

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl flex flex-col">
      <DragDropContext onDragEnd={onDragEnd}>
        {BookStatuses.map((bookStatus) => (
          <Droppable key={bookStatus} droppableId={bookStatus}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full md:flex-1 rounded-lg p-4 md:min-w-75 flex flex-col mb-6"
              >
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {normalizeString(bookStatus)}
                </h3>
                <div className="shrink-0 border-b-4 border-amber-900 relative before:content-[''] before:absolute before:-bottom-5 before:left-0 before:right-0 before:h-3 before:bg-black/70 before:blur-lg before:-z-10 min-h-60 sm:min-h-80 flex flex-wrap gap-3 pb-3">
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
                            {...provided.dragHandleProps}
                          >
                            <article className="relative overflow-hidden bg-zinc-700 rounded-lg w-32 sm:w-48 mb-3">
                              <div className="relative flex flex-col justify-center items-center group">
                                <img
                                  className="w-full h-44 sm:h-64 object-cover group-hover:opacity-50 transition"
                                  alt={filteredBook.title}
                                  src={filteredBook.img}
                                />
                                <button
                                  type="button"
                                  aria-label="delete book"
                                  className="absolute top-3 right-1 -translate-x-1 -translate-y-1 p-1.5 bg-black/20 hover:bg-black/30 active:bg-black/40  border border-dashed border-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                                  onClick={() =>
                                    handleDeleteBook(filteredBook.id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                              <div className="p-2 sm:p-4">
                                <h3
                                  className="font-bold text-xs sm:text-sm line-clamp-2 mb-2"
                                  title={filteredBook.title}
                                >
                                  {filteredBook.title}
                                </h3>
                                <p className="text-xs text-gray-400 line-clamp-1">
                                  {filteredBook.authors?.join(", ")}
                                </p>
                              </div>
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
    </div>
  );
}

export default BookShelf;
