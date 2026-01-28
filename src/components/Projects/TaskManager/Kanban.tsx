import { Card } from "flowbite-react";
import {
  kanbanFilters,
  priorities,
  statuses,
  type Priority,
  type Status,
  type TaskType,
} from "../../../types/task";
import { useState } from "react";
import { Dropdown } from "../../../utils/Dropdown";
import { useTasks } from "../../../hooks/useTasks";

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
          <div key={filter} className="flex-1 bg-zinc-800 rounded-lg p-4">
            <h3 className="font-semibold mb-4 capitalize">{filter}</h3>

            <div className="space-y-2">
              {data
                .filter((task) => task[filterBy] === filter)
                .map((filteredTask) => (
                  <KanbanCard key={filteredTask.id} task={filteredTask} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}

function Kanban() {
  const [filter, setFilter] = useState<keyof TaskType>("priority");
  const [filters, setFilters] = useState<Priority[] | Status[]>();
  const { getTasks } = useTasks();

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

  return (
    <section>
      <div>
        <Dropdown
          value={filter}
          options={kanbanFilters}
          onChange={(newFilter: keyof TaskType) => getFilters(newFilter)}
        />
      </div>

      <KanbanColumn filters={filters} data={getTasks()} filterBy={filter} />
    </section>
  );
}

export default Kanban;
