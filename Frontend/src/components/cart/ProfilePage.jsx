import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders", {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`, {
        withCredentials: true,
      });
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      alert("Orden eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      alert("No se pudo eliminar la orden. Inténtalo de nuevo.");
    }
  };

  const completeOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/orders/${orderId}/complete`,
        {},
        { withCredentials: true }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "completed" } : order
        )
      );
      alert("Orden marcada como completada");
    } catch (error) {
      console.error("Error al completar la orden:", error);
      alert("No se pudo completar la orden. Inténtalo de nuevo.");
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6">Información Personal</Typography>
        <Typography>Nombre: {user?.name || "No disponible"}</Typography>
        <Typography>Correo: {user?.email || "No disponible"}</Typography>
        <Typography>Dirección: {user?.address || "No disponible"}</Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: "1rem" }}
          onClick={logout}
        >
          Cerrar Sesión
        </Button>
      </Box>

      <Divider sx={{ marginBottom: "2rem" }} />

      <Typography variant="h6" gutterBottom>
        Historial de Órdenes
      </Typography>
      {orders.length === 0 ? (
        <Typography>No tienes órdenes registradas.</Typography>
      ) : (
        <Box>
          {orders.map((order) => (
            <Box
              key={order.id}
              sx={{
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <Typography>Orden ID: {order.id}</Typography>
              <Typography>
                Total: $
                {order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
              </Typography>
              <Typography>
                Fecha: {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Typography>Estado: {order.status || "Pendiente"}</Typography>
              <Divider sx={{ marginY: "0.5rem" }} />
              <Typography variant="body1">Productos:</Typography>
              {order.items.map((item) => (
                <Typography key={item.id}>
                  {item.product?.name} x{item.quantity} - $
                  {item.price.toFixed(2)}
                </Typography>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  marginTop: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => completeOrder(order.id)}
                  disabled={order.status === "completed"}
                >
                  {order.status === "completed" ? "Completada" : "Completar"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => deleteOrder(order.id)}
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
