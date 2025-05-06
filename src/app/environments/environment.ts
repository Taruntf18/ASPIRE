// src/environment.ts

const isProduction = window.location.hostname !== "localhost"; // Check if running on a server

export const environment = {
  production: isProduction,
};

export const baseUrl: string = isProduction
  ? "http://10.110.0.58:8080/aspire/"  // ✅ Production backend URL
  : "http://localhost:8080/";        // ✅ Local backend URL

export const JWT_TOKEN: string = "JWT_TOKEN";
