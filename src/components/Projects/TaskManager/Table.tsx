import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { FunctionComponent } from "react";

type TaskType = {
  id: number;
  taskName: string;
  assigned: string;
  priority: string;
  status: string;
  date: number;
  completed: boolean;
};

const TaskMockup: TaskType[] = [
  {
    id: 1,
    taskName: "Make Table",
    assigned: "Alba",
    priority: "medium",
    status: "Not started",
    date: Date.now(),
    completed: false,
  },
  {
    id: 2,
    taskName: "Make rows dynamic",
    assigned: "Alba",
    priority: "high",
    status: "Not started",
    date: Date.now(),
    completed: false,
  },
  {
    id: 3,
    taskName: "Save data in localstorage",
    assigned: "Alba",
    priority: "low",
    status: "Not started",
    date: Date.now(),
    completed: false,
  },
  {
    id: 4,
    taskName: "Create columns dinamically",
    assigned: "Alba",
    priority: "low",
    status: "Not started",
    date: Date.now(),
    completed: false,
  },
];

const Dropdown: FunctionComponent = () => {
  return (
    <>
      <Menu as="div" className="relative inline-block">
        <MenuButton className={"link-style"}> Priority</MenuButton>

        <MenuItems
          transition
          className="absolute z-10 top-0 mb-2 w-56 origin-top-right rounded-md bg-zinc-700 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <button
                type="button"
                aria-label="Button for the Shop demo"
                className="block w-full px-4 py-2 text-left text-sm bg-zinc-700"
              >
                High
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                aria-label="Button for the Task Manager demo"
                className="block w-full px-4 py-2 text-left text-sm bg-zinc-700"
              >
                Medium
              </button>
            </MenuItem>

            <MenuItem>
              <button
                type="button"
                aria-label="Button for the Task Manager demo"
                className="block w-full px-4 py-2 text-left text-sm bg-zinc-700"
              >
                Low
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};

export const Table: FunctionComponent = () => {
  const esFormatter = new Intl.DateTimeFormat("es-ES");

  const generateRow = (task: TaskType) => {
    return (
      <tr key={task.id} className="text-white">
        <th className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-left">
          {task.taskName}
        </th>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          {task.assigned}
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          {task.status}
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          {esFormatter.format(task.date)}
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <Dropdown />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <input type="checkbox" aria-label="Checkbox for completed task" />
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full overflow-x-auto border border-zinc-700 rounded-lg">
      <table className="items-center w-full bg-transparent border-collapse rounded-lg text-center [&_:is(th,td):first-child]:text-left">
        {/* Header for table */}
        <thead>
          <tr className="text-center">
            <th className="px-4 bg-zinc-700 text-white py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
              Task
            </th>
            <th className="px-4 bg-zinc-700 text-white py-3 text-xs font-semibold  uppercase border-l-0 border-r-0 whitespace-nowrap">
              Assigned to
            </th>
            <th className="px-4 bg-zinc-700 text-white align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
              Priority
            </th>
            <th className="px-4 bg-zinc-700 text-white align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
              Status
            </th>
            <th className="px-4 bg-zinc-700 text-white align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
              Date
            </th>
            <th className="px-4 bg-zinc-700 text-white py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
              Completed
            </th>
          </tr>
        </thead>
        {/* Body of table*/}
        <tbody className="divide-y divide-zinc-700">
          {/* 1 Row*/}

          {TaskMockup.map((task: TaskType) => generateRow(task))}
        </tbody>
      </table>
    </div>
  );
};
