import React from "react";
import LoginForm from "../components/profile/LoginForm";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
