import { useState } from 'react'
import {ArrowRightIcon,ArrowLeftIcon,User,LayoutDashboardIcon,Edit,TimerResetIcon,Settings} from "lucide-react"
import { Link } from 'react-router-dom';

const Sidebar = ({isOpen,setIsOpen}) => {

    const handleIsOpen = ()=>{
        setIsOpen(!isOpen);
    }

  return (
    <div className={`h-full md:h-screen bg-white border-r border-gray-200 transition-all duration-200 z-50 ${isOpen ? "w-52" : "w-16"} md:relative absolute inset-y-0 left-0`}>
        <div className="flex flex-col items-center justify-between h-full gap-8">
            <div className="flex items-center p-4">
                <h1 className="text-xl font-bold ">Logo</h1>
            </div>
            {isOpen ? <>
                <div className='flex flex-col  w-full  '>
                {/* <ul className="flex flex-col "> */}
                    <Link to={"/"} className="cursor-pointer hover:bg-blue-100 font-semibold px-4 py-2 rounded-sm hover:border-l-4 hover:border-blue-300">Dashboard</Link>
                    <Link to={"/scheduler"} className="cursor-pointer hover:bg-blue-100 font-semibold px-4 py-2 rounded-sm hover:border-l-4 hover:border-blue-300">Scheduler</Link>
                    <Link to={"/accounts"} className="cursor-pointer hover:bg-blue-100 font-semibold px-4 py-2 rounded-sm hover:border-l-4 hover:border-blue-300">Accounts</Link>
                    <Link to={"/settings"} className="cursor-pointer hover:bg-blue-100 font-semibold px-4 py-2 rounded-sm hover:border-l-4 hover:border-blue-300">Settings</Link>
                {/* </ul> */}
            </div>
            </> : <>    
                <div className='flex flex-col gap-6 mt-4 '>

                
                    <Link to={"/"} className="cursor-pointer hover:bg-blue-100 p-2 rounded-md"><LayoutDashboardIcon/></Link>
                    <Link to={"/scheduler"} className="cursor-pointer hover:bg-blue-100 p-2 rounded-md"><Edit/></Link>
                    <Link to={"/accounts"} className="cursor-pointer hover:bg-blue-100 p-2 rounded-md"><User/></Link>
                    <Link to={"/settings"} className="cursor-pointer hover:bg-blue-100 p-2 rounded-md"><Settings/></Link>
                </div>
            </>}

            
            
             <div className="self-end hover:text-gray-600 p-4" onClick={handleIsOpen}> 
                {isOpen ? <ArrowLeftIcon/> : <ArrowRightIcon/>}
            </div> 
        </div>
    </div>
  )
}

export default Sidebar