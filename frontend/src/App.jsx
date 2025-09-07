import { useState, createContext, useEffect } from "react";
import { LoginOverlay, SignupOverlay } from "./components/LoginOverlay";
import { API } from "./utilities/constants";
import StockSubscribe from "./components/StockSubscribe";
import { Subscriptions } from "./components/subscriptions/Subscriptions";
import News from "./components/bonus_feature/News";

export const SetShowLogSignUpPopupContext = createContext();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [authMode, setAuthMode] = useState("none"); // "login" or "signup" or "none"
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleSignup = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false)
    setAuthMode("none")
    setUserEmail(null)
    setIsAdmin(false)

    localStorage.removeItem("authToken")
    localStorage.removeItem("email")
    localStorage.removeItem("isAdmin")
  }

  useEffect(() => {
    const data = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      setIsAdmin(true)
    }

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
        <LoginOverlay onLogin={handleLogin} onSwitchToSignup={() => setAuthMode("signup")} dismiss={() => setAuthMode("none")} setIsAdmin={setIsAdmin} />
      )}
      {!isLoggedIn && authMode === "signup" && (
        <SignupOverlay onSignup={handleSignup} onSwitchToLogin={() => setAuthMode("login")} dismiss={() => setAuthMode("none")} />
      )}

      {/* Main content */}
      <h1 className="text-3xl font-bold">Stock Tracker</h1>
      {isLoggedIn ? (
        <p className="mt-2 text-gray-700">Logged in as {userEmail} {" "}
          <span className="text-blue-500 underline cursor-pointer" onClick={handleLogout}>logout?</span></p>
      ) : (
        <p className="mt-2 text-gray-500">Please{" "}
          <span className="text-blue-500 underline cursor-pointer" onClick={() => setAuthMode("login")}>
            log in</span>
          {" "}
          or
          {" "}
          <span className="text-blue-500 underline cursor-pointer" onClick={() => setAuthMode("signup")}>sign up</span> to view your subscriptions and to subscribe to stocks.</p>

      )}

      {isAdmin && isLoggedIn && (<p>logged in as admin</p>)}

      {isLoggedIn && <StockSubscribe email={userEmail} setSubscriptions={setSubscriptions}/>}

      {isLoggedIn && <Subscriptions isAdmin={isAdmin} subscriptions={subscriptions} setSubscriptions={setSubscriptions}/>}

      {isLoggedIn && (
        <>
          <h2 className="text-xl font-bold text-center text-gray-800">
            Related News Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-6">

            <News />
          </div>
        </>

      )}

    </div>
  );
}
