import { useState } from "react";

function AuthLayout() {
  const [currentView, setCurrentView] = useState("login");

  const handleLogin = (formData) => {
    console.log("Login data:", formData);
    // Here you would typically send the login data to your backend
    // For now, we just log it to the console
  };
  const handleRegister = (formData) => {
    console.log("Registration data:", formData);
    // Here you would typically send the registration data to your backend
    // For now, we just log it to the console
  };

  return (
    <div>
      {currentView === "login" ? (
        <Login
          onSwitchToRegister={() => setCurrentView("register")}
          onLogin={handleLogin}
        />
      ) : (
        <Signup
          onSwitchToLogin={() => setCurrentView("login")}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

export default AuthLayout;
