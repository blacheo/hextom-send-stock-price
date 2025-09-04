import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {API} from '../utilities/constants';


// Login Overlay
export function LoginOverlay({ onLogin, onSwitchToSignup, dismiss, setIsAdmin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const response = await API.post("/api/auth/login/", {
        email: data.email,
        password: data.password,
    });
   
    console.log(response)
    // If using Django REST Knox or JWT:
    // Save token in localStorage
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("email", data.email)
      localStorage.setItem("is_admin", response.data.is_admin)
      console.log("email and token saved")

      setIsAdmin(response.data.is_admin)
    }

    // Notify parent of login success
    onLogin(data.email);
  } catch (error) {
    console.error(error);
    alert(error.response.data?.error);
  }
};

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <button
          onClick={dismiss}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={onSwitchToSignup}
              className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Signup Overlay
export function SignupOverlay({ onSignup, onSwitchToLogin, dismiss }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
    const response = await API.post("/api/auth/register/", {
        email: data.email,
        password: data.password,
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const result = await response.json();

    // If using Django REST Knox or JWT:
    // Save token in localStorage
    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }

    // Notify parent of login success
    onSignup(data.email);
  } catch (error) {
    console.error(error);
    alert(`Unable to signup. ${error.response.data?.error}`);
  }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <button
          onClick={dismiss}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>

            <button
              type="button"
              onClick={onSwitchToLogin}
              className="w-full border border-gray-400 text-gray-700 py-2 rounded-lg hover:bg-gray-100"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

