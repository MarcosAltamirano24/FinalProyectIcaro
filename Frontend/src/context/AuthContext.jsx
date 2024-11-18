import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al cargar el usuario desde localStorage:", error);
      return null;
    }
  });

  const isAuthenticated = !!user;

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const loggedInUser = response.data.user;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error en el cierre de sesión:", error);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        const authenticatedUser = response.data.user;
        setUser(authenticatedUser);
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
      } catch (error) {
        console.error(
          "Usuario no autenticado o error en la verificación:",
          error
        );
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
