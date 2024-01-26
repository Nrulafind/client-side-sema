"use server";

import { headers } from "next/headers";

const BASE_URL = "https://3gpszq4r-8090.asse.devtunnels.ms/api";

// The token is obtained dynamically when needed
const getToken = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token") || "";
    console.log("Retrieved Token:", token);
    return token;
  }
  return "";
};

export const request = async (
  method: string,
  endpoint: string,
  data: any,
  token?: string
): Promise<any> => {
  const url = `${BASE_URL}/${endpoint}`;
  console.log("Request URL:", url);

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwNjExNzI5NywianRpIjoiNjYyMzRkZWMtZGIxYS00NGRiLWI2NTMtNzIwNzI5MGUyNTFlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOiJuYW5hQGdtYWlsLmNvbSIsInJvbGUiOjF9LCJuYmYiOjE3MDYxMTcyOTcsImNzcmYiOiJkYzM1Njg4NC1jYTI3LTQxMmUtOTBiMi0xNTM1YTFhMzRiM2YiLCJleHAiOjE3MDYxMTkwOTd9.NIhfjTZjHmHVBTvkdPiHsP27lfAE5njDALc0Zsrd-2U`,
  };

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(url, config);
  console.log("Response Status:", response.status);

  try {
    const responseBody = await response.json(); // Parse JSON response

    if (!response.ok) {
      console.error(`HTTP Error! Status: ${response.status}`);
      console.error("Response Text:", responseBody);
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return responseBody;
  } catch (error) {
    console.error("Error parsing JSON response", error);
    throw error;
  }
};

export const get = async (
  endpoint: string,
  data?: any, // Add this parameter
  token?: string
): Promise<any> => {
  return request("GET", endpoint, data, token || getToken());
};

export const post = async (
  endpoint: string,
  data: any,
  token?: string
): Promise<any> => {
  return request("POST", endpoint, data, token || getToken());
};

export const put = async (
  endpoint: string,
  data: any,
  token?: string
): Promise<any> => {
  return request("PUT", endpoint, data, token || getToken());
};

export const patch = async (
  endpoint: string,
  data: any,
  token?: string
): Promise<any> => {
  return request("PATCH", endpoint, data, token || getToken());
};

export const remove = async (
  endpoint: string,
  token?: string
): Promise<any> => {
  return request("DELETE", endpoint, undefined, token || getToken());
};
