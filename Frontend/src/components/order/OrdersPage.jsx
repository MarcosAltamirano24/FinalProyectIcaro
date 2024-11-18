import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

const OrdersPage = () => {
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  useEffect(() => {
    const fetchLastOrder = async () => {
      if (!order) {
        try {
          const response = await axios.get("http://localhost:3000/api/orders", {
            withCredentials: true,
          });
          const orders = response.data;
          if (orders.length > 0) {
            setOrder(orders[orders.length - 1]);
          }
        } catch (error) {
          console.error("Error al obtener la última orden:", error);
        }
      }
    };

    fetchLastOrder();
  }, [order]);

  return (
    <Box
      sx={{
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CheckCircleIcon
        sx={{ fontSize: "4rem", color: "green", marginBottom: "1rem" }}
      />
      <Typography variant="h4" gutterBottom>
        ¡Orden creada exitosamente!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Aquí tienes los detalles de tu orden.
      </Typography>

      {order ? (
        <Paper
          elevation={3}
          sx={{
            marginTop: "2rem",
            padding: "1rem",
            width: "100%",
            maxWidth: 600,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Resumen de tu última orden:
          </Typography>
          <Typography variant="body2">
            <strong>ID de la Orden:</strong> {order.id}
          </Typography>
          <Typography variant="body2">
            <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}
          </Typography>
          <Box sx={{ marginTop: "1rem" }}>
            <Typography variant="body2">
              <strong>Productos:</strong>
            </Typography>
            <ul style={{ paddingLeft: "1.5rem", textAlign: "left" }}>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.product.name} x{item.quantity} - $
                  {item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </Box>
        </Paper>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No hay detalles de la orden disponibles.
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/products"
        sx={{ marginTop: "2rem" }}
      >
        Seguir Comprando
      </Button>
    </Box>
  );
};

export default OrdersPage;
