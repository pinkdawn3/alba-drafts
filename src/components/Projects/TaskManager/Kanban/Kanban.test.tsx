import type { ReactNode, ReactElement } from "react";
// components/Projects/TaskManager/Kanban.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";

import Kanban from "./Kanban";
import type { TaskType } from "../../../../types/task";
import { renderWithProviders } from "../../../../utils/test-utils";

// Mock drag and drop library

interface MockProvided {
  innerRef: ReturnType<typeof vi.fn>;
  droppableProps?: Record<string, unknown>;
  draggableProps?: Record<string, unknown>;
  dragHandleProps?: Record<string, unknown>;
  placeholder?: ReactNode;
}

vi.mock("@hello-pangea/dnd", () => ({
  DragDropContext: ({
    children,
    onDragEnd,
  }: {
    children: ReactNode;
    onDragEnd: (result: unknown) => void;
  }) => (
    <div data-testid="drag-drop-context" data-on-drag-end={onDragEnd}>
      {children}
    </div>
  ),
  Droppable: ({
    children,
    droppableId,
  }: {
    children: (provided: MockProvided) => ReactElement;
    droppableId: string;
  }) => {
    const provided: MockProvided = {
      innerRef: vi.fn(),
      droppableProps: {},
      placeholder: null,
    };
    return (
      <div data-testid={`droppable-${droppableId}`}>{children(provided)}</div>
    );
  },
  Draggable: ({
    children,
    draggableId,
  }: {
    children: (provided: MockProvided) => ReactElement;
    draggableId: string;
    index: number;
  }) => {
    const provided: MockProvided = {
      innerRef: vi.fn(),
      draggableProps: {},
      dragHandleProps: {},
    };
    return (
      <div data-testid={`draggable-${draggableId}`}>{children(provided)}</div>
    );
  },
}));

