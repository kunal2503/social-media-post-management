import React from "react";
// import Button from "../components/ui/Button"
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import { useState } from "react";
import { signupSchema } from "../utils/validate";
import {Link} from "react-router"

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateForm({ formData, setError });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      const result = signupSchema.safeParse(formData);
      console.log(error,result)
      if (!result.success) {
        const formattedError = result.error.flatten().fieldErrors;
        setError(formattedError);
      }
    } catch (error) {
      console.log("Error while signup time : ", error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-linear-to-r from-cyan-50 to-gray-50">
      <div className="border border-gray-200 rounded-lg  py-4 px-6 flex items-center justify-center gap-4 flex-col ">
        <h1 className="text-2xl font-bold ">Create New account</h1>
        <form
          onSubmit={handleSignup}
          className=" px-6 flex  items justify-center flex-col mt-4 gap-4"
        >
          <div className="w-full">
            <Input
              name={"username"}
              value={formData.username}
              placeholder={"Enter Username"}
              onChange={handleChanges}
              type={"text"}
            />
            {error && (
              <p className="text-red-500 text-sm ml-2">{error.username}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              name={"email"}
              value={formData.email}
              placeholder={"Enter Email Address"}
              onChange={handleChanges}
              type={"email"}
            />
            {error && (
              <p className="text-red-500 text-sm ml-2">{error.email}</p>
            )}
          </div>
          <div className="w-full ">
            <PasswordInput
              placeholder={"Create a Password"}
              name={"password"}
              value={formData.password}
              onChange={handleChanges}
            />
            {error && (
              <p className="text-red-500 text-sm ml-2">{error.password}</p>
            )}
          </div>
          <button
            value={formData.password}
            className={` bg-blue-400 hover:bg-blue-500 px-6 py-2 rounded-sm hover:rounded-full transition-all duration-200 font-bold `}
          >
            Signup
          </button>

          <p className="text-center">Already have account, <Link to="/login" className="hover:text-blue-600 hover:underline font-medium">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
