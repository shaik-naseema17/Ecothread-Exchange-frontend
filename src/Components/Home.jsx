import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import '../Home.css'; // Importing the CSS file
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Sending logout request...");
    axios
      .get("http://localhost:3000/auth/logout", { withCredentials: true })
      .then((res) => {
        console.log("Logout response:", res.data);
        if (res.data?.status) {
          console.log("Logout successful. Navigating to login...");
          navigate("/newhome");
        } else {
          console.error("Failed to log out: Invalid response");
          navigate("/login"); // Fallback
        }
      })
      .catch((err) => {
        console.error("Logout failed:", err.message || err);
        navigate("/login"); // Fallback
      });
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="newhome-banner">
          <h1>Welcome to EcoThread Exchange</h1>
          <img src="https://wallpaperset.com/w/full/0/d/5/183330.jpg" alt="Banner" />
        </div>
      
          
    
       
       
     
    
    </>
  );
};

export default Home;