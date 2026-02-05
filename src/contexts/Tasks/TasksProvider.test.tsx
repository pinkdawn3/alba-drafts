// TasksProvider.test.tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { TasksProvider } from "./TasksProvider";
import type { TaskType } from "../../types/task";
import { useTasks } from "../../hooks/useTasks";

// Mock useLocalStorageState
vi.mock("use-local-storage-state", () => ({
  default: <T,>(_key: string, options: { defaultValue: T }) => {
    let value = options.defaultValue;
    const setValue = (newValue: T | ((prev: T) => T)) => {
      value =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(value)
          : newValue;
    };
    return [value, setValue] as const;
  },
}));

// Mock crypto.randomUUID
Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => "test-uuid-123",
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TasksProvider>{children}</TasksProvider>
);

describe("TasksProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides initial empty state", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    expect(result.current.tasks).toEqual({});
    expect(result.current.draftTask).toBeNull();
    expect(result.current.getTasks()).toEqual([]);
  });

  it("adds a task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    const newTask: TaskType = {
      id: "1",
      taskName: "Test Task",
      assigned: "Alice",
      priority: "high",
      status: "in-progress",
      date: Date.now(),
      completed: false,
    };

    act(() => {
      result.current.dispatch({ type: "add", task: newTask });
    });

    expect(result.current.tasks["1"]).toEqual(newTask);
    expect(result.current.getTasks()).toHaveLength(1);
    expect(result.current.getTasks()[0].taskName).toBe("Test Task");
  });

  it("removes a task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    const task: TaskType = {
      id: "1",
      taskName: "Task to Remove",
      assigned: "",
      priority: "low",
      status: "not-started",
      date: Date.now(),
      completed: false,
    };

    act(() => {
      result.current.dispatch({ type: "add", task });
    });

    expect(result.current.getTasks()).toHaveLength(1);

    act(() => {
      result.current.dispatch({ type: "remove", id: "1" });
    });

    expect(result.current.tasks["1"]).toBeUndefined();
    expect(result.current.getTasks()).toHaveLength(0);
  });

  it("updates a task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    const task: TaskType = {
      id: "1",
      taskName: "Original Task",
      assigned: "Bob",
      priority: "low",
      status: "not-started",
      date: Date.now(),
      completed: false,
    };

    act(() => {
      result.current.dispatch({ type: "add", task });
    });

    act(() => {
      result.current.dispatch({
        type: "update",
        id: "1",
        changes: { taskName: "Updated Task", priority: "high" },
      });
    });

    expect(result.current.tasks["1"].taskName).toBe("Updated Task");
    expect(result.current.tasks["1"].priority).toBe("high");
    expect(result.current.tasks["1"].assigned).toBe("Bob"); // unchanged
  });

  it("does not update non-existent task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    const initialState = result.current.tasks;

    act(() => {
      result.current.dispatch({
        type: "update",
        id: "non-existent",
        changes: { taskName: "Should not update" },
      });
    });

    expect(result.current.tasks).toEqual(initialState);
  });

  it("sets and clears draft task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    const draftTask: TaskType = {
      id: "draft-1",
      taskName: "",
      assigned: "",
      priority: "low",
      status: "not-started",
      date: Date.now(),
      completed: false,
    };

    act(() => {
      result.current.setDraftTask(draftTask);
    });

    expect(result.current.draftTask).toEqual(draftTask);

    act(() => {
      result.current.setDraftTask(null);
    });

    expect(result.current.draftTask).toBeNull();
  });

  it("getTasks returns only valid tasks", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    const task1: TaskType = {
      id: "1",
      taskName: "Task 1",
      assigned: "",
      priority: "low",
      status: "not-started",
      date: Date.now(),
      completed: false,
    };

    const task2: TaskType = {
      id: "2",
      taskName: "Task 2",
      assigned: "",
      priority: "high",
      status: "completed",
      date: Date.now(),
      completed: true,
    };

    act(() => {
      result.current.dispatch({ type: "add", task: task1 });
      result.current.dispatch({ type: "add", task: task2 });
    });

    const tasks = result.current.getTasks();
    expect(tasks).toHaveLength(2);
    expect(tasks.every((t) => t && t.id)).toBe(true);
  });

  it("handles multiple updates to the same task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    const task: TaskType = {
      id: "1",
      taskName: "Task",
      assigned: "",
      priority: "low",
      status: "not-started",
      date: Date.now(),
      completed: false,
    };

    act(() => {
      result.current.dispatch({ type: "add", task });
    });

    act(() => {
      result.current.dispatch({
        type: "update",
        id: "1",
        changes: { status: "in-progress" },
      });
    });

    act(() => {
      result.current.dispatch({
        type: "update",
        id: "1",
        changes: { completed: true, status: "completed" },
      });
    });

    expect(result.current.tasks["1"].status).toBe("completed");
    expect(result.current.tasks["1"].completed).toBe(true);
  });
});
