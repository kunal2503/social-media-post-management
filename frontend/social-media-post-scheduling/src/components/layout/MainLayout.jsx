import React, { useState } from "react";
import { Route, Routes} from "react-router-dom"
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Dashboard from "../../pages/Dashboard";
import Sidebar  from "../ui/Sidebar";
import Navbar from "../ui/Navbar";
import Scheduler from "../../pages/Scheduler";
import Accounts from "../../pages/Accounts";
import Setting from "../../pages/Setting";

export const MainLayout = ()=>{
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/scheduler" element={<Scheduler />} />
                        <Route path="/accounts" element={<Accounts />} />
                        <Route path="setting" element={<Setting />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

