import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import People from '../people/people';

function Homepage() {
  const [nme,setnme]=useState('hello');
    const navigate = useNavigate();
    const Tokens = localStorage.getItem('Tokens');
    

    useEffect(() => {
        // Redirect to login if no token is found
        if (!Tokens) {
            navigate('/');
        }
    }, [Tokens, navigate]);

   
  return (
    <div>
    <Navbar nme={nme} setnme={setnme}/>
    <People nme={nme} setnme={setnme}/>
   
    </div>
  )
}

export default Homepage
