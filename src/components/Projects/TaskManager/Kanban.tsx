import { useState } from "react";

import { Card } from "flowbite-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

import { useTasks } from "../../../hooks/useTasks";
import { Dropdown } from "../../../utils/Dropdown";

import {
  kanbanFilters,
  priorities,
  statuses,
  type Priority,
  type Status,
  type TaskType,
} from "../../../types/task";

interface KanbanCardProps {
  task: TaskType;
  onUpdate: (taskId: string, changes: Partial<TaskType>) => void;
  onSave: (task: TaskType) => void;
  isDraft?: boolean;
}

function KanbanCard({ task, onUpdate, onSave, isDraft }: KanbanCardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    onUpdate(task.id, { [e.target.name]: value });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLElement>, task: TaskType) => {
    if (e.key == "Enter" && task.taskName.trim() !== "") {
      onSave(task);
      e.currentTarget.blur();
    }
  };

  const handleBlur = () => {
    if (isDraft) {
      onSave(task);
    }
  };

  return (
    <Card className="max-w-sm">
      <input
        className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white bg-transparent border-none outline-none w-full"
        placeholder="Introduce task..."
        type="text"
        value={task.taskName}
        name="taskName"
        onChange={handleChange}
        onKeyDown={(e) => handleEnter(e, task)}
        onBlur={handleBlur}
        autoFocus={isDraft}
      />
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Assigned: {task.assigned || "Unassigned"}
      </p>
      <div className="flex gap-2">
        <span className="text-xs px-2 py-1 bg-zinc-700 rounded capitalize">
          {task.priority}
        </span>
        <span className="text-xs px-2 py-1 bg-zinc-700 rounded capitalize">
          {task.status}
        </span>
      </div>
    </Card>
  );
}

interface KanbanColumnProps {
  filters: Priority[] | Status[] | undefined;
  data: TaskType[];
  filterBy: keyof TaskType;
  onUpdate: (taskId: string, changes: Partial<TaskType>) => void;
  onSave: (task: TaskType) => void;
  onAddTask: (filterValue: string) => void;
  draftTaskId?: string;
}

function KanbanColumn({
  filters,
  data,
  filterBy,
  onUpdate,
  onSave,
  onAddTask,
  draftTaskId,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {filters &&
        filters.map((filter) => (
          <Droppable key={filter} droppableId={filter}>
            {/* Add Droppable */}
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full md:flex-1 bg-zinc-800 rounded-lg p-4 md:min-w-75 flex flex-col"
              >
                {/* Title of column */}
                <h3 className="font-semibold mb-4 capitalize">{filter}</h3>

                {/* Column */}
                <div className="space-y-2 overflow-y-auto max-h-75 md:max-h-150">
                  {data
                    .filter((task) => task[filterBy] === filter)
                    .map((filteredTask, index) => (
                      <Draggable
                        key={filteredTask.id}
                        draggableId={filteredTask.id}
                        index={index}
                      >
                        {/* Dragabble */}
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {/* Card */}
                            <KanbanCard
                              task={filteredTask}
                              onUpdate={onUpdate}
                              onSave={onSave}
                              isDraft={filteredTask.id === draftTaskId}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
                <button
                  onClick={() => onAddTask(filter)} // Pass which column
                  className="w-full mt-2 p-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700 rounded border border-dashed border-zinc-600"
                >
                  + Add task
                </button>
              </div>
            )}
          </Droppable>
        ))}
    </div>
  );
}

function Kanban() {
  const [filter, setFilter] = useState<keyof TaskType>("priority");
  const [filters, setFilters] = useState<Priority[] | Status[]>(priorities);
  const { draftTask, setDraftTask, getTasks, dispatch } = useTasks();

  const getFilters = (filterBy: keyof TaskType) => {
    setFilter(filterBy);

    switch (filterBy) {
      case "priority":
        setFilters(priorities);
        break;

      case "status":
        setFilters(statuses);
        break;

      default:
        setFilters(priorities);
        break;
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, draggableId } = result;

    // If dropped in same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Update task status/priority based on destination

    dispatch({
      type: "update",
      id: draggableId,
      changes: {
        [filter]: destination.droppableId,
      },
    });
  };

  const handleUpdateTask = (taskId: string, changes: Partial<TaskType>) => {
    // Check if it's the draft task
    if (draftTask && taskId === draftTask.id) {
      setDraftTask((prev) => (prev ? { ...prev, ...changes } : null));
    } else {
      dispatch({
        type: "update",
        id: taskId,
        changes,
      });
    }
  };

  const handleSaveDraft = (task: TaskType) => {
    if (task.taskName.trim() !== "") {
      dispatch({
        type: "add",
        task,
      });
      setDraftTask(null);
    }
  };

  const handleAddTaskInColumn = (columnValue: string) => {
    setDraftTask({
      id: crypto.randomUUID(),
      taskName: "",
      assigned: "",
      priority: filter === "priority" ? (columnValue as Priority) : "low",
      status: filter === "status" ? (columnValue as Status) : "not-started",
      date: Date.now(),
      completed: false,
    });
  };

  const allTasks = draftTask ? [draftTask, ...getTasks()] : getTasks();

  return (
    <section className="space-y-5">
      <Dropdown
        value={filter}
        options={kanbanFilters}
        onChange={(newFilter: keyof TaskType) => getFilters(newFilter)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <KanbanColumn
          filters={filters}
          data={allTasks}
          filterBy={filter}
          onUpdate={handleUpdateTask}
          onSave={handleSaveDraft}
          onAddTask={handleAddTaskInColumn}
          draftTaskId={draftTask?.id}
        />
      </DragDropContext>
    </section>
  );
}

export default Kanban;
