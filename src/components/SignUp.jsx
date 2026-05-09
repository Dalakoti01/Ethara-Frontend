import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const backendUri =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Member",
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUri}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          role: "member",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1e1b4b)",
      }}
    >
      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Build Better <br /> Team Collaboration
            </h1>

            <p className="text-indigo-100 mt-6 text-lg leading-relaxed">
              Create projects, assign tasks, and streamline teamwork with our
              modern productivity platform.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6">
            <p className="text-white text-lg leading-relaxed">
              “One of the best team management systems we've used.”
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src="https://i.pravatar.cc/100?img=32"
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h3 className="text-white font-semibold">Michael Lee</h3>
                <p className="text-indigo-100 text-sm">Startup Founder</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-slate-950 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white">
              Create Account 🚀
            </h2>

            <p className="text-slate-400 mt-3">
              Join your team and start managing projects efficiently.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="text-sm text-slate-300 mb-2 block">
                Full Name
              </label>

              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4">
                <User className="text-slate-500 w-5 h-5" />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={changeEventHandler}
                  placeholder="Enter full name"
                  className="w-full bg-transparent px-3 py-4 text-white outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-slate-300 mb-2 block">
                Email Address
              </label>

              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4">
                <Mail className="text-slate-500 w-5 h-5" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeEventHandler}
                  placeholder="Enter email"
                  className="w-full bg-transparent px-3 py-4 text-white outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-slate-300 mb-2 block">
                Password
              </label>

              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4">
                <Lock className="text-slate-500 w-5 h-5" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={changeEventHandler}
                  placeholder="Create password"
                  className="w-full bg-transparent px-3 py-4 text-white outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="text-slate-500 w-5 h-5" />
                  ) : (
                    <Eye className="text-slate-500 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm text-slate-300 mb-2 block">
                Select Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={changeEventHandler}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-indigo-500/20 cursor-pointer disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Account"}

              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-slate-400 text-center mt-8">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="text-indigo-400 hover:text-indigo-300 cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;