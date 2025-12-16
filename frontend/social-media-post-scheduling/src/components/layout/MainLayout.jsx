import React from "react";
import { Route, Routes} from "react-router-dom"
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Dashboard from "../../pages/Dashboard";

export const MainLayout = ()=>{

    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        </Routes>
    );
}

