export type Priority = "low" | "medium" | "high";
export type Status = "not-started" | "in-progress" | "completed";

export const priorities: Priority[] = ["low", "medium", "high"];
export const statuses: Status[] = ["not-started", "in-progress", "completed"];
export const kanbanFilters: (keyof TaskType)[] = ["priority", "status"];

export type TaskType = {
  id: string;
  taskName: string;
  assigned: string;
  priority: Priority;
  status: Status;
  date: number;
  completed: boolean;
};

export interface TaskProps {
  [taskId: string]: TaskType;
}
