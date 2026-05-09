import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const backendUri =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        `${backendUri}/api/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Update user state in Redux store
        toast.success(res.data.message);
        localStorage.setItem("isAuthenticated", "true");
        if(res.data.user.role === "Admin") {
        navigate("/"); // Redirect to dashboard after successful login

        } else{
          navigate("/tasks")
        }
        console.log(res.data.user);

        setFormData({
          email: "",
          password: "",
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
        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Manage Teams <br /> Like a Pro
            </h1>

            <p className="text-indigo-100 mt-6 text-lg leading-relaxed">
              Organize projects, assign tasks, track progress, and collaborate
              with your team in one modern workspace.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6">
            <p className="text-white text-lg leading-relaxed">
              “This platform improved our team's productivity by 40%.”
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h3 className="text-white font-semibold">Sarah Johnson</h3>
                <p className="text-indigo-100 text-sm">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-slate-950 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white">
              Welcome Back 👋
            </h2>

            <p className="text-slate-400 mt-3">
              Login to continue managing your projects.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
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
                  placeholder="Enter your email"
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
                  placeholder="Enter password"
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

            {/* OPTIONS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-indigo-500" />

                <p className="text-slate-400 text-sm">Remember me</p>
              </div>

              <button
                type="button"
                className="text-indigo-400 hover:text-indigo-300 text-sm transition cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-indigo-500/20 cursor-pointer disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}

              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-slate-400 text-center mt-8">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className="text-indigo-400 hover:text-indigo-300 cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;