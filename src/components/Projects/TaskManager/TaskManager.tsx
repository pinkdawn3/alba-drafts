import { useState } from "react";

import Kanban from "./Kanban/Kanban";
import Table from "./Table/Table";

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
      <div className="mx-auto justify-center max-w-4xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8 space-y-5">
        <div className="space-x-3">
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
        </div>

        {toggleView(view)}
      </div>
    </div>
  );
}

export default TaskManager;
