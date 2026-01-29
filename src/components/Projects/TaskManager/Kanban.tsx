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
}

function KanbanCard({ task }: KanbanCardProps) {
  return (
    <section>
      <Card href="#" className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {task.taskName}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          This is a test card for Kanban
        </p>
      </Card>
    </section>
  );
}

interface KanbanColumnProps {
  filters: Priority[] | Status[] | undefined;
  data: TaskType[];
  filterBy: keyof TaskType; // 'status' or 'priority'
}

function KanbanColumn({ filters, data, filterBy }: KanbanColumnProps) {
  return (
    <section className="flex gap-4">
      {filters &&
        filters.map((filter) => (
          <Droppable key={filter} droppableId={filter}>
            {/* Add Droppable */}
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 bg-zinc-800 rounded-lg p-4 min-w-[300px]"
              >
                {/* TTitle of column */}
                <h3 className="font-semibold mb-4 capitalize">{filter}</h3>

                {/* Column */}
                <div className="space-y-2">
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
                            <KanbanCard task={filteredTask} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
    </section>
  );
}

function Kanban() {
  const [filter, setFilter] = useState<keyof TaskType>("priority");
  const [filters, setFilters] = useState<Priority[] | Status[]>(priorities);
  const { getTasks, dispatch } = useTasks();

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

  return (
    <section>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Dropdown
            value={filter}
            options={kanbanFilters}
            onChange={(newFilter: keyof TaskType) => getFilters(newFilter)}
          />
        </div>

        <KanbanColumn filters={filters} data={getTasks()} filterBy={filter} />
      </DragDropContext>
    </section>
  );
}

export default Kanban;
