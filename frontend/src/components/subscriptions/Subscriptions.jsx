import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../utilities/constants";
import SendNowButton from "./SendNowButton";

export function Subscriptions({isAdmin, subscriptions, setSubscriptions}) {
  
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
    
    }).catch((err) => {
      console.error(err);
      setError("Failed to fetch subscriptions. Are you logged in?");
    });

  }, []);

  

  const handleUnsubscribe = async (subscription) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await API.delete("subscription/own/", {
        headers: {
          Authorization: `Token ${token}`, // Knox expects "Token <token>"
        },
        data: {
          email: subscription.email,
          stock_sticker: subscription.stock_sticker
        },
      })
      setSubscriptions((prev) =>
        prev.filter((s) => s.stock_sticker !== subscription.stock_sticker || s.email !== subscription.email)
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
              {isAdmin && (<span>{sub.email}</span>)}

              <span className="space-x-2">
              <SendNowButton subscription={sub}/>
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

