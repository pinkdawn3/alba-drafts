import { createContext } from "react";
import type { TaskProps, TaskType } from "../types/task";
import type { Action } from "./TasksProvider";

export type TaskContextType = {
  tasks: TaskProps;
  dispatch: React.Dispatch<Action>;
  getTasks: () => TaskType[];
};

export const TasksContext = createContext<TaskContextType | undefined>(
  undefined,
);
