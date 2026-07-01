import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Components/Pages/Homepage';
import VehicleGroupSelect from "./Components/Pages/VehicleGroupSelect";
import AboutUs from "./Components/Pages/AboutUs";
import Navbar from './Components/Pages/Navbar';
import Footer from './Components/Pages/Footer';
import HowItWorks from './Components/Pages/Howitworks';
import ContactUs from './Components/Pages/ContactUs'; // ✅ add this


import AdminLogin from './Components/Pages/AdminLogin';
import AdminDashboard from './Components/Pages/AdminDashboard';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Homepage />} />
        <Route path="/home"         element={<Homepage />} />
        <Route path="/vehicles"     element={<VehicleGroupSelect />} />
        <Route path="/about"        element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact"      element={<ContactUs />} /> {/* ✅ add this */}
        // Routes la இது add பண்ணு:
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;