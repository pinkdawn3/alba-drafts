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
  | {
      type: "update";
      id: string;
      changes: Partial<TaskType>;
    };

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

    case "update": {
      const task = state[action.id];
      if (!task) return state;

      return {
        ...state,
        [action.id]: {
          ...task,
          ...action.changes,
        },
      };
    }
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

  const getTasks = () => {
    return Object.values(tasks).filter((t) => t && t.id);
  };

  const value = {
    tasks,
    dispatch,
    getTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
