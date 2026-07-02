import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Components/Pages/Homepage';
import AboutUs from "./Components/Pages/AboutUs";
import Navbar from './Components/Pages/Navbar';
import Footer from './Components/Pages/Footer';
import HowItWorks from './Components/Pages/HowItWorks';
import ContactUs from './Components/Pages/Contactus';
import AdminLogin from './Components/Pages/AdminLogin';
import AdminDashboard from './Components/Pages/Admindashboard';
import VehicleGroupSelect from './Components/Pages/Vehiclegroupselect';

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
        <Route path="/contact"      element={<ContactUs />} />
        <Route path="/admin/login"     element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;