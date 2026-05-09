import React, { useState } from "react";

import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Plus,
  X,
} from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

import useGetAllMembers from "../hooks/useGetAllMembers";
import useGetDashboardStats from "../hooks/useGetDashboardStats";
import useGetAllTasks from "../hooks/useGetAllTasks";

import { useSelector } from "react-redux";

const Dashboard = () => {
  useGetAllMembers();

  useGetDashboardStats();

  useGetAllTasks();

  const { allUsers, dashboard } =
    useSelector(
      (store) => store.auth
    );

  const { tasks } = useSelector(
    (store) => store.task
  );

  const backendUri =
    import.meta.env
      .VITE_BACKEND_URI ||
    "http://localhost:8000";

  const [
    showCreateDialog,
    setShowCreateDialog,
  ] = useState(false);

  const [input, setInput] =
    useState({
      title: "",
      description: "",
      dueDate: "",
      members: [],
    });

  const [loading, setLoading] =
    useState(false);

  const changeEventHandler = (
    e
  ) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.value,
    });
  };

  // SELECT MEMBERS
  const memberSelectHandler = (
    memberId
  ) => {
    if (
      input.members.includes(
        memberId
      )
    ) {
      setInput({
        ...input,
        members:
          input.members.filter(
            (id) =>
              id !== memberId
          ),
      });
    } else {
      setInput({
        ...input,
        members: [
          ...input.members,
          memberId,
        ],
      });
    }
  };

  // CREATE PROJECT
  const createProjectHandler =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await axios.post(
            `${backendUri}/api/projects/create`,
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

          setInput({
            title: "",
            description: "",
            dueDate: "",
            members: [],
          });

          setShowCreateDialog(
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

  // DYNAMIC STATS
  const stats = [
    {
      title: "Total Projects",
      value:
        dashboard
          ?.totalProjects || 0,
      icon: FolderKanban,
      color:
        "from-indigo-500 to-violet-600",
    },

    {
      title: "Completed Tasks",
      value:
        dashboard
          ?.completedTasks || 0,
      icon: CheckCircle2,
      color:
        "from-green-500 to-emerald-600",
    },

    {
      title: "Pending Tasks",
      value:
        dashboard
          ?.pendingTasks || 0,
      icon: Clock3,
      color:
        "from-yellow-500 to-orange-500",
    },

    {
      title: "Overdue Tasks",
      value:
        dashboard
          ?.overdueTasks || 0,
      icon: AlertTriangle,
      color:
        "from-red-500 to-pink-600",
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your projects
            and track team
            productivity.
          </p>
        </div>

        <button
          onClick={() =>
            setShowCreateDialog(
              true
            )
          }
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-indigo-500/20 cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />

          Create New Project
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        {stats.map(
          (item, index) => {
            const Icon =
              item.icon;

            return (
              <div
                key={index}
                className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 hover:border-indigo-500 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">
                      {
                        item.title
                      }
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-white">
                      {
                        item.value
                      }
                    </h2>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* RECENT TASKS */}
      <div className="mt-10 bg-slate-900/70 border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Recent Tasks
          </h2>

          <button className="text-indigo-400 hover:text-indigo-300 transition cursor-pointer">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {tasks?.length <= 0 ? (
            <div className="text-center py-10 text-slate-400">
              No tasks available
            </div>
          ) : (
            tasks
              ?.slice(0, 5)
              .map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500 transition-all duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-white">
                      {
                        task.title
                      }
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Assigned to{" "}
                      {
                        task
                          .assignedTo
                          ?.fullName
                      }
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-xl text-sm capitalize
                  
                  ${
                    task.status ===
                    "completed"
                      ? "bg-green-500/10 text-green-400"
                      : task.status ===
                        "in-progress"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-slate-800 text-slate-300"
                  }
                  `}
                  >
                    {
                      task.status
                    }
                  </span>
                </div>
              ))
          )}
        </div>
      </div>

      {/* CREATE PROJECT DIALOG */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            {/* TOP */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Create Project
                </h2>

                <p className="text-slate-400 mt-2">
                  Add a new project
                  for your team.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowCreateDialog(
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
                createProjectHandler
              }
              className="mt-8 space-y-5"
            >
              {/* TITLE */}
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Project Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    input.title
                  }
                  onChange={
                    changeEventHandler
                  }
                  placeholder="Enter project title"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Description
                </label>

                <textarea
                  rows={4}
                  name="description"
                  value={
                    input.description
                  }
                  onChange={
                    changeEventHandler
                  }
                  placeholder="Enter project description"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none resize-none focus:border-indigo-500"
                ></textarea>
              </div>

              {/* DUE DATE */}
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={
                    input.dueDate
                  }
                  onChange={
                    changeEventHandler
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* TEAM MEMBERS */}
              <div>
                <label className="text-sm text-slate-300 mb-4 block">
                  Select Team
                  Members
                </label>

                <div className="max-h-[250px] overflow-y-auto space-y-3 pr-2">
                  {allUsers?.map(
                    (user) => (
                      <div
                        key={
                          user._id
                        }
                        onClick={() =>
                          memberSelectHandler(
                            user._id
                          )
                        }
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                        
                        ${
                          input.members.includes(
                            user._id
                          )
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "border-slate-800 bg-slate-950"
                        }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt=""
                            className="w-12 h-12 rounded-2xl object-cover"
                          />

                          <div>
                            <h3 className="font-medium text-white">
                              {
                                user.fullName
                              }
                            </h3>

                            <p className="text-sm text-slate-400">
                              {
                                user.email
                              }
                            </p>
                          </div>
                        </div>

                        <input
                          type="checkbox"
                          checked={input.members.includes(
                            user._id
                          )}
                          readOnly
                          className="w-5 h-5 accent-indigo-500"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowCreateDialog(
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
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  {loading
                    ? "Creating..."
                    : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;