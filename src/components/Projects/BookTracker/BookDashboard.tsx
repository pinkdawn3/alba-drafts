import { useState } from "react";
import BookSearch from "./BookSearch/BookSearch";
import BookShelf from "./BookShelf/BookShelf";

function BookDashboard() {
  const [tab, setTab] = useState("search");

  const toggleTab = (chosenTab: string) => {
    switch (chosenTab) {
      case "search":
        return <BookSearch />;
      case "shelf":
        return <BookShelf />;
      default:
        return <BookSearch />;
    }
  };

  const getTabClassName = (tabName: string) => {
    return `inline-block p-4 border-b rounded-t-base ${
      tab === tabName
        ? "text-primary border-primary"
        : "border-transparent hover:text-primary hover:border-primary"
    }`;
  };

  return (
    <section>
      <div className="text-sm font-medium text-center text-body border-b border-default">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              type="button"
              aria-label="book gallery"
              onClick={() => setTab("search")}
              className={getTabClassName("search")}
            >
              Books
            </button>
          </li>
          <li className="me-2">
            <button
              type="button"
              aria-label="user shelf"
              onClick={() => setTab("shelf")}
              className={getTabClassName("shelf")}
            >
              Shelf
            </button>
          </li>
        </ul>
      </div>
      <div className="py-10">{toggleTab(tab)}</div>
    </section>
  );
}

export default BookDashboard;
