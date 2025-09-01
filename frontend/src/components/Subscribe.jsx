import React from "react";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Input from "@mui/material/Input";

// Mock async stock validation API
const validateStockTicker = async (ticker) => {
  const validTickers = ["AAPL", "GOOG", "MSFT", "TSLA", "AMZN"];
  await new Promise((res) => setTimeout(res, 500)); // simulate network delay
  return validTickers.includes(ticker.toUpperCase());
};

export default function SubscriptionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const tickerIsValid = await validateStockTicker(data.ticker);
    if (!tickerIsValid) {
      setError("ticker", { type: "manual", message: "Invalid stock ticker" });
      return;
    }

    alert(`Subscription created for ${data.ticker.toUpperCase()} at ${data.email}`);
    reset();
  };

  return (
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create Stock Subscription</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Stock Ticker */}
            <div>
              <label className="block text-sm font-medium mb-1">Stock Ticker</label>
              <Input
                placeholder="e.g. AAPL"
                {...register("ticker", {
                  required: "Stock ticker is required",
                })}
              />
              {errors.ticker && (
                <p className="text-red-500 text-sm">{errors.ticker.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Validating..." : "Subscribe"}
            </Button>
          </form>
        </CardContent>
      </Card>

  );
}