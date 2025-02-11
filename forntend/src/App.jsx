import './App.css'
import Register from './comp/register/register'
import { Route, Routes } from 'react-router-dom'
import Login from './comp/login/login'
import Pagenotfound from './comp/pagenotfound/pagenotfound'
import Homepage from './comp/Homepage/homepage'
import { useState } from 'react'

function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Pagenotfound/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
      </Routes>
    </div>
  )
}

export default App
