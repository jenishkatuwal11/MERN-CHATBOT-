import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Signup from "./pages/Register/register";
import AuthLayout from "./components/AuthLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
