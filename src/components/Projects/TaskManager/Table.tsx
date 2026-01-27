import { useState, type FunctionComponent } from "react";
import { useTasks } from "../../../hooks/useTasks";
import { priorities, statuses, type TaskType } from "../../../types/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../../../utils/Dropdown";

export const Table: FunctionComponent = () => {
  const esFormatter = new Intl.DateTimeFormat("es-ES");
  const { getTasks, dispatch } = useTasks();
  const [draftTask, setDraftTask] = useState<TaskType | null>(null);

  const generateRow = (task: TaskType, isDraft?: boolean) => {
    const taskId = task.id;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDraft) {
        setDraftTask((prev) =>
          prev ? { ...prev, [e.target.name]: e.target.value } : null,
        );
      } else {
        dispatch({
          type: "update",
          id: taskId,
          changes: { [e.target.name]: e.target.value },
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

    return (
      <tr key={task.id} className="text-white">
        <th className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-left">
          <input
            type="text"
            placeholder="Introduce task..."
            value={task.taskName}
            name="taskName"
            onChange={handleChange}
            onBlur={(e) => handleAdd(e, task)}
            autoFocus={isDraft && true}
          />
        </th>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <input
            type="text"
            placeholder="Add person..."
            value={task.assigned}
            name="assigned"
            onChange={handleChange}
            className="text-center"
          />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <Dropdown
            value={task.status}
            options={statuses}
            onChange={(newStatus) => {
              if (isDraft) {
                setDraftTask((prev) =>
                  prev ? { ...prev, status: newStatus } : null,
                );
              } else {
                dispatch({
                  type: "update",
                  id: task.id,
                  changes: { status: newStatus },
                });
              }
            }}
          />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          {esFormatter.format(task.date)}
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <Dropdown
            value={task.priority}
            options={priorities}
            onChange={(newPriority) => {
              if (isDraft) {
                setDraftTask((prev) =>
                  prev ? { ...prev, priority: newPriority } : null,
                );
              } else {
                dispatch({
                  type: "update",
                  id: task.id,
                  changes: { priority: newPriority },
                });
              }
            }}
          />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <input type="checkbox" aria-label="Checkbox for completed task" />
        </td>
        <td className="border-t-0 px-4 text-xs font-medium whitespace-nowrap p-4">
          <button type="button" aria-label="delete task">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
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

  return (
    <section className="w-full space-y-5">
      {/* Add task button */}
      <button
        type="button"
        aria-label="add task"
        className="button"
        onClick={addTask}
      >
        Add Task
      </button>

      {/* Table */}
      <div className="border border-zinc-700 rounded-lg">
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
              <th className="px-4 bg-zinc-700 text-white py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
            </tr>
          </thead>
          {/* Body of table*/}
          <tbody className="overflow-x-auto divide-y divide-zinc-700">
            {draftTask && generateRow(draftTask, true)}
            {getTasks().length === 0 && !draftTask ? (
              <tr className="text-white">
                <th
                  key={1}
                  className="border-t-0 px-4 text-sm font-normal whitespace-nowrap p-4 text-left"
                >
                  No tasks available
                </th>
              </tr>
            ) : (
              getTasks().map((task) => generateRow(task))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
