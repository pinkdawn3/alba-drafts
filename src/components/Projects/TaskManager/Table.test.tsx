// components/Projects/TaskManager/Table.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";

import { Table } from "./Table";
import { renderWithProviders } from "../../../utils/test-utils";
import type { TaskType } from "../../../types/task";

interface DatepickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

// Mock Flowbite Datepicker
vi.mock("flowbite-react", () => ({
  Datepicker: ({ value, onChange }: DatepickerProps) => (
    <input
      aria-label="datepicker"
      data-testid="datepicker"
      type="date"
      value={value?.toISOString().split("T")[0]}
      onChange={(e) => onChange?.(new Date(e.target.value))}
    />
  ),
}));

describe("Table", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders add task button", () => {
    renderWithProviders(<Table />);

    expect(screen.getByLabelText("add task")).toBeInTheDocument();
  });

  it("creates draft task when add button is clicked", () => {
    renderWithProviders(<Table />);

    const addButton = screen.getByLabelText("add task");
    fireEvent.click(addButton);

    // Two elements render, the PC and the mobile one, pick one
    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    expect(taskInput).toBeInTheDocument();
    expect(taskInput).toHaveValue("");
  });

  it("adds task when draft task name is filled and blurred", async () => {
    renderWithProviders(<Table />);

    // Create draft
    const addButton = screen.getByLabelText("add task");
    fireEvent.click(addButton);

    // Fill task name
    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.change(taskInput, { target: { value: "New Task" } });

    // Blur to save
    fireEvent.blur(taskInput);

    await waitFor(() => {
      expect(screen.getAllByDisplayValue("New Task")[0]).toBeInTheDocument();
    });
  });

  it("adds task when pressing Enter on draft task", async () => {
    renderWithProviders(<Table />);

    const addButton = screen.getByLabelText("add task");
    fireEvent.click(addButton);

    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.change(taskInput, { target: { value: "Task via Enter" } });
    fireEvent.keyDown(taskInput, { key: "Enter" });

    await waitFor(() => {
      expect(
        screen.getAllByDisplayValue("Task via Enter")[0],
      ).toBeInTheDocument();
    });
  });

  it("does not add task with empty name", () => {
    renderWithProviders(<Table />);

    const addButton = screen.getByLabelText("add task");
    fireEvent.click(addButton);

    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.blur(taskInput); // Blur without entering text

    // Should still show empty state or draft
    expect(
      screen.getAllByPlaceholderText("Introduce task...")[0],
    ).toBeInTheDocument();
  });

  it("updates task name when changed", async () => {
    renderWithProviders(<Table />);

    // Add a task first
    const addButton = screen.getByLabelText("add task");
    fireEvent.click(addButton);

    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.change(taskInput, { target: { value: "Original Task" } });
    fireEvent.blur(taskInput);

    await waitFor(() => {
      const savedInput = screen.getAllByDisplayValue("Original Task")[0];
      expect(savedInput).toBeInTheDocument();

      // Update the task
      fireEvent.change(savedInput, { target: { value: "Updated Task" } });
      expect(
        screen.getAllByDisplayValue("Updated Task")[0],
      ).toBeInTheDocument();
    });
  });

  it("updates assigned person", async () => {
    renderWithProviders(<Table />);

    // Add task
    fireEvent.click(screen.getByLabelText("add task"));
    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.change(taskInput, { target: { value: "Test Task" } });
    fireEvent.blur(taskInput);

    await waitFor(() => {
      const assignedInput = screen.getAllByPlaceholderText("Add person...")[0];
      fireEvent.change(assignedInput, { target: { value: "Alba" } });
      expect(screen.getAllByDisplayValue("Alba")[0]).toBeInTheDocument();
    });
  });

  it("toggles task completion", async () => {
    renderWithProviders(<Table />);

    // Add task
    fireEvent.click(screen.getByLabelText("add task"));
    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.change(taskInput, { target: { value: "Complete me" } });
    fireEvent.blur(taskInput);

    await waitFor(() => {
      const checkbox = screen.getByLabelText("Checkbox for completed task");
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  it("deletes task when delete button is clicked", async () => {
    renderWithProviders(<Table />);

    // Add task
    fireEvent.click(screen.getByLabelText(/add task/i));
    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.change(taskInput, { target: { value: "Delete me" } });
    fireEvent.blur(taskInput);

    await waitFor(() => {
      expect(screen.getAllByDisplayValue(/delete/i)[0]).toBeInTheDocument();
    });

    // Delete task
    const deleteButton = screen.getAllByLabelText("delete task")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByDisplayValue("Delete me")).not.toBeInTheDocument();
      expect(screen.getByText("No tasks available.")).toBeInTheDocument();
    });
  });

  it("renders table headers correctly", () => {
    renderWithProviders(<Table />);

    expect(screen.getByText("Task")).toBeInTheDocument();
    expect(screen.getByText("Assigned to")).toBeInTheDocument();
    expect(screen.getByText("Priority")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Date Due")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("shows table on desktop and cards on mobile", () => {
    renderWithProviders(<Table />);

    const table = document.querySelector(".sm\\:block");
    const cards = document.querySelector(".sm\\:hidden");

    expect(table).toBeInTheDocument();
    expect(cards).toBeInTheDocument();
  });

  it("persists tasks to localStorage", async () => {
    renderWithProviders(<Table />);

    // Add task
    fireEvent.click(screen.getByLabelText("add task"));
    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.change(taskInput, { target: { value: "Persistent Task" } });
    fireEvent.blur(taskInput);

    await waitFor(() => {
      const stored = localStorage.getItem("tasks");
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored as string) as Record<string, TaskType>;
      const tasks = Object.values(parsed).filter((t) => t && t.id);

      expect(tasks.length).toBeGreaterThan(0);
      expect(tasks[0].taskName).toBe("Persistent Task");
    });
  });

  it("loads tasks from localStorage on mount", () => {
    // Pre-populate localStorage
    const mockTasks = [
      {
        id: "1",
        taskName: "Existing Task",
        assigned: "Alba",
        priority: "high",
        status: "in-progress",
        date: Date.now(),
        completed: false,
      },
    ];

    localStorage.setItem("tasks", JSON.stringify(mockTasks));

    renderWithProviders(<Table />);

    expect(screen.getAllByDisplayValue("Existing Task")[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("Alba")[0]).toBeInTheDocument();
  });

  it("does not show delete button for draft task", () => {
    renderWithProviders(<Table />);

    fireEvent.click(screen.getByLabelText("add task"));

    // Draft task should not have delete button yet
    expect(screen.queryByLabelText("delete task")).not.toBeInTheDocument();
  });

  it("updates task date", async () => {
    renderWithProviders(<Table />);

    // Add task
    fireEvent.click(screen.getByLabelText("add task"));
    const taskInput = screen.getAllByPlaceholderText("Introduce task...")[0];
    fireEvent.change(taskInput, { target: { value: "Date Task" } });
    fireEvent.blur(taskInput);

    await waitFor(() => {
      const datepicker = screen.getByTestId("datepicker");
      fireEvent.change(datepicker, { target: { value: "2025-12-31" } });

      expect(datepicker).toHaveValue("2025-12-31");
    });
  });
});
