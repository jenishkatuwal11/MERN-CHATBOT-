import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google"; // Google OAuth Component

const RegisterPage = ({ onSwitchToLogin, onRegister }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
    }

    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        formData
      );
      toast.success("Registration successful!", {
        position: "bottom-center",
        autoClose: 3000,
      });

      onRegister?.(response.data);
      setTimeout(() => {
        navigate("/"); // Redirect to login after successful registration
      }, 3000);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegisterSuccess = async (response) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: response.credential }), // Send Google token to backend
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful!", {
          position: "bottom-center",
          autoClose: 2000,
        });

        onRegister?.(data.user);
        localStorage.setItem("token", data.token); // Save token in localStorage
        navigate("/chat"); // Redirect to chat after Google login
      } else {
        toast.error(data.message || "Registration failed", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during Google registration:", error);
      toast.error("Something went wrong!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Google Register Button */}
          <GoogleLogin
            onSuccess={handleGoogleRegisterSuccess}
            onError={(error) => console.log("Google Register Error:", error)}
            useOneTap
          />

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Register Form */}
          <div className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                    errors.firstname ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="First name"
                />
                {errors.firstname && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                    errors.lastname ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Last name"
                />
                {errors.lastname && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastname}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Switch to Login */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
