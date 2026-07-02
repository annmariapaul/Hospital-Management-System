import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import CustomAlert from "../components/CustomAlert";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setAlert((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setAlert({
        isOpen: true,
        title: "Missing Information",
        message: "Please enter username and password.",
        type: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        emailOrUsername: form.username,
        password: form.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setAlert({
        isOpen: true,
        title: "Login Successful",
        message: "Welcome to Hospital X.",
        type: "success",
      });

    } catch (err) {
      setAlert({
        isOpen: true,
        title: "Login Failed",
        message:
          err.response?.data?.message ||
          "Invalid username or password.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">

      {/* Logo */}

      <div className="mt-12">
        <h1 className="text-6xl font-extrabold text-gray-900">
          Hospital X
        </h1>
      </div>

      {/* Login Form */}

      <div className="w-full max-w-md mt-16">

        <h2 className="text-3xl font-semibold mb-10">
          Sign In
        </h2>

        <form onSubmit={handleLogin} autoComplete="off">

          {/* Username */}

          <div className="mb-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username/Email
            </label>

            <input
              type="text"
              name="no-autofill-username"
              autoComplete="new-password"
              placeholder="mail@website.com"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-blue-500"
            />

          </div>

          {/* Password */}

          <div className="mb-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="no-autofill-password"
              autoComplete="new-password"
              placeholder="*******"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-blue-500"
            />

          </div>



          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-lg text-white font-semibold transition ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="text-center mt-8">

          <span className="text-gray-600">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>

        </div>

      </div>
      <CustomAlert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onConfirm={() => {
          setAlert({
            isOpen: false,
            title: "",
            message: "",
            type: "info",
          });

          if (alert.type === "success") {
            navigate("/dashboard");
          }
        }}
        onClose={() =>
          setAlert({
            isOpen: false,
            title: "",
            message: "",
            type: "info",
          })
        }
      />
    </div>
  );
}