import React from 'react'
import { User } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-end h-16 bg-white border-b border-gray-200 px-4 gap-4">
        <div className="ml-auto flex items-center ">
            <User/>
            {/* <span className='text-sm font-medium'></span> */}
        </div>
        <button className='px-6 py-2 bg-blue-400 hover:bg-blue-500 rounded-full transition-all duration-200'>Logout</button>

    </div>
  )
}

export default Navbar