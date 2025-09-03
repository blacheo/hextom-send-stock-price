import React, { useState, createContext } from "react";
import { useForm } from "react-hook-form";
import { LoginSignupOverlay } from "./components/LoginOverlay";
import { StockSubscriptionForm } from "./components/Subscribe";
import { YourStocks } from "./components/YourStocks";
import { API_BASE } from "./utilities/constants";

export const SetShowLogSignUpPopupContext = createContext();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogInOrSignUpPopup, setShowLogSignUpPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");


  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const onSubscribe = async (email, stock_sticker) => {
    try {
      const response = await axios.post(`${API_BASE}`, {email: email, stock_sticker: stock_sticker})
    } catch (err) {

    }
  };

  const handleSignup = () => {
    alert("Redirecting to signup page...");
    // Here you could:
    // - Show a SignupOverlay
    // - Navigate to /signup route (if using React Router or Next.js)
  };

  return (
    <>  
      
      {!isLoggedIn && showLogInOrSignUpPopup && (
        <SetShowLogSignUpPopupContext value={setShowLogSignUpPopup}>
          <LoginSignupOverlay onLogin={handleLogin} onSignup={handleSignup} setShowLogSignUpPopup={setShowLogSignUpPopup}/>
        </SetShowLogSignUpPopupContext>
      )}
        <div className="flex-col justify-center items-center p-4 space-y-4 min-h-screen">
          <StockSubscriptionForm onSubscribe={onSubscribe}/>
          
            <YourStocks isLoggedIn={isLoggedIn} setShowLogSignUpPopup={setShowLogSignUpPopup}/>
          

          
        </div>

        
    </>
  );
}
