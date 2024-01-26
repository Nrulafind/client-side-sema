"use client";
export const Token = document.cookie;
export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || Token;
    console.log("Retrieved getToken():", token);
    return token;
  }
  return "";
};
