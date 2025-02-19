import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        await setTokenAndFetchProfile(storedToken);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        logout();
      }
    }
    setLoading(false);
  };

  const setTokenAndFetchProfile = async (token) => {
    setToken(token);
    localStorage.setItem("token", token);

    const profileResponse = await axios.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUser(profileResponse.data);
  };

  const login = async (email, password) => {
    try {
      console.log(" --- INSIDE LOGIN ---");

      const response = await axios.post("/auth/local", { email, password });

      console.log(" --- RESPONSE ---");
      console.log(response);

      await setTokenAndFetchProfile(response.data.token);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const handleOAuthCallback = async (token) => {
    try {
      await setTokenAndFetchProfile(token);
    } catch (error) {
      console.error("OAuth callback error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, handleOAuthCallback, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
