import axios from "axios";


export const API = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true, // important for cookies / session auth
    headers: {
      "Content-Type": "application/json",
    },
})