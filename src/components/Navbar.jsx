import React, {
  useState,
} from "react";

import {
  Search,
  Menu,
  Plus,
  X,
} from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

import useGetAllMembers from "../hooks/useGetAllMembers";

import { useSelector } from "react-redux";

const Navbar = ({
  setSidebarOpen,
}) => {
  useGetAllMembers();

  const { allUsers,user } =
    useSelector(
      (store) => store.auth
    );

  const backendUri =
    import.meta.env
      .VITE_BACKEND_URI ||
    "http://localhost:8000";

  const [
    showTaskDialog,
    setShowTaskDialog,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [input, setInput] =
    useState({
      title: "",
      description: "",
      assignedTo: "",
      priority: "medium",
      dueDate: "",
    });

  const changeEventHandler = (
    e
  ) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.value,
    });
  };

  // CREATE TASK
  const createTaskHandler =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await axios.post(
            `${backendUri}/api/tasks/create`,
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

          setShowTaskDialog(
            false
          );

          setInput({
            title: "",
            description: "",
            assignedTo: "",
            priority:
              "medium",
            dueDate: "",
          });

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

  return (
    <>
      <header className="h-20 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setSidebarOpen(
                true
              )
            }
            className="lg:hidden cursor-pointer"
          >
            <Menu className="w-7 h-7 text-slate-300" />
          </button>

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 w-[350px]">
            <Search className="w-5 h-5 text-slate-500" />

            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="w-full bg-transparent px-3 py-3 text-white outline-none"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* CREATE TASK */}
          {
            user.role="Admin" &&(
<button
            onClick={() =>
              setShowTaskDialog(
                true
              )
            }
            className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            <Plus className="w-5 h-5" />

            Create Task
          </button>
            )
          }
          

          {/* PROFILE */}
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 cursor-pointer hover:border-indigo-500 transition-all duration-300">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt=""
              className="w-10 h-10 rounded-xl object-cover"
            />

            <div className="hidden md:block">
              <h3 className="text-sm font-semibold">
                Karan
              </h3>

              <p className="text-xs text-slate-400">
                Admin
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* CREATE TASK MODAL */}
      {showTaskDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8">
            {/* TOP */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Create Task
                </h2>

                <p className="text-slate-400 mt-2">
                  Assign a new task
                  to platform members.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowTaskDialog(
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
                createTaskHandler
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

              {/* ASSIGN USER */}
              <select
                name="assignedTo"
                value={
                  input.assignedTo
                }
                onChange={
                  changeEventHandler
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none"
              >
                <option value="">
                  Select Member
                </option>

                {allUsers?.map(
                  (user) => (
                    <option
                      key={
                        user._id
                      }
                      value={
                        user._id
                      }
                    >
                      {
                        user.fullName
                      }
                    </option>
                  )
                )}
              </select>

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

              {/* DUE DATE */}
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
                    setShowTaskDialog(
                      false
                    )
                  }
                  className="flex-1 py-4 rounded-2xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white transition-all duration-300 cursor-pointer"
                >
                  {loading
                    ? "Creating..."
                    : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;