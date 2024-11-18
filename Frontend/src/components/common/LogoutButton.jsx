import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth(); // Usa el método `logout` del contexto
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
