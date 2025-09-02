import { useState } from "react";
import { useForm } from "react-hook-form";

export function StockSubscriptionForm({ onSubscribe }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError("");

    try {
      // Replace with API call
      // Example:
      // const response = await fetch("/api/subscriptions/", { ... });

      console.log("Submitted:", data);
      onSubscribe?.(data);
      reset();
    } catch (err) {
      setServerError("Failed to subscribe. Try again.");
    }
  };

  return (
    <div className="w-full w-full bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Subscribe to Stock</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email input */}
        <input
          type="email"
          placeholder="Your email"
          {...register("email", { required: "Email is required" })}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Stock ticker input */}
        <input
          type="text"
          placeholder="Stock ticker (e.g., AAPL)"
          {...register("stock_sticker", {
            required: "Stock ticker is required",
            maxLength: { value: 5, message: "Max 5 characters" },
          })}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.stock_sticker && <p className="text-red-500 text-sm">{errors.stock_sticker.message}</p>}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition duration-200"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>

        {serverError && <p className="text-red-500 text-center">{serverError}</p>}
      </form>
    </div>
  );
}
