"use client";
import { useState } from "react";
import { register as registerService } from "../lib/auth";

const RegisterPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    role: 1,
    status: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      // Make the registration request directly to your server
      const response = await registerService({
        email: credentials.email,
        username: credentials.username,
        password: credentials.password,
        role: credentials.role,
        status: credentials.status,
      });

      // Assuming your server returns some data upon successful registration
      console.log("Registration successful", response);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex flex-col border-white h-screen w-screen border-2">
      <div className="pageTitle w-full text-center my-20">
        <h1 className="font-bold text-[48px]">Register</h1>
      </div>
      <div className="flex flex-col justify-center fomrInput gap-5 border-2 border-white rounded-xl w-72">
        <label className="flex flex-col w-[25rem]">
          Email:
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label className="flex flex-col w-[25rem]">
          Username:
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label className="flex flex-col w-[25rem]">
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="text-black"
          />
        </label>
      </div>
      <div className="buttonGroup text-center my-10">
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;
