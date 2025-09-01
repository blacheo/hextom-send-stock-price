import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { LoginSignupOverlay } from "./components/LoginOverlay";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    alert("Redirecting to signup page...");
    // Here you could:
    // - Show a SignupOverlay
    // - Navigate to /signup route (if using React Router or Next.js)
  };

  return (
    <Box>
      {/* Show overlay if not logged in */}
      {!isLoggedIn && (
        <LoginSignupOverlay onLogin={handleLogin} onSignup={handleSignup} />
      )}

      {/* Main content */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Welcome to the App</Typography>
        {isLoggedIn ? (
          <Typography sx={{ mt: 2 }}>Logged in as {userEmail}</Typography>
        ) : (
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            Please log in to continue.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
