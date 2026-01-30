import { i18n } from "@lingui/core";
import { useTasks } from "../../../../hooks/useTasks";
import { priorities, statuses, type TaskType } from "../../../../types/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../../../../utils/Dropdown";
import { Datepicker } from "flowbite-react";
import { Trans } from "@lingui/react/macro";
import { usePreferences } from "../../../../hooks/usePreferences";

interface RowsProps {
  data: TaskType[];
  onUpdate: (taskId: string, changes: Partial<TaskType>) => void;
  onSave: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

function Rows({ data, onUpdate, onSave, onDelete }: RowsProps) {
  const generateRow = (task: TaskType, isDraft?: boolean) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      onUpdate(task.id, { [e.target.name]: value });
    };

    const handleEnter = (
      e: React.KeyboardEvent<HTMLElement>,
      task: TaskType,
    ) => {
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
      <tr key={task.id} className="text-font">
        <th className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-left">
          <input
            type="text"
            placeholder={i18n._("Introduce task...")}
            value={task.taskName}
            name="taskName"
            onChange={(e) => handleChange(task, e, isDraft)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleEnter(e, task)}
            autoFocus={isDraft && true}
          />
        </th>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <input
            type="text"
            placeholder={i18n._("Add person...")}
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
            language={language}
            labelTodayButton={language === "es" ? "Hoy" : "Today"}
            labelClearButton={language === "es" ? "Restablecer" : "Clear"}
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
              onClick={() => onDelete(task)}
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
        className="bg-button border-l-4 border-primary p-4 space-y-2" // ← Different style: darker bg, left border accent
      >
        {/* Task Name - More compact */}
        <input
          type="text"
          placeholder={i18n._("Introduce task...")}
          value={task.taskName}
          name="taskName"
          onChange={(e) => handleChange(task, e, isDraft)}
          onBlur={() => handleAdd(task)}
          onKeyDown={(e) => handleEnter(e, task)}
          autoFocus={isDraft}
          className="text-base text-font font-semibold bg-transparent border-none outline-none w-full placeholder-gray-500"
        />

        {/* Compact info row */}
        <div className="flex flex-wrap text-xs">
          <div>
            <input
              type="text"
              placeholder={i18n._("Assign person...")}
              value={task.assigned}
              name="assigned"
              onChange={(e) => handleChange(task, e, isDraft)}
              onKeyDown={(e) => handleEnter(e, task)}
              className="px-2 py-1 bg-header text-font rounded"
            />
          </div>
          <div className="space-x-3 py-2">
            <Dropdown
              value={task.priority}
              options={priorities}
              onChange={(newPriority) =>
                handleDropdownChange(task, "priority", newPriority, isDraft)
              }
              style="bg-header text-font text-xs px-2 py-1 rounded capitalize"
            />
            <Dropdown
              value={task.status}
              options={statuses}
              onChange={(newStatus) =>
                handleDropdownChange(task, "status", newStatus, isDraft)
              }
              style="bg-header text-font text-xs px-2 py-1 rounded capitalize"
            />
            <input
              placeholder={i18n._("Input date...")}
              type="date"
              value={new Date(task.date).toISOString().split("T")[0]}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                handleDate(task.id, newDate);
              }}
              className="bg-header text-font px-2 py-1 rounded text-sm"
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
      <div className="hidden sm:block border border-header rounded-lg">
        <table className="items-center w-full min-w-200 bg-transparent border-collapse rounded-lg text-center [&_:is(th,td):first-child]:text-left">
          {/* Header for table */}
          <thead>
            <tr className="text-center">
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap rounded-tl-sm">
                <Trans>Task</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold  uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Assigned to</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Priority</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Status</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Date Due</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Completed</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap rounded-tr-sm">
                <Trans>Delete</Trans>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-header overflow-x-auto">
            {allTasks.length === 0 ? (
              <tr className="text-font">
                <th
                  colSpan={7}
                  className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-center"
                >
                  <Trans>No tasks available.</Trans>
                </th>
              </tr>
            ) : (
              allTasks.map((task) =>
                generateRow(task, task.id === draftTask?.id),
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Portrait Mobile Only: Cards */}
      <div className="sm:hidden space-y-4">
        {/* ← Changed md:hidden to sm:hidden */}

        <div className="sm:hidden space-y-4">
          {allTasks.length === 0 ? (
            <p className="text-center text-font py-8">
              <Trans>No tasks available.</Trans>
            </p>
          ) : (
            allTasks.map((task) =>
              generateCard(task, task.id === draftTask?.id),
            )
          )}
        </div>
      </div>
    </section>
  );
}

