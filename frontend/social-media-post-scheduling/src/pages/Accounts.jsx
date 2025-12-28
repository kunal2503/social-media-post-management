import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Facebook, Youtube, ChevronRight, CheckCircle } from 'lucide-react';
import axiosInstance from "../utils/axiosInstance";

const Accounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState(new Set());


  const socialMediaPlatforms = [
    {name : "Instagram", icon : Instagram, color : "#E1306C" },
    {name : "X" , icon : Twitter, color : "#1DA1F2" },
    {name : "LinkedIn" , icon : Linkedin, color : "#0077B5" },
    {name : "Facebook" , icon : Facebook, color : "#1877F2" },
    {name : "YouTube" , icon : Youtube, color : "#FF0000" },
  ]
  
  const handleConnectToggle = async(platformName) =>{
    try{
      const response = await axiosInstance.post(`/connect-account/${platformName.toLowerCase()}`);
      
    } catch(error){
      console.log("Error connecting/disconnecting account:",error);
    }
  }

  return (
    <div className='flex items-center flex-col px-4 py-6 bg-white min-h-screen rounded-sm'>
      <h1 className='text-2xl font-bold mb-6'>Connect your Accounts</h1>
      <div className='grid grid-cols-1  gap-6 w-full max-w-2xl'>
        { socialMediaPlatforms.map((platform)=>(
          <div key={platform.name} className='flex items-center justify-between bg-gray-50/15 px-4 py-6 border border-gray-100 rounded-lg '>
            <div className='flex items-center '>
              <platform.icon size={30} color={platform.color}/>
              <span className="ml-4 text-lg font-medium">{platform.name}</span>
            </div>
            <button onClick={()=> handleConnectToggle(platform.name)} className={` text-white px-6 py-2 w-32  rounded-md  transition-colors ${connectedAccounts?.has(platform.name) ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} `}>
              {connectedAccounts.has(platform.name) ? "Disconnect" : "Connect"}
            </button>
          </div>
          ))
        }
      </div>
    </div>
  );
};

export default Accounts;