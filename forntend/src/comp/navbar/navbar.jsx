import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar({nme,setnme}) {
  const navigate = useNavigate();

  const lgout = () => {
    localStorage.removeItem("Tokens"); // To remove the token
    console.log("Logged out");
    toast.success('logged out done')
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <Link className="link" to="/">
          <img
            src="../../../public/m11.jpg"
            alt="Logo"
            className="logo"
          />
        </Link>
      </div>
      
      <div className="nav-links">
      <div className="">Name:{nme}</div>
        <Link className="link" to="/products">Products</Link>
        <Link className="link" to="/work">Work</Link>
        <Link className="link" to="/" onClick={lgout}>Login</Link>
        <div className="logout" onClick={lgout}>Logout</div>
      </div>
    </div>
  );
}

export default Navbar;
