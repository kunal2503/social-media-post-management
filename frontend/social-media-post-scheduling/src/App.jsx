import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OAuthCallback from "./pages/OAuthCallback"

const App = () => {
  
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/auth/:platform/callback" element={<OAuthCallback/>}/>
            <Route path="/*" element={<MainLayout/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App