import { TasksProvider } from "../../../contexts/TasksProvider";
import { Table } from "./Table";

function TaskManager() {
  return (
    <div className="mx-auto flex justify-center max-w-2xl px-4 py-5 sm:px-6 sm:py- lg:max-w-7xl lg:px-8">
      <TasksProvider>
        <Table />
      </TasksProvider>
    </div>
  );
}

export default TaskManager;
