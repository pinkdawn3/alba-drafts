import Kanban from "./Kanban";
import { Table } from "./Table";
import { useState } from "react";

function TaskManager() {
  const [view, setView] = useState("");

  const toggleView = (chosenView: string) => {
    switch (chosenView) {
      case "table":
        return <Table />;

      case "kanban":
        return <Kanban />;

      default:
        return <Table />;
    }
  };

  return (
    <div className="flex flex-row ">
      <div className="mx-auto justify-center max-w-2xl px-4 py-5 sm:px-6 sm:py- lg:max-w-7xl lg:px-8 space-y-5">
        <button
          type="button"
          aria-label="table view"
          className="button"
          onClick={() => setView("table")}
        >
          Table
        </button>

        <button
          type="button"
          aria-label="kanban view"
          className="button"
          onClick={() => setView("kanban")}
        >
          Kanban
        </button>

        {toggleView(view)}
      </div>
    </div>
  );
}

export default TaskManager;
