import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Homepage/chatbot";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Register";
import AuthLayout from "./components/AuthLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-center" autoClose={3000} />
        <Routes element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/chat" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