describe("Kanban", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders filter dropdown", () => {
    renderWithProviders(<Kanban />);

    // Should show priority filter by default
    expect(screen.getByText(/priority/i)).toBeInTheDocument();
  });

  it("renders columns for priority by default", () => {
    renderWithProviders(<Kanban />);

    expect(screen.getByText(/low/i)).toBeInTheDocument();
    expect(screen.getByText(/medium/i)).toBeInTheDocument();
    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });

  it("switches to status columns when filter changes", async () => {
    renderWithProviders(<Kanban />);

    // Change filter to status
    const filterDropdown = screen.getByText(/priority/i);
    fireEvent.click(filterDropdown);

    const statusButton = screen.getByText(/status/i);
    fireEvent.click(statusButton);
  });

  it("renders add task button in each column", () => {
    renderWithProviders(<Kanban />);

    const addButtons = screen.getAllByText(/add task/i);
    expect(addButtons).toHaveLength(3); // 3 priority columns
  });

  it("creates draft task in correct column when add button clicked", async () => {
    renderWithProviders(<Kanban />);

    const addButtons = screen.getAllByText(/add task/i);
    fireEvent.click(addButtons[0]); // Click first column (low)

    await waitFor(() => {
      // Should create a draft task with low priority
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      expect(taskInput).toBeInTheDocument();
      expect(taskInput).toHaveValue("");
    });
  });

  it("saves draft task when task name is filled and blurred", async () => {
    renderWithProviders(<Kanban />);

    // Add task in first column
    const addButtons = screen.getAllByText(/add task/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      fireEvent.change(taskInput, { target: { value: "New Kanban Task" } });
      fireEvent.blur(taskInput);
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("New Kanban Task")).toBeInTheDocument();
    });
  });

  it("saves draft task when pressing Enter", async () => {
    renderWithProviders(<Kanban />);

    const addButtons = screen.getAllByText("+ Add task");
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      fireEvent.change(taskInput, { target: { value: "Task via Enter" } });
      fireEvent.keyDown(taskInput, { key: "Enter" });
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Task via Enter")).toBeInTheDocument();
    });
  });

  it("does not save draft with empty task name", async () => {
    renderWithProviders(<Kanban />);

    const addButtons = screen.getAllByText(/add task/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      fireEvent.blur(taskInput); // Blur without entering text

      // Placeholder should disappear
      expect(taskInput).not.toBeInTheDocument();
    });
  });

  it("updates task assigned field", async () => {
    renderWithProviders(<Kanban />);

    // Add a task first
    const addButtons = screen.getAllByText(/add task/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      fireEvent.change(taskInput, { target: { value: "Test Task" } });
      fireEvent.blur(taskInput);
    });

    await waitFor(() => {
      const assignedInput = screen.getByPlaceholderText(/assign to/i);
      fireEvent.change(assignedInput, { target: { value: "Alba" } });
      expect(screen.getByDisplayValue("Alba")).toBeInTheDocument();
    });
  });

  it("updates task date", async () => {
    renderWithProviders(<Kanban />);

    // Add task
    const addButtons = screen.getAllByText(/add task/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      fireEvent.change(taskInput, { target: { value: "Date Task" } });
      fireEvent.blur(taskInput);
    });

    await waitFor(() => {
      const dateInput = screen.getByPlaceholderText(/input date/i);
      fireEvent.change(dateInput, { target: { value: "2025-12-31" } });
      expect(dateInput).toHaveValue("2025-12-31");
    });
  });

  it("deletes task when delete button clicked", async () => {
    renderWithProviders(<Kanban />);

    // Add task
    const addButtons = screen.getAllByText(/add task/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      fireEvent.change(taskInput, { target: { value: "Delete Me" } });
      fireEvent.blur(taskInput);
    });

    await waitFor(() => {
      const deleteButton = screen.getByLabelText(/delete task/i);
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.queryByDisplayValue("Delete Me")).not.toBeInTheDocument();
    });
  });

  it("renders tasks in correct columns based on priority", async () => {
    renderWithProviders(<Kanban />);

    // Pre-populate with tasks
    const mockTasks = [
      {
        id: "1",
        taskName: "Low Priority Task",
        assigned: "",
        priority: "low",
        status: "not-started",
        date: Date.now(),
        completed: false,
      },
      {
        id: "2",
        taskName: "High Priority Task",
        assigned: "",
        priority: "high",
        status: "not-started",
        date: Date.now(),
        completed: false,
      },
    ];

    localStorage.setItem("tasks", JSON.stringify(mockTasks));

    renderWithProviders(<Kanban />);

    expect(screen.getByDisplayValue("Low Priority Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("High Priority Task")).toBeInTheDocument();
  });

  it("persists tasks to localStorage", async () => {
    renderWithProviders(<Kanban />);

    const addButtons = screen.getAllByText(/add task/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      fireEvent.change(taskInput, { target: { value: "Persistent Task" } });
      fireEvent.blur(taskInput);
    });

    await waitFor(() => {
      const stored = localStorage.getItem("tasks");
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored as string) as Record<string, TaskType>;

      const tasksArray = Object.values(parsed).filter((t): t is TaskType =>
        Boolean(t && t.id),
      );

      const task = tasksArray.find((t) => t.taskName === "Persistent Task");

      expect(task).toBeDefined();
    });
  });

  it("renders responsive columns (stacked on mobile, side-by-side on desktop)", () => {
    renderWithProviders(<Kanban />);

    const columnContainer = document.querySelector(".flex-col.md\\:flex-row");
    expect(columnContainer).toBeInTheDocument();
  });

  it("limits column height with scrolling", () => {
    renderWithProviders(<Kanban />);

    const scrollableArea = document.querySelector(".overflow-y-auto.max-h-75");
    expect(scrollableArea).toBeInTheDocument();
  });

  it("creates draft with correct priority when adding to specific column", async () => {
    renderWithProviders(<Kanban />);

    // Click add button in high priority column (third button)
    const addButtons = screen.getAllByText(/add task/i);
    fireEvent.click(addButtons[2]); // High priority column

    await waitFor(() => {
      const taskInput = screen.getByPlaceholderText(/introduce task/i);
      fireEvent.change(taskInput, { target: { value: "High Priority Task" } });
      fireEvent.blur(taskInput);
    });

    // Task should appear in high priority column
    await waitFor(() => {
      const stored = localStorage.getItem("tasks");
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored as string) as Record<string, TaskType>;
      const tasksArray = Object.values(parsed).filter((t) => t && t.id);

      expect(tasksArray[0].priority).toBe("high");
    });
  });
});
