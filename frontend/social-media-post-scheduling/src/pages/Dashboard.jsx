import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Sidebar from '../components/ui/Sidebar';
import Navbar from '../components/ui/Navbar';

const Dashboard = () => {
    const [isOpen, setIsOpen ] = useState(true);

  return (
    <div className="flex">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
          {/* Additional dashboard content can go here */}
        </div>
    </div>
  )
}

export default Dashboard