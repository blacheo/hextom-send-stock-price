import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../utilities/constants";

export default function StockSubscription() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setMessage("");
    setError("");

    try {
      await API.post("subscriptions/add/", {
        email: data.email,
        stock_sticker: data.ticker.toUpperCase(),
      });
      setMessage("Subscription created successfully!");
      reset();
    } catch (err) {
      setError("Failed to create subscription. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Subscribe to Stock</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Stock Ticker Input */}
        <input
          type="text"
          placeholder="Stock Ticker (e.g., ^FCHI)"
          {...register("ticker", {
            required: "Ticker is required",
            pattern: {
              value: /^\^[A-Z]{1,5}$/,
              message: "Ticker must be 1-5 uppercase letters",
            },
          })}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.ticker && <div className="text-red-500 text-sm">{errors.ticker.message}</div>}

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

        {/* Feedback messages */}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {message && <div className="text-green-500 text-sm">{message}</div>}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
