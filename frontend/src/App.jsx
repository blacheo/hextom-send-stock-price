import { useState, createContext, useEffect } from "react";
import { LoginOverlay, SignupOverlay } from "./components/LoginOverlay";
import { API } from "./utilities/constants";
import StockSubscribe from "./components/StockSubscribe";
import { Subscriptions } from "./components/Subscriptions";

export const SetShowLogSignUpPopupContext = createContext();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authMode, setAuthMode] = useState("none"); // "login" or "signup" or "none"

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleSignup = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const data = localStorage.getItem("authToken");
    if (data) {
      const email = localStorage.getItem("email")
      handleLogin(email)
      setIsLoggedIn(true)
    } else {
      console.log("no token found")
    }
    return () => setIsLoggedIn(false)
  }, [])
  

  

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 p-6">
      {/* Overlays */}
      {!isLoggedIn && authMode === "login" && (
        <LoginOverlay onLogin={handleLogin} onSwitchToSignup={() => setAuthMode("signup") } dismiss={() => setAuthMode("none")} />
      )}
      {!isLoggedIn && authMode === "signup" && (
        <SignupOverlay onSignup={handleSignup} onSwitchToLogin={() => setAuthMode("login")} dismiss={() => setAuthMode("none")} />
      )}

      {/* Main content */}
      <h1 className="text-3xl font-bold">Stock Tracker</h1>
      {isLoggedIn ? (
        <p className="mt-2 text-gray-700">Logged in as {userEmail}</p>
      ) : (
        <p className="mt-2 text-gray-500">Please{" "}
        <span className="text-blue-500 underline cursor-pointer" onClick={() => setAuthMode("login")}>
          log in</span>
          {" "}
           or
           {" "} 
           <span className="text-blue-500 underline cursor-pointer" onClick={() => setAuthMode("signup")}>sign up</span> to view your subscriptions.</p>
      )}

      <StockSubscribe/>

      <Subscriptions/>
    </div>
  );
}
