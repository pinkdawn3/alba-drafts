import { type FunctionComponent } from "react";
import { useTasks } from "../../../hooks/useTasks";
import { priorities, statuses, type TaskType } from "../../../types/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../../../utils/Dropdown";
import { Datepicker } from "flowbite-react";

export const Table: FunctionComponent = () => {
  const { draftTask, setDraftTask, getTasks, dispatch } = useTasks();

  const handleChange = (
    task: TaskType,
    e: React.ChangeEvent<HTMLInputElement>,
    isDraft?: boolean,
  ) => {
    if (isDraft) {
      setDraftTask((prev) =>
        prev ? { ...prev, [e.target.name]: e.target.value } : null,
      );
    } else {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      dispatch({
        type: "update",
        id: task.id,
        changes: { [e.target.name]: value },
      });
    }
  };

  const handleAdd = (
    e: React.ChangeEvent<HTMLInputElement>,
    task: TaskType,
  ) => {
    if (e.target.value.trim() !== "") {
      dispatch({
        type: "add",
        task: task,
      });
      setDraftTask(null);
    }
  };

  const handleDelete = (task: TaskType) => {
    dispatch({
      type: "remove",
      id: task.id,
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLElement>, task: TaskType) => {
    if (e.key === "Enter" && task.taskName.trim() !== "") {
      dispatch({
        type: "add",
        task: task,
      });
      setDraftTask(null);
    }
  };

  const handleDate = (taskId: string, date: Date | null) => {
    if (date !== null) {
      dispatch({
        type: "update",
        id: taskId,
        changes: {
          date: date.getTime(),
        },
      });
    }
  };

  const handleDropdownChange = (
    task: TaskType,
    field: "priority" | "status",
    value: string,
    isDraft?: boolean,
  ) => {
    if (isDraft) {
      setDraftTask((prev) => (prev ? { ...prev, [field]: value } : null));
    } else {
      dispatch({
        type: "update",
        id: task.id,
        changes: { [field]: value },
      });
    }
  };

  const addTask = () => {
    setDraftTask({
      id: crypto.randomUUID(),
      taskName: "",
      assigned: "",
      priority: "low",
      status: "not-started",
      date: Date.now(),
      completed: false,
    });
  };

  // Generate table row
  const generateRow = (task: TaskType, isDraft?: boolean) => {
    return (
      <tr key={task.id} className="text-white">
        <th className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-left">
          <input
            type="text"
            placeholder="Introduce task..."
            value={task.taskName}
            name="taskName"
            onChange={(e) => handleChange(task, e, isDraft)}
            onBlur={(e) => handleAdd(e, task)}
            onKeyDown={(e) => handleEnter(e, task)}
            autoFocus={isDraft && true}
          />
        </th>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <input
            type="text"
            placeholder="Add person..."
            value={task.assigned}
            name="assigned"
            onChange={(e) => handleChange(task, e, isDraft)}
            className="text-center"
          />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <Dropdown
            value={task.priority}
            options={priorities}
            onChange={(newPriority) =>
              handleDropdownChange(task, "priority", newPriority, isDraft)
            }
          />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <Dropdown
            value={task.status}
            options={statuses}
            onChange={(newStatus) =>
              handleDropdownChange(task, "status", newStatus, isDraft)
            }
          />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium p-4">
          <Datepicker
            value={new Date(task.date)}
            onChange={(date) => handleDate(task.id, date)}
          />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            aria-label="Checkbox for completed task"
            onChange={(e) => handleChange(task, e, isDraft)}
          />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          {!isDraft && (
            <button
              type="button"
              aria-label="delete task"
              onClick={() => handleDelete(task)}
              className="text-sm"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </td>
      </tr>
    );
  };

  // Generate mobile card
  const generateCard = (task: TaskType, isDraft?: boolean) => {
    return (
      <div
        key={task.id}
        className="bg-zinc-900 border-l-4 border-primary p-4 space-y-2" // ← Different style: darker bg, left border accent
      >
        {/* Task Name - More compact */}
        <input
          type="text"
          placeholder="Introduce task..."
          value={task.taskName}
          name="taskName"
          onChange={(e) => handleChange(task, e, isDraft)}
          onBlur={(e) => handleAdd(e, task)}
          onKeyDown={(e) => handleEnter(e, task)}
          autoFocus={isDraft}
          className="text-base font-medium bg-transparent border-none outline-none w-full text-white placeholder-gray-500"
        />

        {/* Compact info row */}
        <div className="flex flex-wrap text-xs">
          <div>
            <input
              type="text"
              placeholder="Assign person..."
              value={task.assigned}
              name="assigned"
              onChange={(e) => handleChange(task, e, isDraft)}
              onBlur={(e) => handleAdd(e, task)}
              onKeyDown={(e) => handleEnter(e, task)}
              className="px-2 py-1 bg-zinc-800 rounded text-gray-300"
            />
          </div>
          <div className="space-x-3 py-2">
            <Dropdown
              value={task.priority}
              options={priorities}
              onChange={(newPriority) =>
                handleDropdownChange(task, "priority", newPriority, isDraft)
              }
              style="text-xs px-2 py-1 bg-zinc-700 rounded capitalize"
            />
            <Dropdown
              value={task.status}
              options={statuses}
              onChange={(newStatus) =>
                handleDropdownChange(task, "status", newStatus, isDraft)
              }
              style="text-xs px-2 py-1 bg-zinc-700 rounded capitalize"
            />
            <input
              placeholder="Input date..."
              type="date"
              value={new Date(task.date).toISOString().split("T")[0]}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                handleDate(task.id, newDate);
              }}
              className="bg-zinc-700 px-2 py-1 rounded text-sm"
            />
          </div>
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 text-xs text-gray-400">
            <input
              type="checkbox"
              name="completed"
              checked={task.completed}
              onChange={(e) => handleChange(task, e, isDraft)}
              className="w-4 h-4"
            />
            {task.completed ? "Completed" : "Mark complete"}
          </label>

          {!isDraft && (
            <button
              type="button"
              aria-label="delete task"
              onClick={() => handleDelete(task)}
              className="text-sm"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const allTasks = getTasks();

  return (
    <section className="w-full space-y-5 sm:mx-0">
      {/* Add task button */}
      <button
        type="button"
        aria-label="add task"
        className="button"
        onClick={addTask}
      >
        Add Task
      </button>

      {/* Desktop + Landscape Mobile: Table */}
      <div className="hidden sm:block border border-zinc-700 rounded-lg">
        <table className="items-center w-full min-w-200 bg-transparent border-collapse rounded-lg text-center [&_:is(th,td):first-child]:text-left">
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
                Date Due
              </th>
              <th className="px-4 bg-zinc-700 text-white py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                Completed
              </th>
              <th className="px-4 bg-zinc-700 text-white py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700 overflow-x-auto">
            {draftTask && generateRow(draftTask, true)}
            {allTasks.length === 0 && !draftTask ? (
              <tr className="text-white">
                <th
                  colSpan={7}
                  className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-center"
                >
                  No tasks available.
                </th>
              </tr>
            ) : (
              allTasks.map((task) => generateRow(task))
            )}
          </tbody>
        </table>
      </div>

      {/* Portrait Mobile Only: Cards */}
      <div className="sm:hidden space-y-4">
        {" "}
        {/* ← Changed md:hidden to sm:hidden */}
        {draftTask && generateCard(draftTask, true)}
        {allTasks.length === 0 && !draftTask ? (
          <p className="text-center text-gray-400 py-8">No tasks available</p>
        ) : (
          allTasks.map((task) => generateCard(task))
        )}
      </div>
    </section>
  );
};
