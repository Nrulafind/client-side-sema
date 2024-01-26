"use client";
import { useState } from "react";
import { login as loginService } from "../lib/auth";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      // Make the login request directly to your server
      const response = await loginService({
        email: credentials.email,
        password: credentials.password,
      });

      // Assuming your server returns a token upon successful login
      const token = response.access_token;

      // Save the token to the session (you may use a more secure storage option)
      document.cookie = `token = ${token}`;

      console.log("Login successful");
      console.log("token:" + token);
      alert("Login successful " + " token = " + token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen registerPage">
        <div className="flex flex-col h-full w-full">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/sema_logo.gif"
                alt="Sema Logo"
                className=""
                width={200}
                height={24}
                priority
              />
            </a>
          </div>
          <div className="flex justify-center page-title text-white my-10">
            <h1 className="font-bold text-[48px]">Login</h1>
          </div>
          <div className="flex flex-col items-center w-full h-full">
            <div className="card border-2 border-white w-[35rem] rounded-xl p-5 text-white">
              <div className="email">
                <label className="flex flex-col w-full">
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="text-black py-1 px-2 rounded-lg"
                  />
                </label>
              </div>
              <div className="password">
                <label className="flex flex-col w-full">
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="text-black py-1 px-2 rounded-lg"
                  />
                </label>
              </div>
              <div className="flex justify-center  gap-3">
                <div className="buttonGroup text-white my-5 border-2 w-72 text-center rounded-lg hover:bg-white hover:text-black hover:font-bold">
                  <button onClick={handleLogin}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
