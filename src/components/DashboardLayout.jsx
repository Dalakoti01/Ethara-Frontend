import React, { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  LogOut,
  X,
} from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./Navbar";

import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useSelector(
    (store) => store.auth
  );

  const backendUri =
    import.meta.env.VITE_BACKEND_URI ||
    "http://localhost:8000";

  const [showLogoutDialog, setShowLogoutDialog] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // LOGOUT
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${backendUri}/api/auth/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        localStorage.removeItem(
          "isAuthenticated"
        );

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ROLE BASED NAVIGATION
  const navLinks = [
    // ADMIN ONLY
    ...(user?.role === "Admin"
      ? [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/",
          },
        ]
      : []),

    // EVERYONE
    {
      title: "Projects",
      icon: FolderKanban,
      path: "/projects",
    },

    {
      title: "Tasks",
      icon: CheckSquare,
      path: "/tasks",
    },

    // ADMIN ONLY
    ...(user?.role === "Admin"
      ? [
          // {
          //   title: "Team",
          //   icon: Users,
          //   path: "/team",
          // },
        ]
      : []),
  ];

  return (
    <div
      className="min-h-screen flex text-white"
      style={{
        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #111827)",
      }}
    >
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-[280px] bg-slate-950 border-r border-slate-800 transform transition-transform duration-300
        
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        `}
      >
        {/* LOGO */}
        <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              TaskFlow
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              Team Management System
            </p>
          </div>

          {/* MOBILE CLOSE */}
          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="lg:hidden cursor-pointer"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* PROFILE */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt=""
              className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
            />

            <div>
              <h2 className="font-semibold">
                {user?.fullName}
              </h2>

              <p className="text-sm text-slate-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="p-4 space-y-2">
          {navLinks.map((item, index) => {
            const Icon = item.icon;

            const isActive =
              location.pathname ===
              item.path;

            return (
              <Link
                to={item.path}
                key={index}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 cursor-pointer
                  
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white"
                      : "text-slate-300 hover:bg-slate-900"
                  }
                `}
              >
                <Icon className="w-5 h-5" />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-800">
          <button
            onClick={() =>
              setShowLogoutDialog(true)
            }
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />

            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR */}
        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* LOGOUT DIALOG */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white">
              Confirm Logout
            </h2>

            <p className="text-slate-400 mt-3 leading-relaxed">
              Are you sure you want to
              logout from your account?
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() =>
                  setShowLogoutDialog(false)
                }
                className="flex-1 py-3 rounded-2xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={logoutHandler}
                className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;