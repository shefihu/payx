import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Navbar from "./components/Navbar";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Dashboard/Account";
import Stash from "./pages/Dashboard/Stash";
import Wallet from "./pages/Dashboard/Wallet";
import DashboardHome from "./pages/DashboardHome";
import FAQs from "./pages/FAQs";
import History from "./pages/History";
import Home from "./pages/Home";
import Verification from "./pages/Verification";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="App">
        {![
          "/admin",
          "/employee",
          "/account",
          "/verification",
          "/publisher",
          "/wallet",
          "/history",
          "/stash",
        ].includes(location.pathname) && <Navbar />}
        {[
          "/admin",
          "/account",
          "/wallet",
          "/stash",
          "/history",
          "/publisher",
        ].includes(location.pathname) && <Dashboard />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/admin" element={<Dashboard />} /> */}

          <Route path="/admin" element={<DashboardHome />} />
          <Route path="/account" element={<Account />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/history" element={<History />} />
          <Route path="/stash" element={<Stash />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
