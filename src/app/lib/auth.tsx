"use server";

import { post } from "./action";

const BASE_URL = "https://3gpszq4r-8090.asse.devtunnels.ms/api";

export const register = async (credentials: any) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Http Error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Assuming your server returns some data upon successful registration
    return data;
  } catch (error) {
    console.error("Registration failed", error);
    throw new Error("Registration failed");
  }
};

export const login = async (credentials: any) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Http Error! Status: ${response.status} `);
    }

    const data = await response.json();
    console.log(data);
    return data; // assuming your server responds with a JSON object
  } catch (error) {
    console.error("Login failed", error);
    throw new Error("Login failed");
  }
};

export const logout = () => {
  // Remove the token from the session (using localStorage for simplicity)
  localStorage.removeItem("token");
};

export const refresh = async () => {
  try {
    // Retrieve the token from the session (using localStorage for simplicity)
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Http Error! Status: ${response.status} `);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Refresh failed", error);
    throw new Error("Refresh failed");
  }
};
