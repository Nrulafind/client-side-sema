"use client";
import { useState } from "react";
import { login as loginService } from "../lib/auth";

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
      sessionStorage.setItem("token", token);

      console.log("Login successful");
      console.log("token:" + token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
