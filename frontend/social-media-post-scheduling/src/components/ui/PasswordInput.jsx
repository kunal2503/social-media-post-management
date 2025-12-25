import React, { useState } from 'react';
import {Eye, EyeOff} from "lucide-react";

const PasswordInput = ({ value, onChange,placeholder, name,id }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }

  return (
    <div className='flex items-center justify-between py-2 px-6 border focus-within:border-2 focus-within:border-blue-500 border-gray-400 rounded-sm w-full'>
      <input type={showPassword ? "text" : "password"} id={id ? id : "password"} name={name ? name : "password"} value={value} onChange={onChange} placeholder={placeholder ? placeholder : "Enter Password"}  className='outline-none '/>
      <div onClick={handleShowPassword} className='cursor-pointer'>
      {showPassword ? <Eye size={22} className='text-blue-500' /> : <EyeOff size={22} className='text-gray-400'/>}
      </div>
    </div>
  )
}

export default PasswordInput