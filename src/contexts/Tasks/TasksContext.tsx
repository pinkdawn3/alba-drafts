import { createContext } from "react";
import type { TaskType, TaskProps } from "../../types/task";
import type { Action } from "./TasksProvider";

export type TaskContextType = {
  draftTask: TaskType | null;
  setDraftTask: (
    value: TaskType | null | ((prev: TaskType | null) => TaskType | null),
  ) => void;
  tasks: TaskProps;
  dispatch: React.Dispatch<Action>;
  getTasks: () => TaskType[];
};

export const TasksContext = createContext<TaskContextType | undefined>(
  undefined,
);
