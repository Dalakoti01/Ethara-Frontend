import React, { useState } from "react";

import {
  ClipboardList,
  CalendarDays,
  Pencil,
  Trash2,
  X,
  Flag,
} from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";

import useGetAllTasks from "../hooks/useGetAllTasks.js";
import useGetMyTasks from "../hooks/useGetMyTasks.js";

const Tasks = () => {
  const { user } = useSelector(
    (store) => store.auth
  );
  useGetAllTasks();
  useGetMyTasks()
  const { tasks, myTasks } =
  useSelector(
    (store) => store.task
  );

const displayTasks =
  user?.role === "Member"
    ? myTasks
    : tasks;
  

  const backendUri =
    import.meta.env.VITE_BACKEND_URI ||
    "http://localhost:8000";

  const [showEditDialog, setShowEditDialog] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // DELETE TASK
  const deleteTaskHandler = async (
    taskId
  ) => {
    try {
      const res = await axios.delete(
        `${backendUri}/api/tasks/delete/${taskId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(
          res.data.message
        );

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Something went wrong"
      );
    }
  };

  // OPEN EDIT
  const openEditDialog = (
    task
  ) => {
    setSelectedTask(task);

    setInput({
      title: task.title,
      description:
        task.description,
      priority: task.priority,
      status: task.status,
      dueDate:
        task?.dueDate?.split(
          "T"
        )[0],
    });

    setShowEditDialog(true);
  };

  // UPDATE TASK
  const updateTaskHandler =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await axios.put(
            `${backendUri}/api/tasks/update/${selectedTask._id}`,
            input,
            {
              withCredentials:
                true,
            }
          );

        if (res.data.success) {
          toast.success(
            res.data.message
          );

          setShowEditDialog(
            false
          );

          window.location.reload();
        }
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  // UPDATE TASK STATUS
  const updateTaskStatusHandler =
    async (
      taskId,
      status
    ) => {
      try {
        const res =
          await axios.put(
            `${backendUri}/api/tasks/updateStatus/${taskId}`,
            { status },
            {
              withCredentials:
                true,
            }
          );

        if (res.data.success) {
          toast.success(
            res.data.message
          );

          window.location.reload();
        }
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        );
      }
    };

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Tasks
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Track and manage all
            team tasks.
          </p>
        </div>
      </div>

      {/* TASKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        {displayTasks?.length <= 0 ? (
          <div className="text-slate-400 text-lg">
            No tasks found
          </div>
        ) : (
          displayTasks?.map((task) => (
            <div
              key={task._id}
              className="group bg-slate-900/60 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition-all duration-300 hover:translate-y-[-4px]"
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <ClipboardList className="w-8 h-8 text-white" />
                  </div>

                  <h2 className="text-2xl font-bold text-white mt-5">
                    {task.title}
                  </h2>

                  <p className="text-slate-400 mt-3 leading-relaxed line-clamp-3">
                    {
                      task.description
                    }
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3 opacity-100 transition-all duration-300">
                  {/* ADMIN */}
                  {user?.role ===
                  "Admin" ? (
                    <>
                      <button
                        onClick={() =>
                          openEditDialog(
                            task
                          )
                        }
                        className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500 transition-all duration-300 cursor-pointer"
                      >
                        <Pencil className="w-5 h-5 text-indigo-400" />
                      </button>

                      <button
                        onClick={() =>
                          deleteTaskHandler(
                            task._id
                          )
                        }
                        className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-red-500 transition-all duration-300 cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </>
                  ) : (
                    /* MEMBER */
                    <select
                      value={
                        task.status
                      }
                      onChange={(
                        e
                      ) =>
                        updateTaskStatusHandler(
                          task._id,
                          e.target
                            .value
                        )
                      }
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none"
                    >
                      <option value="todo">
                        Todo
                      </option>

                      <option value="in-progress">
                        In Progress
                      </option>

                      <option value="completed">
                        Completed
                      </option>
                    </select>
                  )}
                </div>
              </div>

              {/* STATUS + PRIORITY */}
              <div className="flex items-center gap-3 mt-6 flex-wrap">
                <span
                  className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                    task.status ===
                    "completed"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : task.status ===
                        "in-progress"
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }`}
                >
                  {task.status}
                </span>

                <span
                  className={`px-4 py-2 rounded-2xl text-sm font-medium flex items-center gap-2 ${
                    task.priority ===
                    "high"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : task.priority ===
                        "medium"
                      ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  <Flag className="w-4 h-4" />

                  {task.priority}
                </span>
              </div>

              {/* FOOTER */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                {/* USER */}
                <div>
                  <p className="text-slate-500 text-sm">
                    Assigned To
                  </p>

                  <p className="text-white font-medium mt-1">
                    {
                      task.assignedTo
                        ?.fullName
                    }
                  </p>
                </div>

                {/* DATE */}
                <div className="text-right">
                  <p className="text-slate-500 text-sm">
                    Due Date
                  </p>

                  <p className="text-white font-medium mt-1 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />

                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* EDIT TASK DIALOG */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            {/* TOP */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Update Task
                </h2>

                <p className="text-slate-400 mt-2">
                  Edit task details.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowEditDialog(
                    false
                  )
                }
                className="cursor-pointer"
              >
                <X className="w-7 h-7 text-slate-400" />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={
                updateTaskHandler
              }
              className="mt-8 space-y-5"
            >
              {/* TITLE */}
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={
                  changeEventHandler
                }
                placeholder="Task title"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none"
              />

              {/* DESCRIPTION */}
              <textarea
                rows={4}
                name="description"
                value={
                  input.description
                }
                onChange={
                  changeEventHandler
                }
                placeholder="Task description"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none resize-none"
              ></textarea>

              {/* PRIORITY */}
              <select
                name="priority"
                value={
                  input.priority
                }
                onChange={
                  changeEventHandler
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none"
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>

              {/* STATUS */}
              <select
                name="status"
                value={
                  input.status
                }
                onChange={
                  changeEventHandler
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none"
              >
                <option value="todo">
                  Todo
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>

              {/* DATE */}
              <input
                type="date"
                name="dueDate"
                value={input.dueDate}
                onChange={
                  changeEventHandler
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none"
              />

              {/* BUTTONS */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setShowEditDialog(
                      false
                    )
                  }
                  className="flex-1 py-4 rounded-2xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white transition-all duration-300 cursor-pointer"
                >
                  {loading
                    ? "Updating..."
                    : "Update Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Tasks;