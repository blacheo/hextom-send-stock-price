import React, { useEffect, useState } from "react";
import axios from "axios";

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/subscriptions/", {
        headers: {
          Authorization: `Token ${token}`, // Knox expects "Token <token>"
        },
      })
      .then((res) => {
        setSubscriptions(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch subscriptions. Are you logged in?");
      });
  }, []);

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
              <span className="text-gray-600">{sub.email}</span>
            </li>
          ))}
        </ul>
      ) : !error ? (
        <p>No subscriptions found.</p>
      ) : null}
    </div>
  );
}

export default Subscriptions;
