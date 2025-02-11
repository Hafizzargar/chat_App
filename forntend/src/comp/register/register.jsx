import React, { useEffect, useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [matchpwd, setMatchPwd] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  function setemailfxn(e){
  
    e.preventDefault();
    setEmail(e.target.value);
    console.log(email);
  
  }
 

  const handleRegister = async (e) => {
    e.preventDefault();
    


    if (cnfpassword !== password) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        { email, username, password },
        { withCredentials: true }
      );
      console.log(res);

      if (res.data.message === "Register with this email is done") {
        toast.error("Registration with this Email has already been done");
      } else if (res.data.message === "register checking") {
        toast.success("Registration successful");
        navigate('/');

      } 
      else{
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="form1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={setemailfxn}
          required
        />
        <br />

        <label htmlFor="UserName">Username</label>
        <input
          id="UserName"
          placeholder="Enter Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <label htmlFor="cnfpassword">Confirm Password</label>
        <input
          id="cnfpassword"
          placeholder="Enter Confirm Password"
          type="password"
          value={cnfpassword}
          onChange={(e) => {
            setCnfPassword(e.target.value);
            setMatchPwd(e.target.value === password);
          }}
          required
        />
        {cnfpassword.length >= 3 && !matchpwd && (
          <div style={{ color: "red" }}>Passwords do not match</div>
        )}

        <button disabled={loading} onClick={handleRegister}>
          {!loading ? "Register" : <div className="loading">..loading</div>}
        </button>
      </div>

      <div className="form-links">
        <Link to="/">
          <button>Login if account exists</button>
        </Link>
        <button>Forgot email or password?</button>
      </div>
    </div>
  );
}

export default Register;
