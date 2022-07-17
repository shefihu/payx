import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Navbar from "./components/Navbar";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import FAQs from "./pages/FAQs";
import Home from "./pages/Home";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="App">
        {!["/admin", "/employee", "/publisher"].includes(location.pathname) && (
          <Navbar />
        )}
        {["/admin", "/employee", "/publisher"].includes(location.pathname) && (
          <Dashboard />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/admin" element={<Dashboard />} /> */}

          <Route path="/admin" element={<DashboardHome />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
