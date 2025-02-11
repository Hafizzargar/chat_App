import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  
    const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [username1, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
      e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:4000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data.user.username);
      setUsername(res.data.user.username);
      if(res.data.message=="Inavlid Password"){
        toast.error("Invalid password")
        
      }
      if(res.data.message=="Login done"){
        toast.success('Welcome'+username1+ ' Login has been done');
        localStorage.setItem('Tokens',res.data.token);
        navigate('/homepage')
       
      }else{
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setLoading(false); // Stop loading if an error occurs
    }
  };

  return (
    <div className='register'>
      <div className='form1'>
        <label htmlFor='email'>Email</label>
        <input 
          id='email' 
          placeholder='Enter Email' 
          type='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <br />

        <label htmlFor='password'>Password</label>
        <input 
          id='password' 
          placeholder='Enter Password' 
          type='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <br />
        

        <button 
          disabled={loading} 
          onClick={(e) => handleRegister(e)}
        >
          {!loading ? <div>Login</div> : <div className='loading'>..loading</div>}
        </button>
      </div>

      <div className='form-links'>
        <Link to='/register'><button>Register if account not exists</button></Link>
        <button>Forgot email or password?</button>
      </div>
    </div>
  );
}

export default Login;