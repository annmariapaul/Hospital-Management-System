
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import CustomAlert from "../components/CustomAlert";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    setForm({
      username: "",
      email: "",
      password: "",
    });
  }, []);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
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

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
    setAlert((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const validate = () => {
    let valid = true;

    const newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(form.email)) {
        newErrors.email = "Invalid email address";
        valid = false;
      }
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const register = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/register", form);
      setAlert({
        isOpen: true,
        title: "Registration Successful",
        message: response.data.message,
        type: "success",
      });
    } catch (err) {
      setAlert({
        isOpen: true,
        title: "Registration Failed",
        message:
          err.response?.data?.message || "Registration Failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Logo */}
      <div className="pt-16 pb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          Hospital X
        </h1>
      </div>

      {/* Centered form card */}
      <div className="w-full max-w-md px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-left">
          Sign Up
        </h2>

        <form onSubmit={register} autoComplete="off">
          {/* Username */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              name="register_username"
              autoComplete="new-username"
              placeholder="mail@website.com"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full h-11 rounded border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              email
            </label>

            <input
              type="email"
              name="register_email"
              autoComplete="off"
              placeholder="mail@website.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full h-11 rounded border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-7">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="register_password"
              autoComplete="new-password"
              placeholder="************"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full h-11 rounded border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Full‑width blue button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded text-white text-sm font-semibold transition ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login link exactly under form */}
        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="ml-1 text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
      <CustomAlert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onConfirm={() => {
          const isSuccess = alert.type === "success";

          setAlert({
            isOpen: false,
            title: "",
            message: "",
            type: "info",
          });

          if (isSuccess) {
            navigate("/login");
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