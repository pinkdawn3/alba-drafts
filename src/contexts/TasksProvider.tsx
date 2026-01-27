import useLocalStorageState from "use-local-storage-state";
import { useEffect, useReducer, type ReactNode } from "react";

import type { TaskProps, TaskType } from "../types/task";
import { TasksContext } from "./TasksContext";

interface TasksProviderProviderProps {
  children: ReactNode;
}

export type Action =
  | { type: "add"; task: TaskType }
  | { type: "remove"; id: string }
  | { type: "update"; task: TaskType };

function tasksReducer(state: TaskProps, action: Action): TaskProps {
  switch (action.type) {
    case "add":
      return {
        ...state,
        [action.task.id]: action.task,
      };

    case "remove": {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    case "update":
      return {
        ...state,
        [action.task.id]: action.task,
      };

    default:
      return state;
  }
}

export function TasksProvider({ children }: TasksProviderProviderProps) {
  const [storedTasks, setStoredTasks] = useLocalStorageState<TaskProps>(
    "tasks",
    { defaultValue: {} },
  );

  const [tasks, dispatch] = useReducer(tasksReducer, storedTasks);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  const value = {
    tasks,
    dispatch,
  };
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
