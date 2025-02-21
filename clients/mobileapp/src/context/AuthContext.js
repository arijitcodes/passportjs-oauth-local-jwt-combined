import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { CommonActions } from "@react-navigation/native";

const AuthContext = createContext();

const baseURL =
  Constants.manifest?.extra?.baseApiUrl || "http://192.168.45.1:5000";

axios.defaults.baseURL = baseURL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password, navigate) => {
    try {
      console.log(`Attempting to login with email: ${email}`);
      console.log(`Using baseURL: ${baseURL}`);
      const response = await axios.post("/auth/local", {
        email,
        password,
      });
      console.log("Response from server:", response.data);
      if (response.data.token) {
        setToken(response.data.token);
        await fetchUserProfile(response.data.token);
        navigate(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          })
        );
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      alert("Invalid email or password");
      console.error("Error during login:", error);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User profile:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw new Error("Failed to fetch user profile");
    }
  };

  const logout = (dispatch) => {
    setToken(null);
    setUser(null);
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, setToken, fetchUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
