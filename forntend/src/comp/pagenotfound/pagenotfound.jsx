import React from "react";
import { Link } from "react-router-dom";
import "./pagenotfound.css"; // Add CSS file for styling

function Pagenotfound() {
  return (
    <div className="notfound">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <button className="home-btn">Go Back Home</button>
      </Link>
    </div>
  );
}

export default Pagenotfound;
