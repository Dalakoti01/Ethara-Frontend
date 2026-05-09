import React from "react";

import {
  Users,
  Mail,
  FolderKanban,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

const Teams = () => {
  // DUMMY TEAM DATA
  // Later replace with backend users
  const teamMembers = [
    {
      _id: "1",
      fullName: "Karan Dalakoti",
      email: "karan@gmail.com",
      role: "admin",
      projects: 5,
      tasks: 18,
      image:
        "https://i.pravatar.cc/150?img=12",
    },

    {
      _id: "2",
      fullName: "Sarah Johnson",
      email: "sarah@gmail.com",
      role: "member",
      projects: 3,
      tasks: 9,
      image:
        "https://i.pravatar.cc/150?img=25",
    },

    {
      _id: "3",
      fullName: "Michael Lee",
      email: "michael@gmail.com",
      role: "member",
      projects: 4,
      tasks: 11,
      image:
        "https://i.pravatar.cc/150?img=18",
    },

    {
      _id: "4",
      fullName: "Alex Carter",
      email: "alex@gmail.com",
      role: "member",
      projects: 2,
      tasks: 6,
      image:
        "https://i.pravatar.cc/150?img=32",
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Team Members
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Manage your team and track
            member contributions.
          </p>
        </div>
      </div>

      {/* TEAM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        {teamMembers.map((member) => (
          <div
            key={member._id}
            className="group bg-slate-900/60 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition-all duration-300 hover:translate-y-[-4px]"
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={member.image}
                  alt=""
                  className="w-20 h-20 rounded-3xl object-cover border border-slate-700"
                />

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {member.fullName}
                  </h2>

                  <div className="flex items-center gap-2 mt-2 text-slate-400">
                    <Mail className="w-4 h-4" />

                    <span className="text-sm">
                      {member.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROLE */}
            <div className="mt-6">
              <span
                className={`px-4 py-2 rounded-2xl text-sm font-medium flex items-center gap-2 w-fit ${
                  member.role === "admin"
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "bg-slate-800 text-slate-300 border border-slate-700"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />

                {member.role}
              </span>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {/* PROJECTS */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Projects
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-1">
                      {member.projects}
                    </h3>
                  </div>
                </div>
              </div>

              {/* TASKS */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Tasks
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-1">
                      {member.tasks}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-5 h-5" />

                <span className="text-sm">
                  Active Team Member
                </span>
              </div>

              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;