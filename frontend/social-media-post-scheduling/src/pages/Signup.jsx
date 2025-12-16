import React from 'react'
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import PasswordInput from "../components/ui/PasswordInput"

const Signup = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col bg-linear-to-r from-cyan-50 to-gray-50'>
        <div className='border border-gray-200 rounded-lg w-1/3 h-1/2 py-4 px-6 flex items-center justify-center gap-4 flex-col  '>
        <h1 className='text-2xl font-bold '>Create New account</h1>
            <form className=''>
                <Input/>
                <PasswordInput/>
                <Button/>
            </form>
        </div>
    </div>
  )
}

export default Signup