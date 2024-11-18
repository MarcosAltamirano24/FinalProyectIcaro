import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Credenciales incorrectas, intenta nuevamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "300px" }}
    >
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      <label>Contraseña:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
