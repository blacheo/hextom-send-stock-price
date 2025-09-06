import { useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../utilities/constants";

export default function StockSubscribe({ email, setSubscriptions }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    setMessage("");
    setError("");
    try {
      let response = await API.post("subscription/own/", {
        "stock_sticker": data.ticker.toUpperCase(),
      }, {
        headers: {
          Authorization: `Token ${token}`, // Knox expects "Token <token>"
        }
      },
      );
      setMessage("Subscription created successfully!");
      console.log(response.data)
      setSubscriptions((prevSubscriptions) => [...prevSubscriptions, {"stock_sticker": data.ticker, "email": email, "stock_price": response.data.stock_price}])
      reset();
    } catch (err) {
      console.log(err)
      setError("Failed to create subscription. Verify that your stock sticker exists.");
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

          })}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.ticker && <div className="text-red-500 text-sm">{errors.ticker.message}</div>}

        {/* Email Input */}
        {email === null && (
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
            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 `}
          />
        )}

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
