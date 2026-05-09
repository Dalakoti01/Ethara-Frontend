import React, { useState } from "react";

import {
  FolderKanban,
  CalendarDays,
  Users,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";

import useGetAllProjects from "../hooks/useGetAllProjects";
import useGetMyProjects from "../hooks/useGetMyProjects";

const Projects = () => {
  useGetAllProjects();
  useGetMyProjects()
  const { projects, myProjects } = useSelector(
    (store) => store.project
  );

  const { user } = useSelector(
    (store) => store.auth
  );

  const backendUri =
    import.meta.env
      .VITE_BACKEND_URI ||
    "http://localhost:8000";

  const [
    showEditDialog,
    setShowEditDialog,
  ] = useState(false);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [input, setInput] =
    useState({
      title: "",
      description: "",
      dueDate: "",
      status: "",
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

  // DELETE PROJECT
  const deleteProjectHandler =
    async (projectId) => {
      try {
        const res =
          await axios.delete(
            `${backendUri}/api/projects/delete/${projectId}`,
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

  // OPEN EDIT DIALOG
  const openEditDialog = (
    project
  ) => {
    setSelectedProject(project);

    setInput({
      title: project.title,
      description:
        project.description,
      dueDate:
        project?.dueDate?.split(
          "T"
        )[0],
      status: project.status,
    });

    setShowEditDialog(true);
  };

  // UPDATE PROJECT
  const updateProjectHandler =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await axios.put(
            `${backendUri}/api/projects/update/${selectedProject._id}`,
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

  // UPDATE PROJECT STATUS
  const updateProjectStatusHandler =
    async (
      projectId,
      status
    ) => {
      try {
        const res =
          await axios.put(
            `${backendUri}/api/projects/updateStatus/${projectId}`,
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
      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Projects
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all your team
            projects here.
          </p>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        {projects?.length <= 0 ? (
          <div className="text-slate-400 text-lg">
            No projects found
          </div>
        ) : (
          projects?.map(
            (project) => (
              <div
                key={
                  project._id
                }
                className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition-all duration-300"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center">
                      <FolderKanban className="w-7 h-7 text-white" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-5">
                      {
                        project.title
                      }
                    </h2>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-3">
                    {/* ADMIN */}
                    {user?.role ===
                    "Admin" ? (
                      <>
                        <button
                          onClick={() =>
                            openEditDialog(
                              project
                            )
                          }
                          className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500 transition-all duration-300 cursor-pointer"
                        >
                          <Pencil className="w-5 h-5 text-indigo-400" />
                        </button>

                        <button
                          onClick={() =>
                            deleteProjectHandler(
                              project._id
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
                          project.status
                        }
                        onChange={(
                          e
                        ) =>
                          updateProjectStatusHandler(
                            project._id,
                            e.target
                              .value
                          )
                        }
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none"
                      >
                        <option value="active">
                          Active
                        </option>

                        <option value="completed">
                          Completed
                        </option>
                      </select>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-slate-400 mt-5 leading-relaxed">
                  {
                    project.description
                  }
                </p>

                {/* STATUS */}
                <div className="mt-6">
                  <span
                    className={`px-4 py-2 rounded-xl text-sm capitalize
                    
                    ${
                      project.status ===
                      "completed"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }
                    `}
                  >
                    {
                      project.status
                    }
                  </span>
                </div>

                {/* FOOTER */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                  {/* MEMBERS */}
                  <div className="flex items-center gap-2 text-slate-400">
                    <Users className="w-5 h-5" />

                    <span>
                      {
                        project.members
                          ?.length
                      }{" "}
                      Members
                    </span>
                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-2 text-slate-400">
                    <CalendarDays className="w-5 h-5" />

                    <span>
                      {new Date(
                        project.dueDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* EDIT DIALOG */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            {/* TOP */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Update Project
                </h2>

                <p className="text-slate-400 mt-2">
                  Edit your project
                  details.
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
                updateProjectHandler
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none resize-none focus:border-indigo-500"
                ></textarea>
              </div>

              {/* STATUS */}
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Status
                </label>

                <select
                  name="status"
                  value={
                    input.status
                  }
                  onChange={
                    changeEventHandler
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none focus:border-indigo-500"
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* DATE */}
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

              {/* BUTTONS */}
              <div className="flex gap-4 pt-2">
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
                  disabled={
                    loading
                  }
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  {loading
                    ? "Updating..."
                    : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;