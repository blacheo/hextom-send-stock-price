import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utilities/constants";

export function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    API.get("subscription/own/", {
      headers: {
        Authorization: `Token ${token}`, // Knox expects "Token <token>"
      },
    }).then((response) => {
      setSubscriptions(response.data)
      console.log(response.data)
    }).catch((err) => {
      console.error(err);
      setError("Failed to fetch subscriptions. Are you logged in?");
    });

  }, []);

  const handleSendNow = async (subscription) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await API.get(`email/?stock_sticker=${encodeURIComponent(subscription.stock_sticker)}`, {
        headers: {
          Authorization: `Token ${token}`, // Knox expects "Token <token>"
        },
        data: {
          stock_sticker: subscription.stock_sticker
        },
      })
    } catch (err) {
      console.log(err)

    }
  }

  const handleUnsubscribe = async (subscription) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await API.delete("subscription/own/", {
        headers: {
          Authorization: `Token ${token}`, // Knox expects "Token <token>"
        },
        data: {
          stock_sticker: stock_sticker
        },
      })
      setSubscriptions((prev) =>
        prev.filter((s) => s.stock_sticker !== subscription.stock_sticker && s.email !== subscription.email)
      );
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Subscriptions</h2>
      {error && <p className="text-red-600">{error}</p>}
      {subscriptions.length > 0 ? (
        <ul className="space-y-2">
          {subscriptions.map((sub, idx) => (
            <li
              key={idx}
              className="p-3 bg-gray-100 rounded-lg shadow-sm flex justify-between"
            >
              <span>{sub.stock_sticker}</span>
              <span>${sub.stock_price}</span>

              <span className="space-x-2">
                <button
                onClick={() => handleSendNow(sub)}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
              >Send Now 📨</button>
              
              <button
                onClick={() => handleUnsubscribe(sub)}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >Unsubscribe</button>
              </span>

              
            </li>
          ))}
        </ul>
      ) : !error ? (
        <p>No subscriptions found.</p>
      ) : null}
    </div>
  );
}