function Table() {
  const { draftTask, setDraftTask, getTasks, dispatch } = useTasks();
  const { language } = usePreferences();

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

  const handleAdd = (task: TaskType) => {
    if (task.taskName.trim() !== "") {
      dispatch({
        type: "add",
        task,
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
    }
    setDraftTask(null);
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

  // Generate table row
  const generateRow = (task: TaskType, isDraft?: boolean) => {
    return (
      <tr key={task.id} className="text-font">
        <th className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-left">
          <input
            type="text"
            placeholder={i18n._("Introduce task...")}
            value={task.taskName}
            name="taskName"
            onChange={(e) => handleChange(task, e, isDraft)}
            onBlur={() => handleAdd(task)}
            onKeyDown={(e) => handleEnter(e, task)}
            autoFocus={isDraft && true}
          />
        </th>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <input
            type="text"
            placeholder={i18n._("Add person...")}
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
            language={language}
            labelTodayButton={language === "es" ? "Hoy" : "Today"}
            labelClearButton={language === "es" ? "Restablecer" : "Clear"}
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
        className="bg-button border-l-4 border-primary p-4 space-y-2" // ← Different style: darker bg, left border accent
      >
        {/* Task Name - More compact */}
        <input
          type="text"
          placeholder={i18n._("Introduce task...")}
          value={task.taskName}
          name="taskName"
          onChange={(e) => handleChange(task, e, isDraft)}
          onBlur={() => handleAdd(task)}
          onKeyDown={(e) => handleEnter(e, task)}
          autoFocus={isDraft}
          className="text-base text-font font-semibold bg-transparent border-none outline-none w-full placeholder-gray-500"
        />

        {/* Compact info row */}
        <div className="flex flex-wrap text-xs">
          <div>
            <input
              type="text"
              placeholder={i18n._("Assign person...")}
              value={task.assigned}
              name="assigned"
              onChange={(e) => handleChange(task, e, isDraft)}
              onKeyDown={(e) => handleEnter(e, task)}
              className="px-2 py-1 bg-header text-font rounded"
            />
          </div>
          <div className="space-x-3 py-2">
            <Dropdown
              value={task.priority}
              options={priorities}
              onChange={(newPriority) =>
                handleDropdownChange(task, "priority", newPriority, isDraft)
              }
              style="bg-header text-font text-xs px-2 py-1 rounded capitalize"
            />
            <Dropdown
              value={task.status}
              options={statuses}
              onChange={(newStatus) =>
                handleDropdownChange(task, "status", newStatus, isDraft)
              }
              style="bg-header text-font text-xs px-2 py-1 rounded capitalize"
            />
            <input
              placeholder={i18n._("Input date...")}
              type="date"
              value={new Date(task.date).toISOString().split("T")[0]}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                handleDate(task.id, newDate);
              }}
              className="bg-header text-font px-2 py-1 rounded text-sm"
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

  const allTasks = draftTask ? [draftTask, ...getTasks()] : getTasks();

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
      <div className="hidden sm:block border border-header rounded-lg">
        <table className="items-center w-full min-w-200 bg-transparent border-collapse rounded-lg text-center [&_:is(th,td):first-child]:text-left">
          {/* Header for table */}
          <thead>
            <tr className="text-center">
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap rounded-tl-sm">
                <Trans>Task</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold  uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Assigned to</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Priority</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Status</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Date Due</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                <Trans>Completed</Trans>
              </th>
              <th className="px-4 bg-header text-font py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap rounded-tr-sm">
                <Trans>Delete</Trans>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-header overflow-x-auto">
            {allTasks.length === 0 ? (
              <tr className="text-font">
                <th
                  colSpan={7}
                  className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-center"
                >
                  <Trans>No tasks available.</Trans>
                </th>
              </tr>
            ) : (
              allTasks.map((task) =>
                generateRow(task, task.id === draftTask?.id),
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Portrait Mobile Only: Cards */}
      <div className="sm:hidden space-y-4">
        {/* ← Changed md:hidden to sm:hidden */}

        <div className="sm:hidden space-y-4">
          {allTasks.length === 0 ? (
            <p className="text-center text-font py-8">
              <Trans>No tasks available.</Trans>
            </p>
          ) : (
            allTasks.map((task) =>
              generateCard(task, task.id === draftTask?.id),
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Table;
