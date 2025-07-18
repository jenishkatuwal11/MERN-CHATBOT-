import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Homepage/chatbot";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AuthLayout from "./components/AuthLayout";
import PrivateRoute from "./components/PrivateRoute";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <>
      {/* Wrap your app with GoogleOAuthProvider */}
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <ToastContainer position="bottom-center" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/chat" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
