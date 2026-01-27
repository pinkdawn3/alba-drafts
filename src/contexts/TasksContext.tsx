import { createContext } from "react";
import type { TaskProps } from "../types/task";
import type { Action } from "./TasksProvider";

export type TaskContextType = {
  tasks: TaskProps;
  dispatch: React.Dispatch<Action>;
};

export const TasksContext = createContext<TaskContextType | undefined>(
  undefined,
);
