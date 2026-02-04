import { useContext } from "react";
<<<<<<< HEAD
import { TasksContext } from "../contexts/TasksContext";
=======
import { TasksContext } from "../contexts/Tasks/TasksContext";
>>>>>>> book-tracker

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within TasksProvider");
  }
  return context;
}
