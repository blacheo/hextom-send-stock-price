import { useState, createContext } from "react";
import { LoginOverlay } from "./components/LoginOverlay";

export const SetShowLogSignUpPopupContext = createContext();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleSignup = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 p-6">
      {/* Overlays */}
      {!isLoggedIn && authMode === "login" && (
        <LoginOverlay onLogin={handleLogin} onSwitchToSignup={() => setAuthMode("signup")} />
      )}
      {!isLoggedIn && authMode === "signup" && (
        <SignupOverlay onSignup={handleSignup} onSwitchToLogin={() => setAuthMode("login")} />
      )}

      {/* Main content */}
      <h1 className="text-3xl font-bold">Welcome to the App</h1>
      {isLoggedIn ? (
        <p className="mt-2 text-gray-700">Logged in as {userEmail}</p>
      ) : (
        <p className="mt-2 text-gray-500">Please log in or sign up to continue.</p>
      )}
    </div>
  );
}
