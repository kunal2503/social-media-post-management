import {createContext, useContext, useState, useEffect} from "react";
import axiosInstance from "../src/utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
   
    useEffect(()=>{
        const fetchUser = async () =>{
        try{
            const response = await axiosInstance.get("/user/v1/me",{withCredentials : true});
            console.log(response)
            setUser(response.data.user);
        } catch (error){
            console.log("Error while fetching user data : ",error);
            setUser(null);
        }
    }
    fetchUser();
    },[])

    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);