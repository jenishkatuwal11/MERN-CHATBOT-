import { useState } from "react";

function AuthLayout() {
  const [currentView, setCurrentView] = useState("login");

  const handleLogin = (formData) => {
    console.log("Login data:", formData);
  };
  const handleRegister = (formData) => {
    console.log("Registration data:", formData);
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
