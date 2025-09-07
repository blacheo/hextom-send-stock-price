import React, { useEffect, useState } from "react";
import { API } from "../../utilities/constants";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function SendNowButton({ subscription }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSendNow = async (subscription) => {
        try {
            setIsLoading(true)
            const token = localStorage.getItem("authToken");
            const response = await API.get(`email/?stock_sticker=${encodeURIComponent(subscription.stock_sticker)}`, {
                headers: {
                    Authorization: `Token ${token}`, // Knox expects "Token <token>"
                },
                data: {
                    stock_sticker: subscription.stock_sticker
                }
            })


            alert("Email was sent!")
        } catch (err) {
            console.log(err)
            alert("Unable to send email")
        }
        setIsLoading(false)
    }


    return (
        <button
            onClick={() => handleSendNow(subscription)}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
        >
            {isLoading ? "Sending email..." : "Send Now 📨"}
        </button>
    )
}