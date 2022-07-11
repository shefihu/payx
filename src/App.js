import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FAQs from "./pages/FAQs";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
